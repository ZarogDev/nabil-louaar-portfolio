#!/usr/bin/env bash
set -u

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
REPORT_DIR="$PROJECT_DIR/.claude/reports"
mkdir -p "$REPORT_DIR"
STAMP="$(date +%F-%H%M%S)"
REPORT="$REPORT_DIR/session-start-$STAMP.md"

cd "$PROJECT_DIR" || exit 0

pm="npm"
[ -f pnpm-lock.yaml ] && pm="pnpm"
[ -f yarn.lock ] && pm="yarn"

{
  echo "# Session start audit"
  echo
  echo "- Date: $(date)"
  echo "- Projet: $PROJECT_DIR"
  echo "- Package manager détecté: $pm"
  echo
  echo "## Git"
  git status --short 2>/dev/null || echo "git indisponible"
  echo
  echo "## Fichiers clés"
  for f in package.json tsconfig.json next.config.js next.config.mjs next.config.ts .env.example app/layout.tsx app/page.tsx src/app/layout.tsx src/app/page.tsx; do
    [ -f "$f" ] && echo "- $f"
  done
  echo
  echo "## Signaux rapides"
  rg -n "TODO|FIXME|HACK|@ts-ignore|dangerouslySetInnerHTML|NEXT_PUBLIC_|process\\.env|eval\\(" . 2>/dev/null | head -n 50 || true
} > "$REPORT"

echo "Session start audit written to $REPORT"