"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Bouton « retour en haut » monté dans le layout racine : toutes les pages publiques (pas l'admin). */
export default function BackToTop() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retour en haut"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed right-[clamp(20px,2.4vw,40px)] bottom-[clamp(20px,2.4vw,40px)] z-40
                  w-14 h-14 rounded-full bg-[#0a0a0a] text-[#f4f1ea]
                  grid place-items-center cursor-pointer border border-[#0a0a0a]
                  transition-all duration-[350ms] ease-out motion-reduce:transition-none group
                  hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]
                  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a8a59d]
                  ${show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-5 pointer-events-none"}`}
    >
      <span className="absolute right-[66px] top-1/2 -translate-y-1/2 font-mono text-[10.5px] tracking-[.22em] uppercase text-[var(--color-ink)] bg-[var(--color-paper)] border border-[var(--color-rule)] px-3 py-[7px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] pointer-events-none">
        Revenir en haut
      </span>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none stroke-[1.2] [stroke-linecap:round] [stroke-linejoin:round] transition-transform duration-[250ms] motion-reduce:transition-none group-hover:-translate-y-1">
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
