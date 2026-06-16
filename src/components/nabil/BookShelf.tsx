"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface BookItem {
  id: number;
  meta: string;
  pub: string;
  pages: string;
  title: string;
  desc: string;
  foot: string;
  color: "b-ink" | "b-bone" | "b-brown" | "b-coal" | "b-stone" | "b-cream";
  width: number;
  height: number;
  lean?: "lean-l" | "lean-r";
}

interface BookShelfProps {
  books: BookItem[];
}

const colorMap: Record<string, string> = {
  "b-ink":   "bg-[#0e0c0a] text-[#e9e5da]",
  "b-coal":  "bg-[#1f1d1a] text-[#e9e5da]",
  "b-bone":  "bg-[#d8d0bd] text-[#1a1816]",
  "b-brown": "bg-[#3a322a] text-[#e9e5da]",
  "b-stone": "bg-[#7a7165] text-[#f4f1ea]",
  "b-cream": "bg-[#e9e2d0] text-[#1a1816]",
};

const leanMap: Record<string, string> = {
  "lean-l": "rotate-[-2.4deg] translate-y-[-2px] origin-bottom-right hover:rotate-[-2.4deg] hover:translate-y-[-16px]",
  "lean-r": "rotate-[2.4deg]  translate-y-[-2px] origin-bottom-left  hover:rotate-[2.4deg]  hover:translate-y-[-16px]",
};

export default function BookShelf({ books }: BookShelfProps) {
  const [activeId, setActiveId] = useState(0);
  const active = books[activeId] ?? books[0];

  if (!books.length) return null;

  return (
    <div className="max-w-[1640px] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-[clamp(50px,6vw,100px)] items-end">

      {/* ── Étagère ── */}
      <div className="relative">
        <div className="flex items-end justify-start gap-[6px] min-h-[440px] px-[18px] relative z-[2]">
          <span className="w-[18px] h-[18px] self-end border-l border-b border-[var(--color-soft)] opacity-50" />

          {books.map((book, idx) => (
            <button
              key={book.id}
              onClick={() => setActiveId(idx)}
              style={{ width: book.width, height: book.height }}
              className={cn(
                "relative flex flex-col items-center justify-between py-[22px]",
                "cursor-pointer transition-all duration-[450ms] ease-[cubic-bezier(.6,.2,.2,1)]",
                "shadow-[inset_-10px_0_18px_rgba(0,0,0,.30),inset_8px_0_14px_rgba(255,255,255,.04),0_6px_14px_-8px_rgba(0,0,0,.5)]",
                "before:content-[''] before:absolute before:left-[14%] before:right-[14%] before:top-[14px] before:h-px before:bg-current before:opacity-30",
                "after:content-['']  after:absolute  after:left-[14%] after:right-[14%] after:bottom-[48px] after:h-px after:bg-current after:opacity-30",
                colorMap[book.color] ?? colorMap["b-ink"],
                book.lean ? leanMap[book.lean] : "hover:-translate-y-[14px]",
                activeId === idx && !book.lean && "-translate-y-[18px] brightness-[1.12]",
                activeId === idx && book.lean && "-translate-y-[16px]",
              )}
            >
              <span
                className="[writing-mode:vertical-rl] rotate-180 font-serif font-normal text-[17px] tracking-[.01em] leading-[1.05] text-left flex-1 py-[30px_0_16px] px-0"
                style={{ paddingTop: 30, paddingBottom: 16 }}
                dangerouslySetInnerHTML={{ __html: book.title }}
              />
              <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[9.5px] tracking-[.28em] uppercase opacity-65 pb-2">
                N. Louaar
              </span>
            </button>
          ))}

          <span className="w-[18px] h-[18px] self-end border-r border-b border-[var(--color-soft)] opacity-50" />
        </div>

        {/* Planche */}
        <div
          className="h-[14px] relative z-[1] -mt-[2px]"
          style={{
            background: "linear-gradient(180deg, #0a0a0a 0%, #1a1816 55%, #0a0a0a 100%)",
            boxShadow: "0 14px 24px -14px rgba(0,0,0,.55), inset 0 1px 0 #2a2622",
          }}
        />

        <div className="flex justify-between mt-5 font-mono text-[10.5px] tracking-[.22em] uppercase text-[var(--color-soft)]">
          <span>Bibliothèque — {books.length} titre{books.length > 1 ? "s" : ""}</span>
          <span>Cliquez un livre →</span>
        </div>
      </div>

      {/* ── Détail livre ── */}
      {active && (
        <div className="pt-5 pb-[10px] border-t border-[#1a1816] border-b border-b-[#c8c5bc] min-h-[380px] flex flex-col justify-between">
          <div>
            <div className="flex justify-between font-mono text-[11px] tracking-[.22em] uppercase text-[var(--color-soft)]">
              <span>{active.meta}</span>
              <span>
                <b className="text-[var(--color-ink)] font-normal">{active.pub}</b>
                {active.pages && <>{" · "}{active.pages}</>}
              </span>
            </div>

            <h3
              className="font-serif font-normal text-[clamp(40px,4.4vw,64px)] leading-[1.0] tracking-[-0.015em] text-[var(--color-ink)] mt-6
                         [&_em]:italic [&_em]:font-light [&_em]:text-[#3a3a35]"
              dangerouslySetInnerHTML={{ __html: active.title }}
            />

            <p className="font-serif text-[19px] leading-[1.5] text-[#1a1a17] mt-7 max-w-[48ch]">
              {active.desc}
            </p>
          </div>

          <div className="flex justify-between items-baseline mt-8 font-mono text-[10.5px] tracking-[.22em] uppercase text-[var(--color-soft)]">
            <span>{active.foot}</span>
            <span className="font-serif italic text-[16px] text-[var(--color-ink)] tracking-normal normal-case border-b border-[var(--color-ink)] pb-px cursor-pointer">
              Lire un extrait →
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
