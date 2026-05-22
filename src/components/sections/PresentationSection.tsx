import SectionHeader from "@/components/nabil/SectionHeader";

export default function PresentationSection() {
  return (
    <section
      id="presentation"
      className="bg-[var(--color-paper)] px-[clamp(28px,6vw,120px)] py-[clamp(110px,12vw,180px)] relative"
    >
      <SectionHeader index="Présentation">
        Une écriture entre <em className="italic font-light text-[#3a3a35]">deux rives</em>,
        deux langues, et la lente discipline du regard.
      </SectionHeader>

      <div
        className="max-w-[760px] mx-auto font-serif font-normal
                   text-[clamp(22px,2vw,30px)] leading-[1.45] text-[#1a1a17]
                   tracking-[.005em] text-justify hyphens-auto"
        style={{ textWrap: "pretty" } as React.CSSProperties}
      >
        <p className="[&::first-letter]:font-serif [&::first-letter]:italic [&::first-letter]:font-light [&::first-letter]:text-[5.6em] [&::first-letter]:leading-[.82] [&::first-letter]:float-left [&::first-letter]:pr-[.12em] [&::first-letter]:pt-[.08em] [&::first-letter]:text-[#0a0a0a]">
          Né à Sétif et installé à Paris depuis ses vingt ans, Nabil Louaar écrit des fictions
          qui interrogent l&apos;héritage, la frontière et l&apos;image. Son travail circule entre
          la littérature et le cinéma — chacun éclairant l&apos;autre — avec un même soin pour
          la phrase, le cadre, et le temps qu&apos;il faut pour qu&apos;une chose advienne.
        </p>
        <p className="mt-[.9em]">
          Ses romans paraissent chez{" "}
          <em className="italic">Actes du Sud</em> et{" "}
          <em className="italic">P.O.L.</em>&nbsp;; ses films sont produits par{" "}
          <em className="italic">Les Films du Worso</em>, et présentés dans une douzaine
          de festivals internationaux. Il enseigne occasionnellement l&apos;écriture
          scénaristique à la Fémis.
        </p>
      </div>

      <div className="max-w-[760px] mx-auto mt-[70px] flex justify-between items-center font-mono text-[11px] tracking-[.2em] uppercase text-[var(--color-soft)]">
        <span className="font-serif italic text-[26px] text-[var(--color-ink)] tracking-normal normal-case mx-auto">
          — N. L.
        </span>
      </div>
    </section>
  );
}
