import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPasswordHash } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { currentPassword, newPassword } = await request.json().catch(() => ({}));

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Champs requis." }, { status: 400 });
  }

  if (newPassword.length < 12) {
    return NextResponse.json({ error: "Le mot de passe doit faire au moins 12 caractères." }, { status: 400 });
  }

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
