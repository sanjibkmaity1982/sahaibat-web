import { NextRequest, NextResponse } from "next/server";

// Server-side passcode check — the real passcode never ships in client JS.
// Fails closed if INVESTOR_PASSCODE isn't configured in the environment.
export async function POST(req: NextRequest) {
  const configured = process.env.INVESTOR_PASSCODE;
  if (!configured) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const { passcode } = await req.json().catch(() => ({ passcode: "" }));
  if (typeof passcode !== "string" || passcode !== configured) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("sahaibat_investor_access", "granted", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
