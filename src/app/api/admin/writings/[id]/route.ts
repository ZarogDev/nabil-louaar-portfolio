import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  const data = await request.json();
  const writing = await prisma.writing.update({
    where: { id: Number(id) },
    data: {
      title:       data.title,
      year:        Number(data.year),
      publisher:   data.publisher,
      description: data.description ?? null,
      coverUrl:    data.coverUrl    ?? null,
      color:       data.color       ?? null,
      badge:       data.badge       ?? null,
      order:       Number(data.order ?? 0),
      published:   data.published !== false,
    },
  });
  return NextResponse.json(writing);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  await prisma.writing.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
