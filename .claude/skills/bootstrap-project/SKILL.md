---
name: bootstrap-project
description: Crée un nouveau projet, initialise git, configure GitHub, installe les dépendances utiles et prépare un socle propre.
disable-model-invocation: true
argument-hint: [project-name] [stack] [package-manager]
allowed-tools: Bash(git *) Bash(gh *) Bash(node *) Bash(npm *) Bash(pnpm *) Bash(yarn *) Read Write Edit MultiEdit
---

# Mission

Créer un projet nommé `$0` avec la stack `$1` et le gestionnaire `$2`.

## Processus

1. Vérifier si le dossier existe déjà.
2. Détecter la commande d'initialisation adaptée : Next.js, Vite, Node API ou autre stack demandée.
3. Initialiser git si nécessaire.
4. Ajouter les fichiers de base : `.gitignore`, `.env.example`, `README.md`, `.nvmrc`, `.editorconfig`, `.prettierrc`, config ESLint si besoin.
5. Installer les dépendances de base.
6. Si la stack est compatible, proposer et installer : Tailwind, shadcn/ui, Magic UI, Lucide, class-variance-authority, clsx, tailwind-merge, zod, React Hook Form, TanStack Query.
7. Préparer les scripts qualité : `lint`, `typecheck`, `build`, `test` si possible.
8. Mettre TypeScript en mode strict quand c'est pertinent.
9. Lancer au minimum `lint` et `build` ou expliquer pourquoi ce n'est pas possible.
10. Si `gh` est authentifié, créer le repo GitHub, ajouter le remote, faire le commit initial et pousser sur `main`.
11. Résumer le résultat dans un rapport clair.

## Règles

- Demander confirmation avant toute action destructive.
- Ne jamais écraser un dossier existant sans confirmation.
- Vérifier la compatibilité réelle de shadcn/ui et Magic UI avec le projet avant installation.
- Si `gh auth status` échoue, préparer les commandes GitHub à exécuter manuellement.
- Adapter le package manager aux préférences détectées du projet.

## Format de sortie

Toujours terminer avec :

- Projet créé
- Stack détectée
- Dépendances installées
- Git configuré
- GitHub configuré ou bloqué
- Vérifications passées/échouées
- Prochaines commandes utiles