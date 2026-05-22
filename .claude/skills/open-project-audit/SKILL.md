\---

name: open-project-audit

description: Audite un projet existant à l'ouverture pour vérifier SEO, performance, accessibilité, sécurité et conformité technique.

disable-model-invocation: true

allowed-tools: Bash(git status \*) Bash(find \*) Bash(cat \*) Bash(rg \*) Bash(npm \*) Bash(pnpm \*) Bash(yarn \*) Bash(npx \*) Read Grep Glob

\---



\# Mission



Auditer le projet courant avec priorité sur SEO, performance, accessibilité, sécurité et qualité DX.



\## Audit demandé



1\. Identifier la stack, le package manager, le framework et les scripts.

2\. Vérifier la structure du repo et les fichiers critiques : `package.json`, `tsconfig`, config Next/Vite, middlewares, auth, `.env.example`, CI.

3\. Vérifier SEO : metadata, titles, descriptions, Open Graph, canonical, robots, sitemap, structured data.

4\. Vérifier accessibilité : landmarks, hiérarchie des titres, labels, focus, contrastes, alt, clavier.

5\. Vérifier performance : images, fonts, bundles, lazy loading, server/client boundaries, cache, scripts lourds.

6\. Vérifier sécurité : secrets committés, dépendances vulnérables, headers, cookies, auth, validation d'inputs, endpoints exposés.

7\. Vérifier qualité dev : lint, typecheck, tests, build, hygiène des scripts.

8\. Produire un rapport markdown classé par priorité.



\## Priorités



\- Bloquant

\- Important

\- Amélioration

\- Conforme



\## Format de rapport



Créer un rapport avec :



\- Résumé exécutif

\- Table des scores : SEO / Perf / A11y / Sécurité / DX

\- Problèmes détectés avec fichier concerné

\- Commandes exécutées

\- Correctifs rapides

\- Correctifs structurants

