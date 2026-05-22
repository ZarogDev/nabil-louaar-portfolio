import { prisma } from "@/lib/db";
import AdminShell from "../_components/AdminShell";
import VideoManager from "./_components/VideoManager";

export const dynamic = "force-dynamic";
export const metadata = { title: "Vidéos" };

export default async function AdminVideosPage() {
  const videos = await prisma.video.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminShell>
      <VideoManager initialVideos={videos} />
    </AdminShell>
  );
}
