import SectionHeader from "@/components/nabil/SectionHeader";
import BookShelf from "@/components/nabil/BookShelf";

export default function WritingSection() {
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

      <BookShelf />
    </section>
  );
}
