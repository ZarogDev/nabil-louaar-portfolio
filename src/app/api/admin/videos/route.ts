import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const videoSchema = z.object({
  title:        z.string().min(1).max(200),
  duration:     z.string().min(1).max(20),
  type:         z.string().min(1).max(100),
  year:         z.number().int().min(1900).max(2100),
  festival:     z.string().max(200).nullable().optional(),
  description:  z.string().max(2000).nullable().optional(),
  thumbnailUrl: z.string().url().nullable().optional(),
  videoUrl:     z.string().url().nullable().optional(),
  order:        z.number().int().min(0).optional().default(0),
  published:    z.boolean().optional().default(true),
});

export async function GET(request: NextRequest) {
  if (!await requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const videos = await prisma.video.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(videos);
}

export async function POST(request: NextRequest) {
  if (!await requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const result = videoSchema.safeParse({
    ...body,
    year:         body.year  !== undefined ? Number(body.year)  : body.year,
    order:        body.order !== undefined ? Number(body.order) : undefined,
    festival:     body.festival     || null,
    description:  body.description  || null,
    thumbnailUrl: body.thumbnailUrl || null,
    videoUrl:     body.videoUrl     || null,
  });

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 }
    );
  }

  const video = await prisma.video.create({ data: result.data });
  return NextResponse.json(video, { status: 201 });
}
