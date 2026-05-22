"use client";

import { useState } from "react";

interface Writing {
  id: number;
  title: string;
  year: number;
  publisher: string;
  description: string | null;
  coverUrl: string | null;
  color: string | null;
  badge: string | null;
  order: number;
  published: boolean;
}

const empty = (): Omit<Writing, "id"> => ({
  title: "", year: new Date().getFullYear(), publisher: "",
  description: "", coverUrl: "", color: "#e8e2d8", badge: "", order: 0, published: true,
});

export default function WritingManager({ initialWritings }: { initialWritings: Writing[] }) {
  const [writings, setWritings] = useState<Writing[]>(initialWritings);
  const [editing,  setEditing]  = useState<Partial<Writing> | null>(null);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState("");

  async function save() {
    setSaving(true); setError("");
    try {
      const isNew = !editing?.id;
      const url   = isNew ? "/api/admin/writings" : `/api/admin/writings/${editing!.id}`;
      const res   = await fetch(url, {
        method:  isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(editing),
      });
      if (!res.ok) throw new Error(await res.text());
      const saved: Writing = await res.json();
      setWritings((w) =>
        isNew ? [...w, saved] : w.map((x) => (x.id === saved.id ? saved : x))
      );
      setEditing(null);
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Supprimer cet écrit ?")) return;
    await fetch(`/api/admin/writings/${id}`, { method: "DELETE" });
    setWritings((w) => w.filter((x) => x.id !== id));
  }

  return (
    <div className="px-10 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[32px] text-[#f4f1ea] font-normal mb-1">Écrits</h1>
          <p className="font-mono text-[10.5px] tracking-[.2em] uppercase text-[#7a7770]">
            {writings.length} entrée{writings.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setEditing(empty())}
          className="bg-[#f4f1ea] text-[#0a0a0a] font-mono text-[10.5px] tracking-[.2em] uppercase px-5 py-2.5 hover:bg-white transition-colors"
        >
          + Ajouter
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {writings.map((w) => (
          <div key={w.id} className="flex items-center gap-4 bg-[#161614] border border-[#1f1d1a] px-5 py-4 hover:border-[#3a3a35] transition-colors">
            {w.color && (
              <div className="w-2 h-12 shrink-0 rounded-sm" style={{ backgroundColor: w.color }} />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-serif text-[17px] text-[#e9e5da] truncate">{w.title}</div>
              <div className="font-mono text-[10px] tracking-[.16em] uppercase text-[#7a7770] mt-1">
                {w.year} · {w.publisher}{w.badge && ` · ${w.badge}`}
              </div>
            </div>
            <span className={`font-mono text-[9px] tracking-[.2em] uppercase px-2 py-1 ${
              w.published ? "bg-emerald-900/40 text-emerald-400" : "bg-[#2a2a26] text-[#7a7770]"
            }`}>
              {w.published ? "Publié" : "Masqué"}
            </span>
            <button onClick={() => setEditing(w)} className="font-mono text-[10px] tracking-[.16em] uppercase text-[#7a7770] hover:text-[#e9e5da] px-2">
              Modifier
            </button>
            <button onClick={() => remove(w.id)} className="font-mono text-[10px] tracking-[.16em] uppercase text-[#7a7770] hover:text-red-400 px-2">
              Suppr.
            </button>
          </div>
        ))}
        {writings.length === 0 && (
          <p className="font-mono text-[11px] tracking-[.16em] uppercase text-[#4a4a45] py-8 text-center">
            Aucun écrit. Cliquez sur « + Ajouter ».
          </p>
        )}
      </div>

      {/* Modal édition */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6" onClick={(e) => e.target === e.currentTarget && setEditing(null)}>
          <div className="bg-[#141412] border border-[#2a2a26] w-full max-w-[560px] max-h-[90vh] overflow-y-auto p-8">
            <h2 className="font-serif text-[22px] text-[#f4f1ea] mb-6">
              {editing.id ? "Modifier l'écrit" : "Nouvel écrit"}
            </h2>

            <div className="flex flex-col gap-4">
              {([
                ["title",     "Titre",            "text"],
                ["year",      "Année",             "number"],
                ["publisher", "Éditeur",           "text"],
                ["badge",     "Badge (ex: à paraître)", "text"],
                ["coverUrl",  "URL couverture",    "url"],
                ["order",     "Ordre",             "number"],
              ] as [keyof typeof editing, string, string][]).map(([key, label, type]) => (
                <div key={key}>
                  <label className="block font-mono text-[10px] tracking-[.2em] uppercase text-[#7a7770] mb-1.5">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={(editing[key] as string | number) ?? ""}
                    onChange={(e) => setEditing((prev) => ({ ...prev!, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
                    className="w-full bg-[#0f0f0e] border border-[#2a2a26] px-3 py-2.5 font-sans text-[14px] text-[#e9e5da] focus:outline-none focus:border-[#a8a59d] transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block font-mono text-[10px] tracking-[.2em] uppercase text-[#7a7770] mb-1.5">
                  Couleur de la couverture
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={editing.color ?? "#e8e2d8"}
                    onChange={(e) => setEditing((prev) => ({ ...prev!, color: e.target.value }))}
                    className="h-10 w-16 bg-transparent border border-[#2a2a26] cursor-pointer"
                  />
                  <span className="font-mono text-[12px] text-[#7a7770]">{editing.color ?? "#e8e2d8"}</span>
                </div>
              </div>

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
