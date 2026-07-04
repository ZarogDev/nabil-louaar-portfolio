import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sécurité (A03 — XSS) : échappe tout le HTML puis ré-autorise uniquement
 * les balises <em>/</em> (mise en emphase typographique des titres de livres).
 * À utiliser à la place d'un dangerouslySetInnerHTML brut sur du contenu
 * pouvant contenir des données saisies via l'admin.
 */
export function sanitizeEmphasisOnly(input: string): string {
  const escaped = input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
  return escaped
    .replace(/&lt;em&gt;/g, "<em>")
    .replace(/&lt;\/em&gt;/g, "</em>")
}
