"use client";

import { useEffect } from "react";
import Image from "next/image";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "#home",         label: "Accueil",        em: null },
  { href: "#presentation", label: "Présen",          em: "tation" },
  { href: "#ecriture",     label: null,              em: "Écriture" },
  { href: "#video",        label: "Vidéo",           em: null },
  { href: "#contact",      label: "Contact",         em: null },
];

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[100] bg-[#0a0a0a] text-[#f4f1ea]
                  grid grid-cols-1 lg:grid-cols-2
                  transition-transform duration-500 ease-[cubic-bezier(.7,.0,.2,1)]
                  ${isOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"}`}
    >
      {/* Colonne gauche : navigation */}
      <div className="flex flex-col justify-between px-[clamp(40px,5vw,80px)] py-[60px] border-r border-[#1f1d1a]">
        {/* Top */}
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-[14px] text-[#f4f1ea]">
            <Image src="/images/logo-monogram.webp" alt="" width={42} height={42} />
            <span className="font-serif font-medium text-[18px] leading-none">
              Nabil Louaar
              <small className="block font-mono text-[9.5px] tracking-[.24em] uppercase text-[#a8a59d] mt-[6px] font-normal">
                Écrivain &amp; Réalisateur
              </small>
            </span>
          </span>
          <button
            onClick={onClose}
            className="font-mono text-[11px] tracking-[.24em] uppercase text-[#a8a59d] cursor-pointer inline-flex items-center gap-3"
          >
            Fermer
            <span className="relative inline-block w-[18px] h-[18px]
                             before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:h-px before:bg-[#f4f1ea] before:rotate-45
                             after:content-['']  after:absolute  after:top-1/2  after:left-0  after:right-0  after:h-px  after:bg-[#f4f1ea] after:-rotate-45" />
          </button>
        </div>

        {/* Nav */}
        <ul className="list-none flex flex-col mt-[60px] flex-1 justify-center">
          {navItems.map((item, i) => (
            <li
              key={i}
              className="flex items-baseline gap-8 border-b border-[#1f1d1a] py-[22px] first:border-t first:border-t-[#1f1d1a] group"
            >
              <span className="font-mono text-[11px] tracking-[.24em] text-[#7a7770] w-10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <a
                href={item.href}
                onClick={onClose}
                className="font-serif text-[clamp(48px,6vw,86px)] text-[#f4f1ea] font-normal leading-none tracking-[-0.01em] flex-1 flex items-baseline justify-between group-hover:text-white"
              >
                {item.em && !item.label
                  ? <em className="italic font-light text-[#cfc9bd]">{item.em}</em>
                  : item.em
                    ? <>{item.label}<em className="italic font-light text-[#cfc9bd]">{item.em}</em></>
                    : item.label
                }
                <span className="font-serif text-[.42em] italic text-[#7a7770] opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex justify-between font-mono text-[10.5px] tracking-[.22em] uppercase text-[#7a7770] mt-10">
          <span>bonjour@louaar.fr</span>
        </div>
      </div>

      {/* Colonne droite : portrait + socials */}
      <div className="hidden lg:flex flex-col justify-between px-[clamp(40px,5vw,80px)] py-[60px]">
        <div>
          <p className="font-serif italic text-[clamp(22px,2.2vw,32px)] leading-[1.3] text-[#e9e5da] max-w-[32ch]">
            « Écrire, c&apos;est garder la lumière allumée dans la pièce que l&apos;on vient de quitter. »
          </p>
        </div>

        {/* Portrait */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-[280px] aspect-video overflow-hidden border border-[#1f1d1a] relative">
            <Image
              src="/images/portrait-menu.webp"
              alt="Nabil Louaar"
              fill
              className="object-cover object-top grayscale"
              sizes="280px"
            />
          </div>
          <div className="w-full max-w-[280px] mt-3 flex justify-between font-mono text-[10px] tracking-[.22em] uppercase text-[#7a7770]">
            <span>Nabil Louaar</span>
            <span>2025</span>
          </div>
        </div>

        <div>
          <h5 className="font-mono text-[10.5px] tracking-[.22em] uppercase text-[#7a7770] mb-[18px] font-normal">
            Ailleurs
          </h5>
          <ul className="list-none flex flex-col gap-[10px]">
            {["Instagram ↗", "LinkedIn ↗", "X ↗", "bonjour@louaar.fr"].map((link) => (
              <li key={link}>
                <a href="#" className="font-serif text-[18px] text-[#e9e5da] hover:text-white">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
