interface SectionHeaderProps {
  index: string;
  children: React.ReactNode;
}

export default function SectionHeader({ index, children }: SectionHeaderProps) {
  return (
    <div className="grid gap-[14px] lg:grid-cols-[220px_1fr] lg:gap-10 items-baseline max-w-[1640px] mx-auto mb-[clamp(60px,7vw,100px)]">
      <span className="font-mono text-[11px] tracking-[.22em] uppercase text-[var(--color-soft)]">
        {index}
      </span>
      <h2 className="font-serif font-normal text-[clamp(36px,4.4vw,64px)] leading-[1.02] tracking-[-0.01em]">
        {children}
      </h2>
    </div>
  );
}
