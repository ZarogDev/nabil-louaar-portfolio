import type { Metadata } from "next";
import { cormorant, geist, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

const BASE_URL = "https://nabillouaar.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Nabil Louaar — Écrivain & Réalisateur",
    template: "%s | Nabil Louaar",
  },
  description:
    "Récits sur l'exil, la mémoire et la lumière. Romans publiés chez Actes du Sud et P.O.L., courts métrages primés à Cannes, Locarno et Arte.",
  keywords: [
    "Nabil Louaar",
    "écrivain",
    "réalisateur",
    "franco-algérien",
    "roman",
    "cinéma",
    "Actes du Sud",
    "P.O.L.",
    "court métrage",
  ],
  authors: [{ name: "Nabil Louaar", url: BASE_URL }],
  creator: "Nabil Louaar",
  publisher: "Nabil Louaar",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "Nabil Louaar",
    title: "Nabil Louaar — Écrivain & Réalisateur",
    description:
      "Récits sur l'exil, la mémoire et la lumière. Romans et films entre Paris et Alger.",
    images: [
      {
        url: "/images/portrait-hero.webp",
        width: 1200,
        height: 630,
        alt: "Nabil Louaar — Écrivain & Réalisateur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabil Louaar — Écrivain & Réalisateur",
    description:
      "Récits sur l'exil, la mémoire et la lumière. Romans et films entre Paris et Alger.",
    images: ["/images/portrait-hero.webp"],
    creator: "@nabillouaar",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nabil Louaar",
  url: BASE_URL,
  jobTitle: ["Écrivain", "Réalisateur"],
  nationality: { "@type": "Country", name: "France" },
  birthPlace: { "@type": "Place", name: "Sétif, Algérie" },
  sameAs: [
    "https://www.instagram.com/nabillouaar",
    "https://www.linkedin.com/in/nabillouaar",
  ],
  worksFor: [
    { "@type": "Organization", name: "Actes du Sud" },
    { "@type": "Organization", name: "P.O.L." },
    { "@type": "Organization", name: "Les Films du Worso" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <a
          href="#main-content"
          className="fixed top-[-100%] left-4 z-[9999] bg-[#f4f1ea] text-[#0a0a0a] font-mono text-[11px] tracking-[.18em] uppercase px-4 py-2 focus:top-4 transition-[top] duration-200"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
