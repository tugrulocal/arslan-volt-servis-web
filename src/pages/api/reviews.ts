import type { APIRoute } from "astro";
import { getSupabaseAdminClient } from "../../lib/supabase/server";
import { getPublicReviews } from "../../lib/reviews/public";
import { validateReviewFormData } from "../../lib/reviews/validation";
import { verifyTurnstileToken } from "../../lib/reviews/turnstile";

export const prerender = false;

const maxBodyBytes = 12_000;
type RedirectStatus = 300 | 301 | 302 | 303 | 304 | 307 | 308;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function wantsHtml(request: Request): boolean {
  return request.headers.get("accept")?.includes("text/html") ?? false;
}

function failureResponse({
  body,
  redirect,
  request,
  status,
}: {
  body: unknown;
  redirect: (path: string, status?: RedirectStatus) => Response;
  request: Request;
  status: number;
}): Response {
  if (wantsHtml(request)) return redirect("/yorumlar?yorum=hata#yorum-yap", 303);

  return jsonResponse(body, status);
}

async function hasRateLimitExceeded({
  ipHmac,
  phoneHmac,
}: {
  ipHmac: string;
  phoneHmac: string;
}) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return true;

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [{ count: ipCount, error: ipError }, { count: phoneCount, error: phoneError }] =
    await Promise.all([
      supabase
        .from("reviews")
        .select("id", { count: "exact", head: true })
        .eq("ip_hmac", ipHmac)
        .gte("created_at", oneHourAgo),
      supabase
        .from("reviews")
        .select("id", { count: "exact", head: true })
        .eq("phone_hmac", phoneHmac)
        .gte("created_at", thirtyDaysAgo),
    ]);

  if (ipError || phoneError) return true;

  return (ipCount ?? 0) >= 3 || (phoneCount ?? 0) >= 2;
}

export const GET: APIRoute = async ({ url }) => {
  const cursor = url.searchParams.get("cursor");
  const limit = Math.min(Number(url.searchParams.get("limit") || 9), 24);
  const verifiedOnly = url.searchParams.get("verifiedOnly") === "true";
  const featuredOnly = url.searchParams.get("featuredOnly") === "true";
  const result = await getPublicReviews({
    cursor,
    limit,
    verifiedOnly,
    featuredOnly,
  });

  return jsonResponse(result, result.unavailable ? 503 : 200);
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const contentLength = Number(request.headers.get("content-length") || 0);
  const supabase = getSupabaseAdminClient();

  if (contentLength > maxBodyBytes) {
    return failureResponse({
      request,
      redirect,
      status: 413,
      body: { ok: false, errors: { form: "Gönderim çok büyük. Lütfen metni kısaltın." } },
    });
  }

  if (!supabase) {
    return failureResponse({
      request,
      redirect,
      status: 503,
      body: {
        ok: false,
        errors: {
          form: "Yorum gönderimi şu an yapılandırılmadı. Lütfen daha sonra tekrar deneyin.",
        },
      },
    });
  }

  const formData = await request.formData();
  const turnstileToken = String(formData.get("cf-turnstile-response") || "");
  const validation = validateReviewFormData(formData, request);

  if (!validation.ok) {
    return failureResponse({
      request,
      redirect,
      status: 400,
      body: { ok: false, errors: validation.errors },
    });
  }

  const turnstileOk = await verifyTurnstileToken(turnstileToken, request);
  if (!turnstileOk) {
    return failureResponse({
      request,
      redirect,
      status: 400,
      body: {
        ok: false,
        errors: {
          turnstile: "Güvenlik doğrulaması tamamlanamadı. Lütfen tekrar deneyin.",
        },
      },
    });
  }

  const submission = validation.submission;
  const rateLimited = await hasRateLimitExceeded({
    ipHmac: submission.ipHmac,
    phoneHmac: submission.phoneHmac,
  });

  if (rateLimited) {
    return failureResponse({
      request,
      redirect,
      status: 429,
      body: {
        ok: false,
        errors: {
          form: "Kısa süre içinde çok fazla yorum gönderildi. Lütfen daha sonra tekrar deneyin.",
        },
      },
    });
  }

  const visibilityStatus = submission.shouldQuarantine ? "quarantined" : "published";
  const { error } = await supabase.from("reviews").insert({
    full_name: submission.fullName,
    public_name: submission.publicName,
    display_full_name: submission.displayFullName,
    phone: submission.phone,
    phone_hmac: submission.phoneHmac,
    ip_hmac: submission.ipHmac,
    service_id: submission.serviceId,
    service_title: submission.serviceTitle,
    rating: submission.rating,
    comment: submission.comment,
    visibility_status: visibilityStatus,
    verification_status: "unverified",
    featured: false,
    source: "website",
    consent_text_version: "reviews-v1-2026-08",
    idempotency_hmac: submission.idempotencyHmac,
  });

  if (error?.code === "23505") {
    return failureResponse({
      request,
      redirect,
      status: 409,
      body: {
        ok: false,
        errors: {
          form: "Bu yorum gönderimi zaten alındı.",
        },
      },
    });
  }

  if (error) {
    return failureResponse({
      request,
      redirect,
      status: 503,
      body: {
        ok: false,
        errors: {
          form: "Yorum şu an kaydedilemedi. Lütfen biraz sonra tekrar deneyin.",
        },
      },
    });
  }

  if (wantsHtml(request)) {
    return redirect(
      visibilityStatus === "published"
        ? "/yorumlar?yorum=alindi"
        : "/yorumlar?yorum=incelemede",
      303,
    );
  }

  return jsonResponse({
    ok: true,
    status: visibilityStatus,
    message:
      visibilityStatus === "published"
        ? "Yorumunuz doğrulanmamış etiketiyle yayınlandı."
        : "Yorumunuz incelemeye alındı.",
  });
};
