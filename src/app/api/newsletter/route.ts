import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().email("Adresse e-mail invalide.").max(254),
});

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  // Rate limit : 5 inscriptions max par IP sur 15 minutes
  const { allowed, retryAfter } = await checkRateLimit(`newsletter:${ip}`);
  if (!allowed) {
    return NextResponse.json(
      { error: `Trop de tentatives. Réessayez dans ${retryAfter} secondes.` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const body = await request.json().catch(() => ({}));
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 }
    );
  }

  const { email } = result.data;

  try {
    await prisma.subscriber.create({ data: { email } });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    // Unique constraint violation → already subscribed
    if (
      err instanceof Error &&
      err.message.includes("Unique constraint")
    ) {
      return NextResponse.json({ ok: true }); // silent duplicate
    }
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
