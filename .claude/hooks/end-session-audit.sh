#!/usr/bin/env bash
set -u

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
REPORT_DIR="$PROJECT_DIR/.claude/reports"
mkdir -p "$REPORT_DIR"
DATE_ONLY="$(date +%F)"
STAMP="$(date +%F-%H%M%S)"
HOUR="$(date +%H)"
REPORT="$REPORT_DIR/daily-report-$DATE_ONLY.md"
TMP="$REPORT_DIR/.tmp-$STAMP.md"

cd "$PROJECT_DIR" || exit 0

pm="npm"
[ -f pnpm-lock.yaml ] && pm="pnpm"
[ -f yarn.lock ] && pm="yarn"

run_script() {
  local script="$1"
  if [ -f package.json ] && jq -e --arg s "$script" '.scripts[$s]' package.json >/dev/null 2>&1; then
    echo "### $script" >> "$TMP"
    case "$pm" in
      pnpm) pnpm "$script" >> "$TMP" 2>&1 ;;
      yarn) yarn "$script" >> "$TMP" 2>&1 ;;
      *) npm run "$script" >> "$TMP" 2>&1 ;;
    esac || true
    echo >> "$TMP"
  fi
}

{
  echo "# Daily report - $DATE_ONLY"
  echo
  echo "- Date: $(date)"
  echo "- Projet: $PROJECT_DIR"
  echo "- Heure: $HOUR"
  echo
  echo "## Git status"
  git status --short 2>/dev/null || echo "git indisponible"
  echo
  echo "## Diff summary"
  git diff --stat 2>/dev/null || true
  echo
  echo "## Quality checks"
} > "$TMP"

run_script lint
run_script typecheck
run_script test
run_script build

{
  echo "## Security checks"
  if [ -f package.json ]; then
    case "$pm" in
      pnpm) pnpm audit --prod --ignore-registry-errors >> "$TMP" 2>&1 || true ;;
      yarn) yarn audit >> "$TMP" 2>&1 || true ;;
      *) npm audit --omit=dev >> "$TMP" 2>&1 || true ;;
    esac
  fi
  echo
  echo "## Sensitive patterns"
  rg -n "TODO|FIXME|HACK|SECRET|TOKEN|API_KEY|PRIVATE_KEY|dangerouslySetInnerHTML|eval\\(|innerHTML\\s*=|bypass" . 2>/dev/null | head -n 100 || true
} >> "$TMP"

if [ "$HOUR" -ge 23 ] && command -v npx >/dev/null 2>&1; then
  {
    echo
    echo "## Late audit"
    echo "Après 23h, un audit plus poussé est recommandé."
    echo "Lancer manuellement si le serveur de dev tourne :"
    echo "npx lighthouse http://localhost:3000 --output html --output-path ./.claude/reports/lighthouse-$DATE_ONLY.html"
  } >> "$TMP"
fi

mv "$TMP" "$REPORT"
echo "End session audit written to $REPORT"