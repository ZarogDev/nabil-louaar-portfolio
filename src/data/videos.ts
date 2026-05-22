export interface Video {
  id: string;
  index: string;
  runtime: string;
  title: string;
  tag: string;
  award: string;
  placeholder: string;
  href: string;
}

export const videos: Video[] = [
  {
    id: "vid-1",
    index: "№ 01",
    runtime: "22:14",
    title: "La <em>Lumière</em> crue",
    tag: "Court métrage · 2024",
    award: "Cannes — Quinzaine",
    placeholder: "Still — La Lumière Crue · 16:9 · noir & blanc",
    href: "#",
  },
  {
    id: "vid-2",
    index: "№ 02",
    runtime: "41:08",
    title: "Mémoires <em>de bord</em>",
    tag: "Documentaire · 2023",
    award: "Arte · 41 min",
    placeholder: "Still — Mémoires de bord · 16:9",
    href: "#",
  },
  {
    id: "vid-3",
    index: "№ 03",
    runtime: "07:52",
    title: "Tipaza, <em>4h17</em>",
    tag: "Essai filmé · 2022",
    award: "FIFOG · Mention",
    placeholder: "Still — Tipaza, 4h17 · 16:9",
    href: "#",
  },
  {
    id: "vid-4",
    index: "№ 04",
    runtime: "18:33",
    title: "Le <em>Boulanger</em> d'octobre",
    tag: "Fiction · 2021",
    award: "Clermont-Ferrand",
    placeholder: "Still — Le Boulanger d'octobre · 16:9",
    href: "#",
  },
  {
    id: "vid-5",
    index: "№ 05",
    runtime: "12:09",
    title: "Carnets <em>de Sicile</em>",
    tag: "Documentaire · 2020",
    award: "Locarno · Open Doors",
    placeholder: "Still — Carnets de Sicile · 16:9",
    href: "#",
  },
  {
    id: "vid-6",
    index: "№ 06",
    runtime: "03:44",
    title: "La <em>phrase</em> exacte",
    tag: "Vidéo-poème · 2019",
    award: "Auto-produit",
    placeholder: "Still — La Phrase exacte · 16:9",
    href: "#",
  },
];
