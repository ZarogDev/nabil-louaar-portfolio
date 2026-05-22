import { Video } from "@/data/videos";

interface VideoCardProps {
  video: Video;
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

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <a href={video.href} className="block cursor-pointer group">
      <div className="relative aspect-video overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a]">
        {/* Image placeholder — replace src with real image */}
        <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
          <span className="font-mono text-[10px] tracking-[.2em] uppercase text-[#3a3a38] text-center px-4">
            {video.placeholder}
          </span>
        </div>

        <span className="absolute top-[14px] left-[14px] font-mono text-[10.5px] tracking-[.18em] uppercase text-[#f4f1ea] bg-black/55 px-[9px] py-[5px] border border-white/18">
          {video.runtime}
        </span>
        <span className="absolute top-[14px] right-[14px] font-mono text-[10.5px] tracking-[.18em] text-[#f4f1ea]">
          {video.index}
        </span>
        <span className="absolute inset-0 grid place-items-center pointer-events-none">
          <PlayIcon />
        </span>
      </div>

      <div className="flex justify-between items-end mt-[18px] gap-5">
        <h3
          className="font-serif font-normal text-2xl leading-[1.15] tracking-[-0.005em] max-w-[18ch]"
          dangerouslySetInnerHTML={{ __html: video.title }}
        />
        <span className="font-mono text-[10.5px] tracking-[.2em] uppercase text-[var(--color-soft)] text-right whitespace-nowrap">
          {video.tag}
          <b className="block text-[var(--color-ink)] font-normal mt-1">{video.award}</b>
        </span>
      </div>
    </a>
  );
}
