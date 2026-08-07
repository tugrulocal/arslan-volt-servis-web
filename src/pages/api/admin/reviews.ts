import type { APIRoute } from "astro";
import { requireReviewAdmin } from "../../../lib/reviews/admin-auth";
import { getSupabaseAdminClient } from "../../../lib/supabase/server";

export const prerender = false;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function writeAuditLog({
  action,
  reviewId,
  userId,
}: {
  action: string;
  reviewId: string;
  userId: string;
}) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return;

  await supabase.from("review_audit_logs").insert({
    review_id: reviewId,
    admin_user_id: userId,
    action,
  });
}

export const GET: APIRoute = async ({ request, url }) => {
  const admin = await requireReviewAdmin(request);
  if (!admin.ok) return jsonResponse({ ok: false, error: admin.message }, admin.status);

  const supabase = getSupabaseAdminClient();
  if (!supabase) return jsonResponse({ ok: false, error: "Supabase yapılandırılmadı." }, 503);

  const status = url.searchParams.get("status");
  const verification = url.searchParams.get("verification");

  let query = supabase
    .from("reviews")
    .select(
      "id, full_name, public_name, display_full_name, phone, phone_purge_at, service_id, service_title, rating, comment, visibility_status, verification_status, featured, owner_reply, source, consent_text_version, consent_accepted_at, created_at, updated_at",
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (status && status !== "all") query = query.eq("visibility_status", status);
  if (verification && verification !== "all") {
    query = query.eq("verification_status", verification);
  }

  const { data, error, count } = await query;
  if (error) return jsonResponse({ ok: false, error: error.message }, 503);

  return jsonResponse({ ok: true, reviews: data ?? [], count: count ?? 0 });
};

export const PATCH: APIRoute = async ({ request }) => {
  const admin = await requireReviewAdmin(request);
  if (!admin.ok) return jsonResponse({ ok: false, error: admin.message }, admin.status);

  const supabase = getSupabaseAdminClient();
  if (!supabase) return jsonResponse({ ok: false, error: "Supabase yapılandırılmadı." }, 503);

  const body = (await request.json()) as {
    id?: string;
    action?: string;
    ownerReply?: string | null;
  };
  const id = body.id;
  const action = body.action;

  if (!id || !action) {
    return jsonResponse({ ok: false, error: "Eksik işlem bilgisi." }, 400);
  }

  const updates: Record<string, unknown> = {};

  if (action === "verify") {
    updates.verification_status = "verified";
    updates.verified_at = new Date().toISOString();
  } else if (action === "unverify") {
    updates.verification_status = "unverified";
    updates.verified_at = null;
  } else if (action === "hide") {
    updates.visibility_status = "hidden";
    updates.hidden_at = new Date().toISOString();
  } else if (action === "restore") {
    updates.visibility_status = "published";
    updates.hidden_at = null;
  } else if (action === "feature") {
    updates.featured = true;
  } else if (action === "unfeature") {
    updates.featured = false;
  } else if (action === "reply") {
    const reply = (body.ownerReply ?? "").trim();
    if (reply.length > 700) {
      return jsonResponse({ ok: false, error: "Yanıt 700 karakteri geçemez." }, 400);
    }
    updates.owner_reply = reply || null;
  } else {
    return jsonResponse({ ok: false, error: "Bilinmeyen işlem." }, 400);
  }

  updates.updated_at = new Date().toISOString();

  const { error } = await supabase.from("reviews").update(updates).eq("id", id);
  if (error) return jsonResponse({ ok: false, error: error.message }, 503);

  await writeAuditLog({ action, reviewId: id, userId: admin.userId });

  return jsonResponse({ ok: true });
};

export const DELETE: APIRoute = async ({ request }) => {
  const admin = await requireReviewAdmin(request);
  if (!admin.ok) return jsonResponse({ ok: false, error: admin.message }, admin.status);

  const supabase = getSupabaseAdminClient();
  if (!supabase) return jsonResponse({ ok: false, error: "Supabase yapılandırılmadı." }, 503);

  const body = (await request.json()) as { id?: string; confirm?: string };
  if (!body.id || body.confirm !== "KALICI SIL") {
    return jsonResponse({ ok: false, error: "Kalıcı silme onayı gerekli." }, 400);
  }

  const { error } = await supabase.from("reviews").delete().eq("id", body.id);
  if (error) return jsonResponse({ ok: false, error: error.message }, 503);

  await writeAuditLog({
    action: "delete",
    reviewId: body.id,
    userId: admin.userId,
  });

  return jsonResponse({ ok: true });
};

