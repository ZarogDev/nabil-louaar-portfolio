import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.video.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
