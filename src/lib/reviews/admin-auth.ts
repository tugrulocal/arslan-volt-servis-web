import { getSupabaseAuthClient } from "../supabase/server";

type JwtPayload = {
  app_metadata?: {
    role?: string;
  };
};

function decodeJwtPayload(token: string): JwtPayload | undefined {
  const payload = token.split(".")[1];
  if (!payload) return undefined;

  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as JwtPayload;
  } catch {
    return undefined;
  }
}

export async function requireReviewAdmin(request: Request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  const supabase = getSupabaseAuthClient();

  if (!token || !supabase) {
    return { ok: false as const, status: 401, message: "Oturum gerekli." };
  }

  const { data, error } = await supabase.auth.getUser(token);
  const payload = decodeJwtPayload(token);
  const role = data.user?.app_metadata?.role || payload?.app_metadata?.role;

  if (error || !data.user) {
    return { ok: false as const, status: 401, message: "Oturum doğrulanamadı." };
  }

  if (role !== "review_admin") {
    return { ok: false as const, status: 403, message: "Yönetici yetkisi gerekli." };
  }

  return { ok: true as const, userId: data.user.id };
}
