import Image from "next/image";

const stats = [
  { dt: "Livres publiés",          dd: "Quatre titres" },
  { dt: "Films & courts métrages", dd: "Onze projets" },
  { dt: "Sélections officielles",  dd: "Cannes · Locarno" },
  { dt: "Représentation",          dd: <em className="italic text-[#a8a59d] font-light">Mercier &amp; Loup</em> },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="bg-[#0a0a0a] text-[#f4f1ea] min-h-screen
                 grid grid-cols-1 lg:grid-cols-[minmax(420px,40%)_1fr] relative overflow-hidden"
    >
      {/* Colonne gauche */}
      <div className="flex flex-col justify-between
                      pt-[clamp(120px,14vh,180px)] pb-[50px]
                      px-[clamp(40px,4vw,70px)]
                      border-b border-b-[#1f1d1a] lg:border-b-0 lg:border-r lg:border-r-[#1f1d1a]">
        <div>
          <h1 className="font-serif font-normal text-[clamp(64px,6.6vw,112px)] leading-[.9] tracking-[-0.02em] text-[#f4f1ea] mt-[30px]">
            Nabil<br />
            Lou<span className="italic font-light text-[#cfc9bd]">aar</span>
          </h1>

          <div className="font-serif italic font-light text-[clamp(20px,1.6vw,26px)] text-[#cfc9bd] mt-[22px] tracking-[.01em]">
            Écrivain <span className="italic font-light">&amp;</span> Réalisateur
          </div>

          <p className="max-w-[46ch] text-[13.5px] leading-[1.7] text-[#a8a59d] mt-10 font-light">
            Récits sur l&apos;exil, la mémoire et la lumière. Romans, scénarios et courts métrages
            produits entre Paris et Alger depuis douze ans — pour la page, pour l&apos;écran,
            et pour les voix qui résistent au silence.
          </p>
        </div>

        {/* Stats grid */}
        <dl className="mt-[50px] grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[#1f1d1a] pt-6">
          {stats.map(({ dt, dd }) => (
            <div key={dt}>
              <dt className="font-mono text-[10px] tracking-[.22em] uppercase text-[#7a7770] mb-2 font-normal">
                {dt}
              </dt>
              <dd className="font-serif text-[16px] text-[#e9e5da]">{dd}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Colonne droite — portrait */}
      <div className="relative overflow-hidden bg-[#0a0a0a] h-[70vh] lg:h-auto">
        <Image
          src="/images/portrait-hero.webp"
          alt="Portrait — Nabil Louaar"
          fill
          className="object-cover grayscale contrast-[1.05]"
          priority
          sizes="(max-width: 1100px) 100vw, 60vw"
        />

        {/* Dégradé latéral */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,.6) 0%, rgba(10,10,10,0) 18%, rgba(10,10,10,0) 75%, rgba(10,10,10,.45) 100%)",
          }}
        />

        {/* Caption */}
        <div className="absolute left-[clamp(28px,3vw,50px)] bottom-[clamp(28px,3vh,50px)] right-[clamp(28px,3vw,50px)] flex justify-between items-end text-[#a8a59d] font-mono text-[10.5px] tracking-[.22em] uppercase z-[2] pointer-events-none">
          <span>Paris, 2025</span>
          <span className="text-right">© Élodie Hazan</span>
        </div>

        {/* Scroll cue */}
        <div className="absolute right-[clamp(22px,2vw,40px)] top-1/2 z-[2] -translate-y-1/2 rotate-90 origin-right font-mono text-[10.5px] tracking-[.3em] uppercase text-[#a8a59d] whitespace-nowrap">
          <span className="inline-block w-[34px] h-px bg-[#a8a59d] align-middle mr-[14px] opacity-60" />
          Défiler
        </div>
      </div>
    </section>
  );
}
