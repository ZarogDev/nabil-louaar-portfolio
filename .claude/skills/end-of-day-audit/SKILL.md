\---

name: end-of-day-audit

description: Lance un audit de fin de journée pour vérifier l'état global du projet avant de terminer la session.

disable-model-invocation: true

allowed-tools: Bash(git status \*) Bash(git diff \*) Bash(npm \*) Bash(pnpm \*) Bash(yarn \*) Bash(npx \*) Read Write Edit

\---



\# Mission



Réaliser un audit de fin de journée orienté stabilité, dette technique, sécurité et préparation du lendemain.



\## Checklist



1\. Résumer les fichiers modifiés.

2\. Vérifier les commandes qualité disponibles et lancer : lint, typecheck, tests, build.

3\. Vérifier les vulnérabilités de dépendances.

4\. Vérifier les fichiers sensibles modifiés : auth, env, middleware, API, upload, paiement.

5\. Vérifier si des TODO critiques ou hacks temporaires ont été ajoutés.

6\. Générer un rapport `daily-report-YYYY-MM-DD.md`.

7\. Terminer par :

&#x20;  - ce qui est sûr à committer

&#x20;  - ce qui doit être revu demain

&#x20;  - les risques potentiels si on déploie tel quel



\## Règles



\- Ne pas committer automatiquement.

\- Ne pas pousser automatiquement.

\- Signaler clairement les risques bloquants.

