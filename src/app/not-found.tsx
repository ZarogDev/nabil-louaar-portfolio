import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] flex flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-[11px] tracking-[.3em] uppercase text-[#6b6b66] mb-6">
        404
      </span>
      <h1 className="font-serif font-normal text-[clamp(56px,10vw,120px)] leading-[.9] tracking-[-0.02em] text-[#0a0a0a] mb-8">
        Page<br />
        <em className="italic font-light text-[#3a3a35]">introuvable</em>.
      </h1>
      <p className="font-serif text-[clamp(16px,1.6vw,22px)] text-[#6b6b66] max-w-[42ch] leading-[1.5] mb-12">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="font-mono text-[11px] tracking-[.26em] uppercase text-[#0a0a0a]
                   border-b border-[#0a0a0a] pb-[2px] hover:text-[#6b6b66] hover:border-[#6b6b66] transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
