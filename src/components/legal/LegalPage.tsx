import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Gabarit des pages légales (modèle Seven Films) : header du site sur un
 * bandeau sombre, contenu sur fond papier, footer du site en bas.
 */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <div id="home" className="relative bg-[#0a0a0a] h-[140px]">
        <Header />
      </div>
      <main
        id="main-content"
        className="bg-[var(--color-paper)] text-[var(--color-ink)] min-h-[60vh] px-[clamp(20px,6vw,120px)] pt-[clamp(60px,7vw,100px)] pb-[100px]"
      >
        <div className="max-w-[860px] mx-auto">
          <h1 className="font-serif font-normal text-[clamp(36px,5vw,64px)] leading-none tracking-[-0.01em] mb-12">
            {title}
          </h1>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h2 className="font-mono text-[11px] tracking-[.22em] uppercase text-[#7a7770] font-normal mb-[10px]">
        {title}
      </h2>
      <div className="text-[15px] leading-[1.7] text-[var(--color-ink)]/80 space-y-2">{children}</div>
    </section>
  );
}

export const legalLink = "underline underline-offset-2 hover:text-[var(--color-ink)] transition-colors";
