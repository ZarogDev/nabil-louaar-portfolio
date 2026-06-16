import SectionHeader from "@/components/nabil/SectionHeader";
import BookShelf, { type BookItem } from "@/components/nabil/BookShelf";
import { prisma } from "@/lib/db";
import { books as staticFallback } from "@/data/books";

// Visual size pattern applied by index — cycles if more than 6 books are added.
const SIZE_PATTERN: Pick<BookItem, "width" | "height" | "lean">[] = [
  { width: 118, height: 420 },
  { width: 96,  height: 380 },
  { width: 108, height: 340, lean: "lean-r" },
  { width: 88,  height: 410 },
  { width: 104, height: 360, lean: "lean-l" },
  { width: 112, height: 400 },
];

const VALID_COLORS = ["b-ink", "b-coal", "b-bone", "b-brown", "b-stone", "b-cream"] as const;
type BookColor = typeof VALID_COLORS[number];

function toColor(raw: string | null | undefined): BookColor {
  return VALID_COLORS.includes(raw as BookColor) ? (raw as BookColor) : "b-ink";
}

export default async function WritingSection() {
  let books: BookItem[] = staticFallback;

  try {
    const writings = await prisma.writing.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { year: "desc" }],
    });

    if (writings.length > 0) {
      books = writings.map((w, idx) => {
        const size = SIZE_PATTERN[idx % SIZE_PATTERN.length];
        return {
          id:     w.id,
          meta:   `${w.year} — ${w.badge ?? "Roman"}`,
          pub:    w.publisher,
          pages:  "",
          title:  w.title,
          desc:   w.description ?? "",
          foot:   w.badge ? `${w.badge} — ${w.year}` : String(w.year),
          color:  toColor(w.color),
          width:  size.width,
          height: size.height,
          lean:   size.lean,
        };
      });
    }
  } catch {
    // DB unavailable — static fallback already set
  }

  return (
    <section
      id="ecriture"
      className="px-[clamp(28px,6vw,120px)] py-[clamp(100px,11vw,160px)]
                 bg-[#f3f0e8] border-t border-[var(--color-rule)] border-b border-b-[var(--color-rule)]"
    >
      <SectionHeader index="Écriture">
        Romans, nouvelles,{" "}
        <em className="italic font-light text-[#3a3a35]">et un carnet</em>{" "}
        tenu depuis quinze ans.
      </SectionHeader>

      <BookShelf books={books} />
    </section>
  );
}
