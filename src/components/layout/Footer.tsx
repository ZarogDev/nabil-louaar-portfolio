import Link from 'next/link';
import Image from "next/image";

const navLinks = ["Accueil", "Présentation", "Écriture", "Vidéo"];
const navHrefs = ["#home", "#presentation", "#ecriture", "#video"];
const contactLinks = [
  { label: "Presse — presse@louaar.fr", href: "mailto:presse@louaar.fr" },
  { label: "Agent — c.mercier@m-l.fr",  href: "mailto:c.mercier@m-l.fr" },
];
const socialLinks = [
  { label: "Instagram ↗", href: "https://www.instagram.com/nabillouaar", ariaLabel: "Nabil Louaar sur Instagram (nouvelle fenêtre)" },
  { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/nabillouaar", ariaLabel: "Nabil Louaar sur LinkedIn (nouvelle fenêtre)" },
  { label: "X ↗", href: "https://x.com/nabillouaar", ariaLabel: "Nabil Louaar sur X / Twitter (nouvelle fenêtre)" },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#0a0a0a] text-[#a8a59d] px-[var(--pad-x)] pt-[clamp(60px,7vw,110px)] pb-[28px]"
      style={{ "--pad-x": "clamp(28px, 6vw, 120px)" } as React.CSSProperties}
    >
      <div className="max-w-[1640px] mx-auto grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-[60px] items-start">

        {/* Marque */}
        <div>
          <Image
            src="/images/logo-footer.webp"
            alt="Monogramme NL — Nabil Louaar"
            width={120}
            height={97}
            className="opacity-90"
          />
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-mono text-[10.5px] tracking-[.22em] uppercase text-[#7a7770] font-normal mb-[18px]">
            Navigation
          </h4>
          <ul className="list-none flex flex-col gap-2">
            {navLinks.map((label, i) => (
              <li key={label}>
                <a href={navHrefs[i]} className="font-serif text-[18px] text-[#e9e5da] hover:text-white transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-mono text-[10.5px] tracking-[.22em] uppercase text-[#7a7770] font-normal mb-[18px]">
            Contact
          </h4>
          <ul className="list-none flex flex-col gap-2">
            {contactLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="font-serif text-[18px] text-[#e9e5da] hover:text-white transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Ailleurs */}
        <div>
          <h4 className="font-mono text-[10.5px] tracking-[.22em] uppercase text-[#7a7770] font-normal mb-[18px]">
            Ailleurs
          </h4>
          <ul className="list-none flex flex-col gap-2">
            {socialLinks.map(({ label, href, ariaLabel }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  className="font-serif text-[18px] text-[#e9e5da] hover:text-white transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Barre de bas */}
      <div className="max-w-[1640px] mx-auto mt-[clamp(50px,6vw,90px)] border-t border-[#1f1d1a] pt-[22px] flex flex-col gap-3 md:flex-row md:items-center md:justify-between font-mono text-[10.5px] tracking-[.18em] uppercase text-[#7a7770]">
        <span>© Nabil Louaar — 2026</span>
        <span className="tracking-[.14em] normal-case text-[10px]">
          © 2026 ZarogDev. Agence digitale — design &amp; développement signés ZarogDev.{" "}
          <a href="mailto:zarogdev@gmail.com" className="hover:text-[#a8a59d] transition-colors underline underline-offset-2">
            contact@zarogdev.fr
          </a>
        </span>
        <nav className="flex gap-5">
          <Link href="/mentions-legales" className="text-[9px] tracking-[.18em] uppercase text-[#5a5752] hover:text-[#a8a59d] transition-colors">Mentions légales</Link>
          <Link href="/politique-confidentialite" className="text-[9px] tracking-[.18em] uppercase text-[#5a5752] hover:text-[#a8a59d] transition-colors">Confidentialité</Link>
          <Link href="/cgu" className="text-[9px] tracking-[.18em] uppercase text-[#5a5752] hover:text-[#a8a59d] transition-colors">CGU</Link>
        </nav>
      </div>
    </footer>
  );
}
