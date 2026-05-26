# Conventions de Code & Architecture — Portfolio Nabil Louaar

Ce document définit les normes de développement, l'organisation du projet, et les conventions de style et d'architecture pour le projet **Portfolio Nabil Louaar**.

---

## 📁 Organisation des Dossiers

Le projet utilise l'architecture suivante :

*   [`prisma/`](file:///d:/Projets_App/nabil-louaar-portfolio/prisma) : Fichiers liés à la base de données.
    *   `schema.prisma` : Modèles de données SQLite.
*   [`public/`](file:///d:/Projets_App/nabil-louaar-portfolio/public) : Assets statiques publics. Les images doivent être au format `.webp` dans `public/images/`.
*   [`src/`](file:///d:/Projets_App/nabil-louaar-portfolio/src) : Code source de l'application.
    *   `proxy.ts` : Middleware Next.js 16 pour la sécurisation de l'espace `/admin/*`.
    *   `app/` : App Router Next.js 16. Pages, layouts, styles globaux, et endpoints API.
    *   `components/` : Composants React.
        *   `layout/` : Composants de structure globale (ex: `Header`, `Footer`, `NavigationOverlay`).
        *   `sections/` : Les grandes sections de la page d'accueil (ex: `HeroSection`, `WritingSection`).
        *   `ui/` : Composants d'interface atomiques et réutilisables (ex: `button`, `input`).
        *   `nabil/` : Composants d'interface personnalisés et complexes pour ce projet (ex: `BookShelf`, `VideoCard`).
    *   `lib/` : Utilitaires, authentification, configuration des polices, et instance unique Prisma.
    *   `data/` : Données statiques de secours ou de graine (seed).
    *   `generated/` : Client Prisma généré localement (généré via `prisma generate`).

---

## 🏷️ Conventions de Nommage

*   **Composants React** : Les fichiers et composants s'écrivent en **PascalCase**.
    *   *Exemple :* `HeroSection.tsx`, `BookShelf.tsx`.
*   **Dossiers** : Les répertoires s'écrivent en **lowercase** (lettres minuscules) avec tirets si nécessaire.
    *   *Exemple :* `components/layout/`, `components/sections/`.
*   **Hooks, fonctions et utilitaires** : S'écrivent en **camelCase**.
    *   *Exemple :* `auth.ts`, `db.ts`.
*   **Pages et Fichiers Routeurs** : Doivent respecter les conventions Next.js (`page.tsx`, `layout.tsx`, `route.ts`).

---

## 🎨 Styles & Design System (Tailwind CSS v4)

Le projet utilise **Tailwind CSS v4** avec une configuration personnalisée définie directement dans [`src/app/globals.css`](file:///d:/Projets_App/nabil-louaar-portfolio/src/app/globals.css).

### Couleurs
Utilisez les tokens sémantiques définis en variables CSS HSL :
*   `--color-ink` (`#0a0a0a`) : Couleur de texte principal et des fonds sombres.
*   `--color-paper` (`#fbfaf7`) : Fond de page (aspect papier texturé/ivoire).
*   `--color-rule` (`#d8d5cd`) : Bordures, séparateurs horizontaux et éléments légers.
*   `--color-soft` (`#6b6b66`) : Couleur des textes secondaires et annotations.

### Typographie
Le design respecte une hiérarchie typographique stricte :
*   `font-serif` (**Cormorant Garamond**) : Pour tous les grands titres, citations et contenus littéraires.
*   `font-sans` (**Geist**) : Pour le corps de texte par défaut, les formulaires, et l'interface utilisateur.
*   `font-mono` (**JetBrains Mono**) : Pour les micro-labels, étiquettes small-caps, numéros, ou métadonnées.

---

## 🗄️ Base de Données & ORM (Prisma 7)

### Modélisation du schema.prisma
*   Les modèles s'écrivent au singulier en **PascalCase** (`Video`, `Writing`, `AdminConfig`).
*   Les champs et relations s'écrivent en **camelCase** (`thumbnailUrl`, `createdAt`).
*   Le client Prisma génère son output localement dans `src/generated/prisma`.

### Accès à la Base de Données
Ne pas instancier directement `PrismaClient` dans les fichiers pour éviter les fuites de connexions en mode développement. Importez toujours le singleton :
```typescript
import { prisma } from "@/lib/db";
```

---

## 🧩 Ajout d'une nouvelle Section sur la Page d'Accueil

Pour insérer une nouvelle section sur la page principale ([`src/app/page.tsx`](file:///d:/Projets_App/nabil-louaar-portfolio/src/app/page.tsx)) :

1.  **Création du composant** :
    Créez le fichier `MyNewSection.tsx` dans `src/components/sections/`.
2.  **Utilisation de l'En-tête standard** :
    Utilisez le composant `<SectionHeader />` pour conserver la cohérence visuelle :
    ```tsx
    import SectionHeader from "@/components/nabil/SectionHeader";
    
    export default function MyNewSection() {
      return (
        <section id="new-section" className="py-20 border-t border-[var(--color-rule)]">
          <SectionHeader 
            label="05 / Rubrique" 
            title="Titre de la nouvelle section" 
          />
          {/* Contenu */}
        </section>
      );
    }
    ```
3.  **Intégration** :
    Importez et montez votre section dans le fichier [`src/app/page.tsx`](file:///d:/Projets_App/nabil-louaar-portfolio/src/app/page.tsx).
