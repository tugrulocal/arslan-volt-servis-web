type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken(
  token: string,
  request: Request,
): Promise<boolean> {
  const secret =
    import.meta.env.TURNSTILE_SECRET || import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;

  const remoteip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteip) body.set("remoteip", remoteip);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  if (!response.ok) return false;

  const result = (await response.json()) as TurnstileResponse;
  return result.success === true;
}
