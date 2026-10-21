// lib/experience/turnstile.ts
//
// Cloudflare Turnstile (free) keeps bots off the paid AI calls. Required only
// when TURNSTILE_SECRET_KEY is set, so local development works without it.

export function turnstileRequired(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: string | null, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const form = new URLSearchParams({ secret, response: token, remoteip: ip });
  // A Cloudflare outage or timeout fails closed (the visitor is asked to try
  // again) instead of crashing the request.
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return false;
    const out = (await res.json()) as { success?: boolean };
    return out.success === true;
  } catch (err) {
    console.error("experience: turnstile verify failed", err instanceof Error ? err.message : err);
    return false;
  }
}
