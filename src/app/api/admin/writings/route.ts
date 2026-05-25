import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  if (!await requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const writings = await prisma.writing.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(writings);
}

export async function POST(request: NextRequest) {
  if (!await requireAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const data = await request.json();
  const writing = await prisma.writing.create({
    data: {
      title:       data.title,
      year:        Number(data.year),
      publisher:   data.publisher,
      description: data.description || null,
      coverUrl:    data.coverUrl    || null,
      color:       data.color       || null,
      badge:       data.badge       || null,
      order:       Number(data.order ?? 0),
      published:   data.published !== false,
    },
  });
  return NextResponse.json(writing, { status: 201 });
}
