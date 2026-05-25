import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  const data = await request.json();
  const video = await prisma.video.update({
    where: { id: Number(id) },
    data: {
      title:        data.title,
      duration:     data.duration,
      type:         data.type,
      year:         Number(data.year),
      festival:     data.festival     ?? null,
      description:  data.description  ?? null,
      thumbnailUrl: data.thumbnailUrl ?? null,
      videoUrl:     data.videoUrl     ?? null,
      order:        Number(data.order ?? 0),
      published:    data.published !== false,
    },
  });
  return NextResponse.json(video);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  await prisma.video.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
