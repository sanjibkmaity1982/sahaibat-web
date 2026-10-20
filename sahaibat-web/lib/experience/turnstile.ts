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
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
    cache: "no-store",
  });
  if (!res.ok) return false;
  const out = (await res.json()) as { success?: boolean };
  return out.success === true;
}
