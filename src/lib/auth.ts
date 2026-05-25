import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

const secret = process.env.ADMIN_JWT_SECRET;
if (!secret) throw new Error("Missing ADMIN_JWT_SECRET env var");
const JWT_SECRET = new TextEncoder().encode(secret);

export const COOKIE_NAME = "admin_token";
export const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function requireAdmin(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

/** Returns the active password hash: DB-stored override first, then env var fallback. */
export async function getPasswordHash(): Promise<string | null> {
  try {
    // Dynamic import to avoid bundling DB in middleware (Edge runtime)
    const { prisma } = await import("./db");
    const row = await prisma.adminConfig.findUnique({ where: { key: "password_hash" } });
    if (row) return row.value;
  } catch {
    // DB unavailable — fall through to env var
  }
  return process.env.ADMIN_PASSWORD_HASH ?? null;
}
