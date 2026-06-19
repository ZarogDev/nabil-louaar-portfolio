import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const writingUpdateSchema = z.object({
  title:       z.string().min(1).max(200),
  year:        z.number().int().min(1900).max(2100),
  publisher:   z.string().min(1).max(200),
  description: z.string().max(2000).nullable().optional(),
  coverUrl:    z.string().url().nullable().optional(),
  color:       z.enum(["b-ink", "b-coal", "b-bone", "b-brown", "b-stone", "b-cream"]).nullable().optional(),
  badge:       z.string().max(100).nullable().optional(),
  order:       z.number().int().min(0).optional().default(0),
  published:   z.boolean().optional().default(true),
});

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const result = writingUpdateSchema.safeParse({
    ...body,
    year:        body.year  !== undefined ? Number(body.year)  : body.year,
    order:       body.order !== undefined ? Number(body.order) : undefined,
    description: body.description || null,
    coverUrl:    body.coverUrl    || null,
    color:       body.color       || null,
    badge:       body.badge       || null,
  });
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 }
    );
  }
  const writing = await prisma.writing.update({
    where: { id: Number(id) },
    data: result.data,
  });
  return NextResponse.json(writing);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  await prisma.writing.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
