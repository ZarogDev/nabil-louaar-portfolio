"use client";

import Image from "next/image";

interface HeaderProps {
  onMenuOpen: () => void;
}

export default function Header({ onMenuOpen }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-[clamp(28px,4vw,56px)] py-[30px] pointer-events-none">
      <a href="#home" className="pointer-events-auto flex items-center gap-[14px] text-[#f4f1ea]">
        <Image
          src="/images/logo-monogram.webp"
          alt="Nabil Louaar — monogramme"
          width={42}
          height={42}
          className="block"
          priority
        />
        <span className="font-serif font-medium text-[18px] tracking-[.02em] leading-none">
          Nabil Louaar
          <small className="block font-mono text-[9.5px] tracking-[.24em] uppercase text-[#a8a59d] mt-[6px] font-normal">
            Écrivain &amp; Réalisateur
          </small>
        </span>
      </a>

      <div className="pointer-events-auto flex items-center gap-[26px]">
        <button
          onClick={onMenuOpen}
          aria-label="Menu"
          className="inline-flex flex-col justify-center gap-[6px] w-[34px] h-[34px] cursor-pointer text-[#f4f1ea] group"
        >
          <span className="block h-px w-[28px] bg-current transition-all duration-[250ms]" />
          <span className="block h-px w-5 bg-current self-end transition-all duration-[250ms] group-hover:w-[28px]" />
        </button>
      </div>
    </header>
  );
}
