import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAdminToken, COOKIE_NAME, COOKIE_MAX_AGE, getPasswordHash } from "@/lib/auth";

export async function POST(request: NextRequest) {
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
