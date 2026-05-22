"use client";

import { Suspense, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.replace(from);
      } else {
        const { error: msg } = await res.json();
        setError(msg ?? "Erreur de connexion.");
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="password" className="block font-mono text-[10px] tracking-[.22em] uppercase text-[#7a7770] mb-2">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#1a1a17] border border-[#2a2a26] rounded-none px-4 py-3
                     font-sans text-[15px] text-[#e9e5da] placeholder:text-[#4a4a45]
                     focus:outline-none focus:border-[#a8a59d] transition-colors"
          placeholder="••••••••••••••"
        />
      </div>

      {error && (
        <p className="font-mono text-[11px] tracking-[.12em] text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-[#f4f1ea] text-[#0a0a0a] font-mono text-[11px] tracking-[.22em] uppercase
                   px-6 py-3 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Connexion…" : "Entrer"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        <div className="mb-10">
          <span className="font-mono text-[11px] tracking-[.32em] uppercase text-[#7a7770]">
            Espace administrateur
          </span>
        </div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
