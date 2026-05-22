"use client";

import { useState, FormEvent } from "react";

export default function ChangePasswordForm() {
  const [current,  setCurrent]  = useState("");
  const [next,     setNext]     = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [saving,   setSaving]   = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(""); setSuccess(false);

    if (next !== confirm) {
      setError("Les deux nouveaux mots de passe ne correspondent pas.");
      return;
    }
    if (next.length < 12) {
      setError("Le mot de passe doit faire au moins 12 caractères.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erreur."); return; }
      setSuccess(true);
      setCurrent(""); setNext(""); setConfirm("");
    } catch {
      setError("Erreur réseau.");
    } finally {
      setSaving(false);
    }
  }

  const field = (
    id: string,
    label: string,
    value: string,
    onChange: (v: string) => void
  ) => (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] tracking-[.2em] uppercase text-[#7a7770] mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type="password"
        autoComplete="off"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0f0f0e] border border-[#2a2a26] px-3 py-2.5 font-sans text-[14px]
                   text-[#e9e5da] focus:outline-none focus:border-[#a8a59d] transition-colors"
        placeholder="••••••••••••"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {field("current",  "Mot de passe actuel",     current,  setCurrent)}
      {field("next",     "Nouveau mot de passe",     next,     setNext)}
      {field("confirm",  "Confirmer le nouveau",     confirm,  setConfirm)}

      <p className="font-mono text-[10px] tracking-[.12em] text-[#4a4a45]">
        Minimum 12 caractères.
      </p>

      {error   && <p className="font-mono text-[11px] text-red-400">{error}</p>}
      {success && <p className="font-mono text-[11px] text-emerald-400">Mot de passe mis à jour.</p>}

      <button
        type="submit"
        disabled={saving}
        className="mt-2 bg-[#f4f1ea] text-[#0a0a0a] font-mono text-[10.5px] tracking-[.2em] uppercase
                   px-6 py-3 hover:bg-white transition-colors disabled:opacity-50 self-start"
      >
        {saving ? "Mise à jour…" : "Mettre à jour"}
      </button>
    </form>
  );
}
