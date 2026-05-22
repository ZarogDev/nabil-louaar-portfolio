const navLinks = ["Accueil", "Présentation", "Écriture", "Vidéo"];
const navHrefs = ["#home", "#presentation", "#ecriture", "#video"];
const contactLinks = [
  { label: "bonjour@louaar.fr", href: "mailto:bonjour@louaar.fr" },
  { label: "Presse — presse@louaar.fr", href: "mailto:presse@louaar.fr" },
  { label: "Agent — c.mercier@m-l.fr",  href: "mailto:c.mercier@m-l.fr" },
];
const socialLinks = ["Instagram ↗", "LinkedIn ↗", "X ↗"];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#a8a59d] px-[var(--pad-x)] pt-[clamp(60px,7vw,110px)] pb-[28px]"
            style={{ "--pad-x": "clamp(28px, 6vw, 120px)" } as React.CSSProperties}>
      <div className="max-w-[1640px] mx-auto grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-[60px] items-start">

        {/* Marque */}
        <div>
          <div className="font-serif text-[clamp(40px,5vw,76px)] leading-[.92] text-[#f4f1ea] font-normal tracking-[-0.01em]">
            Nabil<br />
            Lou<em className="italic font-light text-[#a8a59d]">aar</em>.
          </div>
          <p className="mt-6 font-serif text-[18px] text-[#a8a59d] max-w-[32ch] leading-[1.45]">
            Écrivain &amp; réalisateur.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-mono text-[10.5px] tracking-[.22em] uppercase text-[#7a7770] font-normal mb-[18px]">
            Navigation
          </h4>
          <ul className="list-none flex flex-col gap-2">
            {navLinks.map((label, i) => (
              <li key={label}>
                <a href={navHrefs[i]} className="font-serif text-[18px] text-[#e9e5da] hover:text-white">
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
                <a href={href} className="font-serif text-[18px] text-[#e9e5da] hover:text-white">
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
            {socialLinks.map((label) => (
              <li key={label}>
                <a href="#" className="font-serif text-[18px] text-[#e9e5da] hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-[1640px] mx-auto mt-[clamp(50px,6vw,90px)] border-t border-[#1f1d1a] pt-[22px] flex justify-between font-mono text-[10.5px] tracking-[.2em] uppercase text-[#7a7770]">
        <span>© Nabil Louaar — MMXXVI</span>
        <span>Site — Studio Marçal</span>
        <span>Typographie — Cormorant · Geist</span>
      </div>
    </footer>
  );
}
