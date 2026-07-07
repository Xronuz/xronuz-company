import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, isAuthed, tokenFor } from "@/lib/admin-server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: await isAuthed() });
}

export async function POST(req: Request) {
  const expected = adminToken();
  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD .env.local faylida sozlanmagan" },
      { status: 500 }
    );
  }
  let password = "";
  try {
    const body = await req.json();
    if (typeof body?.password === "string") password = body.password;
  } catch {
    /* fall through to reject */
  }
  const provided = tokenFor(password);
  const ok =
    provided.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  if (!ok) {
    return NextResponse.json({ error: "Parol noto'g'ri" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  // secure: false so the panel also works on plain-http localhost tests;
  // in production serve the site over HTTPS (reverse proxy) as usual
  res.cookies.set(ADMIN_COOKIE, expected, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
