export interface Book {
  id: number;
  meta: string;
  pub: string;
  pages: string;
  title: string;
  desc: string;
  foot: string;
  color: "b-ink" | "b-bone" | "b-brown" | "b-coal" | "b-stone" | "b-cream";
  width: number;
  height: number;
  lean?: "lean-l" | "lean-r";
}

export const books: Book[] = [
  {
    id: 0,
    meta: "2025 — Roman",
    pub: "P.O.L.",
    pages: "312 p.",
    title: "Le Cabinet des <em>heures claires</em>",
    desc: "Un horloger de Belleville hérite d'un atelier algérois où le temps, dit-on, ne tourne pas dans le bon sens. Entre deux villes, deux générations et deux régimes du temps, le roman compose un cabinet de lenteur — où l'on apprend à écouter ce que les heures retiennent.",
    foot: "À paraître — sept. 2025",
    color: "b-ink",
    width: 118,
    height: 420,
  },
  {
    id: 1,
    meta: "2022 — Roman",
    pub: "Actes du Sud",
    pages: "248 p.",
    title: "Les Saisons <em>renversées</em>",
    desc: "Deux frères, un exil, et la longue lettre qu'aucun des deux n'écrira jamais. Récit choral entre Marseille et Tipaza, qui s'écoute autant qu'il se lit — une saison qui revient, et celle que l'on ne reverra plus. Prix Méditerranée 2023.",
    foot: "7ᵉ tirage — 2024",
    color: "b-bone",
    width: 96,
    height: 380,
  },
  {
    id: 2,
    meta: "2019 — Récit",
    pub: "Verticales",
    pages: "176 p.",
    title: "Une <em>géographie</em> de la patience",
    desc: "Carnets de tournage entre Tipaza, Marseille et Berlin — pour comprendre, peut-être, comment se fabrique un plan. Un livre sur l'attente, le repérage, et la lente fabrique de l'image. Réédité en 2024 avec un cahier inédit de photographies.",
    foot: "Réédition — 2024",
    color: "b-brown",
    width: 108,
    height: 340,
    lean: "lean-r",
  },
  {
    id: 3,
    meta: "2016 — Nouvelles",
    pub: "Mercure de France",
    pages: "192 p.",
    title: "Petites <em>insomnies du sud</em>",
    desc: "Douze nouvelles écrites la nuit, entre deux trains, deux climats, deux silences. Premier livre — d'une voix qui apprend à se reconnaître. Épuisé en librairie ; à reparaître en collection de poche au printemps 2026.",
    foot: "Épuisé · à reparaître 2026",
    color: "b-coal",
    width: 88,
    height: 410,
  },
];
