import SectionHeader from "@/components/nabil/SectionHeader";
import VideoCard from "@/components/nabil/VideoCard";
import { prisma } from "@/lib/db";

export default async function VideoSection() {
  const videos = await prisma.video.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <section
      id="video"
      className="bg-[var(--color-paper)] px-[clamp(28px,6vw,120px)] py-[clamp(100px,11vw,160px)]"
    >
      <SectionHeader index="Vidéo">
        Courts <em className="italic font-light text-[#3a3a35]">métrages</em>,
        documentaires &amp; objets filmés.
      </SectionHeader>

      <div className="max-w-[1640px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(24px,2.4vw,40px)]">
        {videos.map((video, i) => (
          <VideoCard key={video.id} video={video} index={i + 1} />
        ))}
      </div>

      <div className="max-w-[1640px] mx-auto mt-[60px] flex justify-between items-center border-t border-[var(--color-rule)] pt-[22px]">
        <span className="font-mono text-[11px] tracking-[.18em] uppercase text-[var(--color-soft)]">
          {videos.length} film{videos.length !== 1 ? "s" : ""}
        </span>
        <a href="#" className="font-serif text-[18px] italic hover:opacity-70">
          <span className="border-b border-[var(--color-ink)] pb-px">
            Voir la filmographie complète
          </span>
          {" →"}
        </a>
      </div>
    </section>
  );
}
