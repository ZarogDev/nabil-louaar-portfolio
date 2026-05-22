"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 text-center font-sans">
        <span className="font-mono text-[11px] tracking-[.3em] uppercase text-[#7a7770] mb-6">
          500
        </span>
        <h1 className="font-serif font-normal text-[clamp(48px,8vw,100px)] leading-[.9] tracking-[-0.02em] text-[#f4f1ea] mb-8">
          Erreur<br />
          <em className="italic font-light text-[#a8a59d]">serveur</em>.
        </h1>
        <p className="font-serif text-[clamp(15px,1.4vw,20px)] text-[#7a7770] max-w-[40ch] leading-[1.5] mb-12">
          Une erreur inattendue s&apos;est produite. Veuillez réessayer.
        </p>
        <button
          onClick={reset}
          className="font-mono text-[11px] tracking-[.26em] uppercase text-[#f4f1ea]
                     border-b border-[#f4f1ea] pb-[2px] hover:text-[#a8a59d] hover:border-[#a8a59d] transition-colors"
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
