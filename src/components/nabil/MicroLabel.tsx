import { cn } from "@/lib/utils";

interface MicroLabelProps {
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
}

export default function MicroLabel({ children, className, inverted }: MicroLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] tracking-[.18em] uppercase font-normal",
        inverted ? "text-[#9a9a93]" : "text-[var(--color-soft)]",
        className
      )}
    >
      {children}
    </span>
  );
}
