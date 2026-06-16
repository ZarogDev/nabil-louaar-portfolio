import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getPasswordHash, requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword:     z.string().min(12, "Le mot de passe doit faire au moins 12 caractères.").max(128),
});

export async function POST(request: NextRequest) {
  if (!await requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 }
    );
  }

  const { currentPassword, newPassword } = result.data;

  const hash = await getPasswordHash();
  if (!hash) {
    return NextResponse.json({ error: "Configuration manquante." }, { status: 500 });
  }

  const valid = await bcrypt.compare(currentPassword, hash);
  if (!valid) {
    await new Promise((r) => setTimeout(r, 300));
    return NextResponse.json({ error: "Mot de passe actuel incorrect." }, { status: 401 });
  }

  const newHash = await bcrypt.hash(newPassword, 12);
  await prisma.adminConfig.upsert({
    where:  { key: "password_hash" },
    update: { value: newHash },
    create: { key: "password_hash", value: newHash },
  });

  return NextResponse.json({ ok: true });
}
