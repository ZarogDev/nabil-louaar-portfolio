import Link from "next/link";
import { prisma } from "@/lib/db";
import AdminShell from "./_components/AdminShell";

export const dynamic = "force-dynamic";
export const metadata = { title: "Tableau de bord" };

export default async function AdminDashboardPage() {
  const [videoCount, writingCount] = await Promise.all([
    prisma.video.count(),
    prisma.writing.count(),
  ]);

  const stats = [
    { label: "Vidéos",  count: videoCount,   href: "/admin/videos"   },
    { label: "Écrits",  count: writingCount, href: "/admin/writings" },
  ];

  return (
    <AdminShell>
      <div className="px-10 py-10">
        <h1 className="font-serif text-[32px] text-[#f4f1ea] font-normal mb-1">
          Tableau de bord
        </h1>
        <p className="font-mono text-[10.5px] tracking-[.2em] uppercase text-[#7a7770] mb-10">
          Nabil Louaar — espace de gestion
        </p>

        <div className="grid grid-cols-2 gap-5 max-w-[520px]">
          {stats.map(({ label, count, href }) => (
            <Link
              key={label}
              href={href}
              className="block bg-[#161614] border border-[#1f1d1a] px-6 py-7
                         hover:border-[#3a3a35] hover:bg-[#1a1a17] transition-colors group"
            >
              <div className="font-serif text-[48px] text-[#f4f1ea] font-normal leading-none mb-3
                              group-hover:text-white transition-colors">
                {count}
              </div>
              <div className="font-mono text-[10.5px] tracking-[.22em] uppercase text-[#7a7770]">
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
