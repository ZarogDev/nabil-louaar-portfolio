"use client";

import { useState } from "react";
import Image from "next/image";

interface Video {
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

const empty = (): Omit<Video, "id"> => ({
  title: "", duration: "", type: "", year: new Date().getFullYear(),
  festival: "", description: "", thumbnailUrl: "", videoUrl: "", order: 0, published: true,
});

/** Extrait l'ID YouTube depuis toutes les formes d'URL courantes */
function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,         // youtube.com/watch?v=ID
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,     // youtu.be/ID
    /embed\/([a-zA-Z0-9_-]{11})/,         // youtube.com/embed/ID
    /shorts\/([a-zA-Z0-9_-]{11})/,        // youtube.com/shorts/ID
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function youtubeThumbnail(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export default function VideoManager({ initialVideos }: { initialVideos: Video[] }) {
  const [videos,     setVideos]     = useState<Video[]>(initialVideos);
  const [editing,    setEditing]    = useState<Partial<Video> | null>(null);
  const [saving,     setSaving]     = useState(false);
  const [error,      setError]      = useState("");
  const [thumbError, setThumbError] = useState(false);

  /** Quand l'URL vidéo change, on tente d'extraire la miniature YouTube */
  function handleVideoUrlChange(url: string) {
    const ytId = extractYoutubeId(url);
    setEditing((prev) => ({
      ...prev!,
      videoUrl: url,
      // N'écrase la miniature que si elle est vide OU déjà une miniature YouTube
      ...(ytId && (!prev?.thumbnailUrl || extractYoutubeId(prev.videoUrl ?? ""))
        ? { thumbnailUrl: youtubeThumbnail(ytId) }
        : {}),
    }));
    setThumbError(false);
  }

  function handleThumbnailChange(url: string) {
    setEditing((prev) => ({ ...prev!, thumbnailUrl: url }));
    setThumbError(false);
  }

  async function save() {
    setSaving(true); setError("");
    try {
      const isNew = !editing?.id;
      const url   = isNew ? "/api/admin/videos" : `/api/admin/videos/${editing!.id}`;
      const res   = await fetch(url, {
        method:  isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(editing),
      });
      if (!res.ok) throw new Error(await res.text());
      const saved: Video = await res.json();
      setVideos((v) =>
        isNew ? [...v, saved] : v.map((x) => (x.id === saved.id ? saved : x))
      );
      setEditing(null);
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Supprimer cette vidéo ?")) return;
    await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
    setVideos((v) => v.filter((x) => x.id !== id));
  }

  const ytIdPreview = extractYoutubeId(editing?.videoUrl ?? "");
  const thumbSrc    = editing?.thumbnailUrl || (ytIdPreview ? youtubeThumbnail(ytIdPreview) : null);

  return (
    <div className="px-10 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[32px] text-[#f4f1ea] font-normal mb-1">Vidéos</h1>
          <p className="font-mono text-[10.5px] tracking-[.2em] uppercase text-[#7a7770]">
            {videos.length} entrée{videos.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setEditing(empty())}
          className="bg-[#f4f1ea] text-[#0a0a0a] font-mono text-[10.5px] tracking-[.2em] uppercase px-5 py-2.5 hover:bg-white transition-colors"
        >
          + Ajouter
        </button>
      </div>

      {/* Liste des vidéos */}
      <div className="flex flex-col gap-2">
        {videos.map((v) => (
          <div key={v.id} className="flex items-center gap-4 bg-[#161614] border border-[#1f1d1a] px-5 py-4 hover:border-[#3a3a35] transition-colors">
            {/* Miniature vignette */}
            <div className="w-[64px] h-[36px] shrink-0 bg-[#1a1a1a] overflow-hidden border border-[#2a2a26] relative">
              {v.thumbnailUrl
                ? <Image src={v.thumbnailUrl} alt="" fill className="object-cover" sizes="64px" />
                : <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[#3a3a38] text-[8px] font-mono">—</span>
                  </div>
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-serif text-[17px] text-[#e9e5da] truncate">{v.title}</div>
              <div className="font-mono text-[10px] tracking-[.16em] uppercase text-[#7a7770] mt-1">
                {v.year} · {v.type} · {v.duration}
                {v.festival && ` · ${v.festival}`}
              </div>
            </div>
            <span className={`font-mono text-[9px] tracking-[.2em] uppercase px-2 py-1 ${
              v.published ? "bg-emerald-900/40 text-emerald-400" : "bg-[#2a2a26] text-[#7a7770]"
            }`}>
              {v.published ? "Publié" : "Masqué"}
            </span>
            <button
              onClick={() => { setEditing(v); setThumbError(false); }}
              className="font-mono text-[10px] tracking-[.16em] uppercase text-[#7a7770] hover:text-[#e9e5da] px-2"
            >
              Modifier
            </button>
            <button
              onClick={() => remove(v.id)}
              className="font-mono text-[10px] tracking-[.16em] uppercase text-[#7a7770] hover:text-red-400 px-2"
            >
              Suppr.
            </button>
          </div>
        ))}
        {videos.length === 0 && (
          <p className="font-mono text-[11px] tracking-[.16em] uppercase text-[#4a4a45] py-8 text-center">
            Aucune vidéo. Cliquez sur « + Ajouter ».
          </p>
        )}
      </div>

      {/* Modal édition */}
      {editing && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
          onClick={(e) => e.target === e.currentTarget && setEditing(null)}
        >
          <div className="bg-[#141412] border border-[#2a2a26] w-full max-w-[580px] max-h-[90vh] overflow-y-auto p-8">
            <h2 className="font-serif text-[22px] text-[#f4f1ea] mb-6">
              {editing.id ? "Modifier la vidéo" : "Nouvelle vidéo"}
            </h2>

            <div className="flex flex-col gap-4">

              {/* URL Vidéo — traitement spécial YouTube */}
              <div>
                <label className="block font-mono text-[10px] tracking-[.2em] uppercase text-[#7a7770] mb-1.5">
                  URL Vidéo
                  {ytIdPreview && (
                    <span className="ml-2 text-emerald-400 normal-case tracking-normal font-sans">
                      ✓ YouTube détecté
                    </span>
                  )}
                </label>
                <input
                  type="url"
                  value={editing.videoUrl ?? ""}
                  onChange={(e) => handleVideoUrlChange(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-[#0f0f0e] border border-[#2a2a26] px-3 py-2.5 font-sans text-[14px] text-[#e9e5da] focus:outline-none focus:border-[#a8a59d] transition-colors placeholder:text-[#3a3a38]"
                />
              </div>

              {/* Miniature — aperçu + champ */}
              <div>
                <label className="block font-mono text-[10px] tracking-[.2em] uppercase text-[#7a7770] mb-1.5">
                  URL Miniature
                  {ytIdPreview && (
                    <span className="ml-2 text-[#5a5a55] normal-case tracking-normal font-sans text-[10px]">
                      (auto-remplie depuis YouTube)
                    </span>
                  )}
                </label>

                {/* Aperçu en temps réel */}
                {thumbSrc && (
                  <div className="mb-2 relative aspect-video w-full bg-[#0f0f0e] border border-[#2a2a26] overflow-hidden">
                    {!thumbError ? (
                      <Image
                        src={thumbSrc}
                        alt="Aperçu miniature"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 580px"
                        onError={() => {
                          // Fallback : hqdefault si maxresdefault absent (vidéo sans HD)
                          const id = ytIdPreview || extractYoutubeId(thumbSrc);
                          if (id && thumbSrc.includes("maxresdefault")) {
                            handleThumbnailChange(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
                          } else {
                            setThumbError(true);
                          }
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-[10px] tracking-[.16em] text-[#4a4a45]">
                          Miniature non disponible
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <input
                  type="url"
                  value={editing.thumbnailUrl ?? ""}
                  onChange={(e) => handleThumbnailChange(e.target.value)}
                  placeholder="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
                  className="w-full bg-[#0f0f0e] border border-[#2a2a26] px-3 py-2.5 font-sans text-[14px] text-[#e9e5da] focus:outline-none focus:border-[#a8a59d] transition-colors placeholder:text-[#3a3a38]"
                />
              </div>

              {/* Champs texte/numérique standards */}
              {([
                ["title",    "Titre",                               "text"],
                ["duration", "Durée (ex: 22:14)",                  "text"],
                ["type",     "Type (court métrage, documentaire…)", "text"],
                ["year",     "Année",                              "number"],
                ["festival", "Festival",                           "text"],
                ["order",    "Ordre",                              "number"],
              ] as [keyof typeof editing, string, string][]).map(([key, label, type]) => (
                <div key={key}>
                  <label className="block font-mono text-[10px] tracking-[.2em] uppercase text-[#7a7770] mb-1.5">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={(editing[key] as string | number) ?? ""}
                    onChange={(e) => setEditing((prev) => ({
                      ...prev!,
                      [key]: type === "number" ? Number(e.target.value) : e.target.value,
                    }))}
                    className="w-full bg-[#0f0f0e] border border-[#2a2a26] px-3 py-2.5 font-sans text-[14px] text-[#e9e5da] focus:outline-none focus:border-[#a8a59d] transition-colors"
                  />
                </div>
              ))}

              {/* Description */}
              <div>
                <label className="block font-mono text-[10px] tracking-[.2em] uppercase text-[#7a7770] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing((prev) => ({ ...prev!, description: e.target.value }))}
                  className="w-full bg-[#0f0f0e] border border-[#2a2a26] px-3 py-2.5 font-sans text-[14px] text-[#e9e5da] focus:outline-none focus:border-[#a8a59d] transition-colors resize-none"
                />
              </div>

              {/* Publié */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.published !== false}
                  onChange={(e) => setEditing((prev) => ({ ...prev!, published: e.target.checked }))}
                  className="w-4 h-4 accent-[#f4f1ea]"
                />
                <span className="font-mono text-[10.5px] tracking-[.16em] uppercase text-[#a8a59d]">Publié</span>
              </label>

              {error && <p className="font-mono text-[11px] text-red-400">{error}</p>}

              <div className="flex gap-3 mt-2">
                <button
                  onClick={save}
                  disabled={saving}
                  className="flex-1 bg-[#f4f1ea] text-[#0a0a0a] font-mono text-[10.5px] tracking-[.2em] uppercase py-3 hover:bg-white transition-colors disabled:opacity-50"
                >
                  {saving ? "Sauvegarde…" : "Sauvegarder"}
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="px-5 bg-[#1a1a17] border border-[#2a2a26] font-mono text-[10.5px] tracking-[.2em] uppercase text-[#7a7770] hover:text-[#e9e5da] transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
