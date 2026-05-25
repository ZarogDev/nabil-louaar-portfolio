# Nabil Louaar — Portfolio

Site portfolio de **Nabil Louaar**, écrivain et réalisateur franco-algérien.

**Repo :** [github.com/ZarogDev/nabil-louaar-portfolio](https://github.com/ZarogDev/nabil-louaar-portfolio)

---

## Stack

| Couche | Technologie |
|--------|-------------|
| Framework | [Next.js 16.2.6](https://nextjs.org) — App Router + Turbopack |
| Langage | TypeScript 5 |
| Style | Tailwind CSS v4 |
| Icônes | Lucide React |
| ORM | Prisma 7 (adapter better-sqlite3) |
| Auth | jose (JWT) + bcryptjs |
| Gestionnaire de paquets | pnpm |
| Runtime | React 19 / Node 20 |

---

## Lancer le projet

```bash
pnpm install
cp .env.local.example .env.local   # puis renseigner les variables
pnpm dev        # http://localhost:3000
pnpm build      # prisma generate + next build
pnpm start      # serveur de production
pnpm lint       # ESLint
```

---

## Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD_HASH="<bcrypt hash du mot de passe>"
ADMIN_JWT_SECRET="<chaîne aléatoire 32+ caractères>"
```

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
│   │   ├── db.ts               # singleton PrismaClient (adapter SQLite)
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
│           ├── MicroLabel.tsx       # étiquette typographique small caps
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
- **JWT** : cookie httpOnly/secure/sameSite:strict, 7 jours
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
- **`page.tsx` Server Component** : la page d'accueil est statique ; `Header.tsx` gère son propre état mobile en interne

---

## Images

Les images sont servies en **WebP** depuis `public/images/` (PNG originaux exclus du repo). Les logos ont été traités avec Pillow (Python) pour supprimer les fonds noirs.

---

## Ce qui reste à faire

- [ ] Remplacer les 6 thumbnails vidéos (placeholders dans `VideoCard`)
- [ ] Brancher les vrais liens sociaux (Instagram, LinkedIn, X)
- [ ] Choisir une base de données persistante pour la prod (Turso / Neon — SQLite non persistant sur Vercel)
- [ ] Configurer les variables d'env sur Vercel (`ADMIN_PASSWORD_HASH`, `ADMIN_JWT_SECRET`, `DATABASE_URL`)
- [ ] Déploiement sur Vercel
