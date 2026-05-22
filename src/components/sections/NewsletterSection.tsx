"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  return (
    <section
      id="contact"
      className="bg-[var(--color-paper)] border-t border-[var(--color-rule)]
                 px-[clamp(28px,6vw,120px)] py-[clamp(110px,12vw,170px)]"
    >
      <div className="max-w-[1640px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-[clamp(40px,6vw,110px)] items-end">

        {/* Gauche : accroche */}
        <div>
          <span className="block font-mono text-[11px] tracking-[.18em] uppercase text-[var(--color-soft)] mb-[30px]">
            Restez connecté
          </span>
          <h2 className="font-serif font-normal text-[clamp(48px,6vw,96px)] leading-[.95] tracking-[-0.015em]">
            Une lettre <em className="italic font-light text-[#3a3a35]">par saison</em>,<br />
            parfois deux.
          </h2>
          <p className="font-serif text-[18px] leading-[1.55] text-[#3a3a35] max-w-[48ch] mt-6">
            Quatre fois par an, un courrier bref : un texte inédit, une note de tournage,
            et le calendrier des projections à venir. Pas d&apos;algorithmes, pas de publicité
            — seulement l&apos;adresse, et la patience qu&apos;on y met.
          </p>
        </div>

        {/* Droite : formulaire */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-[14px] border-t border-[var(--color-hair)] pt-6"
        >
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-[11px] tracking-[.18em] uppercase text-[var(--color-soft)]">
              Adresse électronique
            </span>
            <span className="font-mono text-[11px] tracking-[.18em] uppercase text-[var(--color-soft)]">
              Lecture · 2 min
            </span>
          </div>

          <div className="flex gap-[14px] items-stretch">
            {/* shadcn Input — styles surchargés pour coller au design */}
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="prénom@domaine.fr"
              aria-label="Adresse électronique"
              className="flex-1 rounded-none border-0 border-b border-[var(--color-hair)] bg-transparent
                         px-1 py-[18px] pb-[16px] h-auto shadow-none
                         font-serif text-2xl text-[var(--color-ink)]
                         placeholder:text-[#9a9890] placeholder:italic placeholder:font-light
                         focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[var(--color-ink)]"
            />

            {/* shadcn Button — variant outline personnalisé */}
            <Button
              type="submit"
              variant="outline"
              className="rounded-none border border-[var(--color-hair)] bg-transparent text-[var(--color-ink)]
                         px-7 h-auto font-mono text-[11px] tracking-[.22em] uppercase
                         hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]
                         transition-colors duration-200"
            >
              S&apos;abonner
            </Button>
          </div>

          <div className="flex justify-between text-[var(--color-soft)] mt-2">
            <span className="flex gap-[10px] items-center">
              <span className="w-3 h-3 border border-[var(--color-soft)] inline-block relative after:content-[''] after:absolute after:inset-[2px] after:bg-[var(--color-ink)]" />
              <span className="font-mono text-[11px] tracking-[.05em] normal-case">
                J&apos;accepte de recevoir la lettre saisonnière
              </span>
            </span>
            <span className="font-mono text-[11px] tracking-[.18em] uppercase">
              Désinscription · un clic
            </span>
          </div>
        </form>

      </div>
    </section>
  );
}
