# Nabil Louaar — Portfolio

Site portfolio de **Nabil Louaar**, écrivain et réalisateur franco-algérien.

> [!CAUTION]
> Ce projet utilise **Next.js 16** (version comportant des modifications majeures d'API et de structure par rapport aux versions antérieures). Avant toute modification de code, veuillez lire attentivement les consignes de développement décrites dans [`AGENTS.md`](file:///d:/Projets_App/nabil-louaar-portfolio/AGENTS.md).

> [!TIP]
> Pour les conventions de code, l'organisation détaillée de l'architecture, la structure Tailwind CSS v4 ou les instructions pour ajouter une nouvelle section UI, consultez le guide des [Conventions du Projet](file:///d:/Projets_App/nabil-louaar-portfolio/CONVENTIONS.md).

**Repo :** [github.com/ZarogDev/nabil-louaar-portfolio](https://github.com/ZarogDev/nabil-louaar-portfolio)
**Prod :** [nabillouaar.fr](https://nabillouaar.fr) — déployé sur Vercel + Neon (en ligne depuis le 2026-06-15)

---

## Stack

| Couche | Technologie |
|--------|-------------|
| Framework | [Next.js 16.2.6](https://nextjs.org) — App Router + Turbopack |
| Langage | TypeScript 5 |
| Style | Tailwind CSS v4 |
| Icônes | Lucide React |
| ORM | Prisma 7 — **PostgreSQL** via adapter `@prisma/adapter-pg` |
| Base de données | **Neon** (prod) · PostgreSQL local (dev) |
| Auth | jose (JWT) + bcryptjs |
| Gestionnaire de paquets | npm |
| Runtime | React 19 / Node 20 |

---

## Lancer le projet

```bash
npm install
cp .env.example .env            # puis renseigner les variables
npm run dev        # http://localhost:3000
npm run build      # prisma generate + prisma migrate deploy + next build
npm start          # serveur de production
npm run lint       # ESLint
```

> Le script `build` applique automatiquement les migrations Prisma (`migrate deploy`) sur la base cible avant le build Next — pratique pour Vercel.

---

## Variables d'environnement

Créer un fichier `.env` à la racine (les URLs Neon sont définies dans Vercel pour la prod) :

```env
# Connexion poolée (runtime) + connexion directe (migrations)
DATABASE_URL="postgresql://USER:PWD@HOST-pooler.../neondb?sslmode=require"
DIRECT_URL="postgresql://USER:PWD@HOST.../neondb?sslmode=require"
ADMIN_PASSWORD_HASH="<bcrypt hash du mot de passe>"
ADMIN_JWT_SECRET="<chaîne aléatoire 32+ caractères>"
```

> **Prisma 7** : les URLs ne vivent plus dans `schema.prisma` mais dans `prisma.config.ts` (migrations) et l'`adapter` du `PrismaClient` (runtime). En dev local : `DATABASE_URL`/`DIRECT_URL` pointent vers `postgresql://postgres@localhost:5432/nabil_louaar`.

Générer un hash bcrypt (Node) :
```js
const bcrypt = require("bcryptjs");
console.log(await bcrypt.hash("monMotDePasse", 12));
```

---

## Structure des dossiers

```
nabil/
├── prisma/
│   └── schema.prisma           # modèles Video, Writing, AdminConfig
├── prisma.config.ts            # configuration Prisma 7
├── public/
│   └── images/
│       ├── portrait-hero.webp       # photo hero (colonne droite)
│       ├── portrait-menu.webp       # photo overlay navigation
│       ├── logo-monogram-transparent.webp  # logo navbar (fond transparent)
│       └── logo-footer.webp         # monogramme NL footer (fond transparent)
├── src/
│   ├── proxy.ts                # protection routes /admin/* (Next.js 16 middleware)
│   ├── app/
│   │   ├── layout.tsx          # root layout — fonts, SEO, JSON-LD
│   │   ├── page.tsx            # page d'accueil — assemble les sections
│   │   ├── globals.css         # design tokens Tailwind v4 (@theme inline)
│   │   ├── not-found.tsx       # page 404 personnalisée
│   │   ├── error.tsx           # page 500 globale
│   │   ├── api/admin/          # routes API : login, logout, change-password, videos, writings
│   │   ├── admin/              # dashboard admin (layout, login, vidéos, écrits, réglages)
│   │   ├── sitemap.ts          # sitemap.xml généré dynamiquement
│   │   └── robots.ts           # robots.txt (bloque /api/ et /admin/)
│   ├── lib/
│   │   ├── db.ts               # singleton PrismaClient (adapter PostgreSQL @prisma/adapter-pg)
│   │   ├── auth.ts             # JWT (jose) + hash password (bcryptjs)
│   │   └── fonts.ts            # Cormorant Garamond · Geist · JetBrains Mono
│   ├── data/
│   │   ├── books.ts            # données statiques des 4 livres
│   │   └── videos.ts           # données statiques des 6 vidéos
│   └── components/
│       ├── layout/
│       │   ├── Header.tsx           # navbar fixe + hamburger + lien admin
│       │   ├── NavigationOverlay.tsx# menu plein écran avec portrait
│       │   └── Footer.tsx           # grille 4 colonnes (logo, nav, contact, réseaux)
│       ├── sections/
│       │   ├── HeroSection.tsx      # split 2 col — titre/stats | portrait
│       │   ├── PresentationSection.tsx # corps texte drop-cap + signature
│       │   ├── WritingSection.tsx   # étagère livres + panneau détail
│       │   ├── VideoSection.tsx     # grille 3×2 miniatures vidéo
│       │   └── NewsletterSection.tsx# formulaire inscription + contact
│       └── nabil/
│           ├── SectionHeader.tsx    # en-tête de section (label + titre)
│           ├── BookShelf.tsx        # étagère interactive (useState)
│           └── VideoCard.tsx        # carte vidéo avec thumbnail + overlay
├── next.config.ts              # en-têtes HTTP de sécurité (CSP, HSTS…)
├── CLAUDE.md / AGENTS.md       # instructions pour l'agent Claude Code
└── package.json
```

---

## Design system

Les tokens sont définis dans [`src/app/globals.css`](src/app/globals.css) via la directive `@theme inline` de Tailwind v4.

### Couleurs

| Token | Valeur | Usage |
|-------|--------|-------|
| `--color-ink` | `#0a0a0a` | Texte principal, fond dark |
| `--color-paper` | `#fbfaf7` | Fond de page |
| `--color-rule` | `#d8d5cd` | Séparateurs, bordures |
| `--color-soft` | `#6b6b66` | Texte secondaire |

### Typographie

| Token | Police | Usage |
|-------|--------|-------|
| `--font-serif` | Cormorant Garamond | Titres, headings |
| `--font-sans` | Geist | Corps de texte, UI |
| `--font-mono` | JetBrains Mono | Labels, numéros, mono |

---

## Sections de la page

1. **Hero** — split deux colonnes : titre + statistiques à gauche, portrait à droite
2. **Présentation** — biographie avec drop-cap et signature cursive
3. **Écriture** — étagère de livres interactive avec panneau de détail (état React)
4. **Vidéo** — grille 3×2 de miniatures avec overlay titre au survol
5. **Newsletter / Contact** — champ email + bouton d'inscription
6. **Footer** — logo NL, navigation, contacts presse/agent, réseaux sociaux

---

## Espace admin

Accessible via l'icône cadenas dans la navbar (`/admin/login`).

- **Auth** : mot de passe unique stocké en hash bcrypt (env var `ADMIN_PASSWORD_HASH`, surcharge possible via DB `AdminConfig`)
- **JWT** : cookie httpOnly/secure/sameSite:strict, 8 heures (`COOKIE_MAX_AGE = 60 * 60 * 8` dans `lib/auth.ts`)
- **Protection pages** : toutes les routes `/admin/*` sauf `/admin/login` sont protégées par `src/proxy.ts` (Next.js 16 middleware)
- **Protection API** : chaque handler `/api/admin/*` appelle `requireAdmin()` (`src/lib/auth.ts`) — le middleware Edge ne couvre pas les routes API
- **ADMIN_JWT_SECRET** : obligatoire — le serveur lance une erreur au démarrage si absent
- **CRUD** : vidéos et écrits gérables depuis le dashboard
- **Changement de mot de passe** : depuis Réglages, sans redéploiement

---

## Sécurité

En-têtes HTTP configurés dans `next.config.ts` :

| En-tête | Valeur |
|---------|--------|
| `Content-Security-Policy` | Restreint scripts, styles, images aux origines connues |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Désactive caméra, micro, géolocalisation |

---

## SEO & Accessibilité

- **sitemap.xml** : généré automatiquement via `src/app/sitemap.ts`
- **robots.txt** : `/api/*` et `/admin/*` exclus de l'indexation (`src/app/robots.ts`)
- **Skip link** : lien "Aller au contenu principal" masqué, visible au focus (premier élément tabulable)
- **`page.tsx` en `force-dynamic`** : la page d'accueil lit la DB (Neon) à la demande — le contenu édité depuis le dashboard admin apparaît sans redéploiement, et le build ne dépend pas de la DB. `Header.tsx` gère son propre état mobile en interne
- **Favicon** : généré depuis le monogramme `logo-monogram.webp` (`src/app/icon.png`, `apple-icon.png`, `favicon.ico`) via `scripts/gen-favicon.cjs`

---

## Images

Les images sont servies en **WebP** depuis `public/images/` (PNG originaux exclus du repo). Les logos ont été traités avec Pillow (Python) pour supprimer les fonds noirs.

---

## Ce qui reste à faire

- [ ] Remplacer les 6 thumbnails vidéos (placeholders dans `VideoCard`) — ajouter les vraies URLs YouTube depuis le dashboard admin
- [ ] Brancher les vrais liens sociaux (Instagram, LinkedIn, X) dans `Footer.tsx` et `NavigationOverlay.tsx`
- [ ] Ajouter un lien "Voir la filmographie complète" vers une vraie page ou ancre (actuellement pointe sur `#video`)
- [x] ~~Base de données persistante pour la prod~~ → **migré SQLite → PostgreSQL/Neon** (2026-06-15)
- [x] ~~Variables d'env sur Vercel~~ → posées (DATABASE_URL, DIRECT_URL, ADMIN_JWT_SECRET, ADMIN_PASSWORD_HASH)
- [x] ~~Déploiement sur Vercel~~ → **en ligne** (2026-06-15)
- [x] ~~Code mort~~ → `src/data/videos.ts` supprimé (2026-06-22), doublon JSON-LD FAQPage retiré de `FaqSection`

## Historique — 2026-06-15

- Migration **SQLite → PostgreSQL/Neon** : `schema.prisma` en `postgresql`, adapter `@prisma/adapter-pg`, URLs déplacées dans `prisma.config.ts`, migrations Postgres régénérées.
- Page d'accueil passée en `force-dynamic` (contenu admin live, build indépendant de la DB).
- `prisma migrate deploy` ajouté au script `build` (migrations auto sur Vercel).
- **Favicon** créé depuis le monogramme (livre + plume).
- **Déploiement Vercel + Neon** réussi.

## 🧪 Tests & Qualité

- **Tests unitaires** : `npm test` (Vitest).
- **CI** : `.github/workflows/audit.yml` exécute `npm audit` (high/critical, informatif) + les tests à chaque push / PR.
- **Sécurité** : headers HTTP de sécurité (CSP, HSTS, X-Frame-Options, X-Content-Type-Options…), `.env` jamais commité, validation Zod sur les routes de mutation.

> Stack alignée sur le **standard ZarogDev** : Next.js 16 · React 19 · TypeScript · Tailwind · shadcn/ui + **MagicUI** · Prisma · Zod · Vitest.
