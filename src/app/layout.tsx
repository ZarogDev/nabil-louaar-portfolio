import CookieConsent from '@/components/rgpd/CookieConsent';
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
    "écrivain franco-algérien",
    "réalisateur",
    "romancier",
    "littérature francophone",
    "court métrage d'auteur",
    "Actes du Sud",
    "P.O.L.",
    "festival de Cannes",
    "Locarno",
    "Les Films du Worso",
    "exil mémoire littérature",
    "cinéma auteur",
    "La Fémis",
    "Sétif Paris",
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
    languages: {
      "fr-FR": BASE_URL,
    },
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
  image: `${BASE_URL}/images/portrait-hero.webp`,
  description:
    "Écrivain et réalisateur franco-algérien. Romans publiés chez P.O.L., Actes du Sud, Verticales et Mercure de France. Courts métrages sélectionnés à Cannes et Locarno.",
  jobTitle: ["Écrivain", "Réalisateur"],
  nationality: { "@type": "Country", name: "France" },
  birthPlace: { "@type": "Place", name: "Sétif, Algérie" },
  sameAs: [
    "https://www.instagram.com/nabillouaar",
    "https://www.linkedin.com/in/nabillouaar",
    "https://x.com/nabillouaar",
  ],
  worksFor: [
    { "@type": "Organization", name: "Actes du Sud" },
    { "@type": "Organization", name: "P.O.L." },
    { "@type": "Organization", name: "Les Films du Worso" },
  ],
  knowsAbout: [
    "Littérature francophone",
    "Cinéma d'auteur",
    "Écriture scénaristique",
    "Exil et mémoire",
    "Littérature algérienne",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "La Fémis",
    url: "https://www.femis.fr",
  },
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Écrivain",
      occupationLocation: { "@type": "Country", name: "France" },
    },
    {
      "@type": "Occupation",
      name: "Réalisateur de cinéma",
      occupationLocation: { "@type": "Country", name: "France" },
    },
  ],
  workExample: [
    {
      "@type": "Book",
      name: "Le Cabinet des heures claires",
      datePublished: "2025",
      publisher: { "@type": "Organization", name: "P.O.L." },
      author: { "@type": "Person", name: "Nabil Louaar" },
      inLanguage: "fr",
      genre: "Roman",
    },
    {
      "@type": "Book",
      name: "Les Saisons renversées",
      datePublished: "2022",
      publisher: { "@type": "Organization", name: "Actes du Sud" },
      author: { "@type": "Person", name: "Nabil Louaar" },
      inLanguage: "fr",
      genre: "Roman",
      award: "Prix Méditerranée 2023",
    },
    {
      "@type": "Book",
      name: "Une géographie de la patience",
      datePublished: "2019",
      publisher: { "@type": "Organization", name: "Verticales" },
      author: { "@type": "Person", name: "Nabil Louaar" },
      inLanguage: "fr",
      genre: "Récit",
    },
    {
      "@type": "Book",
      name: "Petites insomnies du sud",
      datePublished: "2016",
      publisher: { "@type": "Organization", name: "Mercure de France" },
      author: { "@type": "Person", name: "Nabil Louaar" },
      inLanguage: "fr",
      genre: "Nouvelles",
    },
    {
      "@type": "VideoObject",
      name: "Filmographie — Nabil Louaar",
      description: "Onze courts métrages et documentaires produits par Les Films du Worso, sélectionnés à Cannes et Locarno entre 2012 et 2025.",
      director: { "@type": "Person", name: "Nabil Louaar" },
      productionCompany: { "@type": "Organization", name: "Les Films du Worso" },
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Où acheter les romans de Nabil Louaar ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les romans de Nabil Louaar sont disponibles en librairie et sur les principales plateformes en ligne (Amazon, Fnac, Decitre). Ses œuvres sont publiées chez P.O.L., Actes du Sud, Verticales et Mercure de France.",
      },
    },
    {
      "@type": "Question",
      name: "Comment contacter Nabil Louaar pour une invitation ou une rencontre littéraire ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous pouvez contacter Nabil Louaar via le formulaire de contact sur ce site ou en passant par ses éditeurs (P.O.L. pour les demandes littéraires, Les Films du Worso pour les projets cinématographiques).",
      },
    },
    {
      "@type": "Question",
      name: "Quels prix a reçu Nabil Louaar ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nabil Louaar a reçu le Prix Méditerranée 2023 pour son roman « Les Saisons renversées » (Actes du Sud, 2022). Ses courts métrages ont été sélectionnés et primés aux festivals de Cannes et Locarno.",
      },
    },
    {
      "@type": "Question",
      name: "Nabil Louaar propose-t-il des ateliers d'écriture ou des conférences ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, Nabil Louaar intervient régulièrement dans des lycées, universités et festivals littéraires pour des ateliers d'écriture et des rencontres avec le public. Contactez-le via ce site pour toute demande.",
      },
    },
  ],
};

import RouteScrollReset from "@/components/RouteScrollReset";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <RouteScrollReset />
        <a
          href="#main-content"
          className="fixed top-[-100%] left-4 z-[9999] bg-[#f4f1ea] text-[#0a0a0a] font-mono text-[11px] tracking-[.18em] uppercase px-4 py-2 focus:top-4 transition-[top] duration-200"
        >
          Aller au contenu
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
