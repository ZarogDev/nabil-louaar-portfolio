import { prisma } from "@/lib/db";
import AdminShell from "../_components/AdminShell";
import WritingManager from "./_components/WritingManager";

export const dynamic = "force-dynamic";
export const metadata = { title: "Écrits" };

export default async function AdminWritingsPage() {
  const writings = await prisma.writing.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminShell>
      <WritingManager initialWritings={writings} />
    </AdminShell>
  );
}
