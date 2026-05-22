import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const videos = await prisma.video.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(videos);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const video = await prisma.video.create({
    data: {
      title:        data.title,
      duration:     data.duration,
      type:         data.type,
      year:         Number(data.year),
      festival:     data.festival     || null,
      description:  data.description  || null,
      thumbnailUrl: data.thumbnailUrl || null,
      videoUrl:     data.videoUrl     || null,
      order:        Number(data.order ?? 0),
      published:    data.published !== false,
    },
  });
  return NextResponse.json(video, { status: 201 });
}
