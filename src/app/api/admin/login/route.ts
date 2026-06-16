import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAdminToken, COOKIE_NAME, COOKIE_MAX_AGE, getPasswordHash } from "@/lib/auth";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed, retryAfter } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: `Trop de tentatives. Réessayez dans ${retryAfter} secondes.` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const { password } = await request.json().catch(() => ({ password: "" }));

  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "Mot de passe requis." }, { status: 400 });
  }

  const hash = await getPasswordHash();
  if (!hash) {
    return NextResponse.json({ error: "Configuration serveur manquante." }, { status: 500 });
  }

  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    await new Promise((r) => setTimeout(r, 300));
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  // Reset counter on successful login
  resetRateLimit(ip);

  const token = await signAdminToken();
  const response = NextResponse.json({ ok: true });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return response;
}
