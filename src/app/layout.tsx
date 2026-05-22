import type { Metadata } from "next";
import { cormorant, geist, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nabil Louaar — Écrivain & Réalisateur",
  description:
    "Récits sur l'exil, la mémoire et la lumière. Romans, scénarios et courts métrages produits entre Paris et Alger depuis douze ans.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
