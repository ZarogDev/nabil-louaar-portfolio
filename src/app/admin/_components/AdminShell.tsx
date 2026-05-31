"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const nav = [
  { href: "/admin",          label: "Tableau de bord" },
  { href: "/admin/videos",   label: "Vidéos"           },
  { href: "/admin/writings", label: "Écrits"           },
  { href: "/admin/settings", label: "Réglages"         },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-[220px] shrink-0 border-r border-[#1f1d1a] flex flex-col">
        <div className="px-6 py-7 border-b border-[#1f1d1a] flex items-center gap-3">
          <Image src="/images/logo-monogram.webp" alt="" width={28} height={28} className="opacity-70" />
          <span className="font-serif text-[15px] text-[#f4f1ea]">Admin</span>
        </div>

        {/* Lien retour accueil */}
        <div className="px-3 pt-4 pb-2 border-b border-[#1f1d1a]">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 font-mono text-[11px] tracking-[.16em] uppercase
                       text-[#7a7770] hover:text-[#e9e5da] hover:bg-[#161614] rounded-sm transition-colors"
          >
            <span className="text-[13px] leading-none">←</span>
            Accueil
          </Link>
        </div>

        <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
          {nav.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 font-mono text-[11px] tracking-[.16em] uppercase transition-colors rounded-sm
                            ${active
                              ? "bg-[#1f1d1a] text-[#f4f1ea]"
                              : "text-[#7a7770] hover:text-[#e9e5da] hover:bg-[#161614]"}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-5 border-t border-[#1f1d1a]">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 font-mono text-[11px] tracking-[.16em] uppercase text-[#7a7770]
                       hover:text-red-400 hover:bg-[#1a0f0f] rounded-sm transition-colors text-left"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
