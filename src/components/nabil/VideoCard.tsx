interface DbVideo {
  id: number;
  title: string;
  duration: string;
  type: string;
  year: number;
  festival: string | null;
  description: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  order: number;
  published: boolean;
}

interface VideoCardProps {
  video: DbVideo;
  index: number;
}

const PlayIcon = () => (
  <svg viewBox="0 0 64 64" className="w-16 h-16">
    <circle cx="32" cy="32" r="31" stroke="#f4f1ea" strokeWidth="1" fill="none" />
    <polygon
      points="26,20 26,44 46,32"
      stroke="#f4f1ea"
      strokeWidth="1"
      fill="none"
      strokeLinejoin="round"
    />
  </svg>
);

export default function VideoCard({ video, index }: VideoCardProps) {
  const indexLabel = `№ ${String(index).padStart(2, "0")}`;
  const tag = `${video.type} · ${video.year}`;
  const award = video.festival ?? "";
  const href = video.videoUrl ?? "#";

  return (
    <a href={href} target={video.videoUrl ? "_blank" : undefined} rel="noopener noreferrer" className="block cursor-pointer group">
      <div className="relative aspect-video overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a]">
        {video.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
            <span className="font-mono text-[10px] tracking-[.2em] uppercase text-[#3a3a38] text-center px-4">
              {video.title}
            </span>
          </div>
        )}

        <span className="absolute top-[14px] left-[14px] font-mono text-[10.5px] tracking-[.18em] uppercase text-[#f4f1ea] bg-black/55 px-[9px] py-[5px] border border-white/18">
          {video.duration}
        </span>
        <span className="absolute top-[14px] right-[14px] font-mono text-[10.5px] tracking-[.18em] text-[#f4f1ea]">
          {indexLabel}
        </span>
        <span className="absolute inset-0 grid place-items-center pointer-events-none">
          <PlayIcon />
        </span>
      </div>

      <div className="flex justify-between items-end mt-[18px] gap-5">
        <h3
          className="font-serif font-normal text-2xl leading-[1.15] tracking-[-0.005em] max-w-[18ch]"
        >
          {video.title}
        </h3>
        <span className="font-mono text-[10.5px] tracking-[.2em] uppercase text-[var(--color-soft)] text-right whitespace-nowrap">
          {tag}
          {award && <b className="block text-[var(--color-ink)] font-normal mt-1">{award}</b>}
        </span>
      </div>
    </a>
  );
}
