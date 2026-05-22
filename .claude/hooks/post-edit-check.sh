#!/usr/bin/env bash
set -u

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$PROJECT_DIR" || exit 0

pm="npm"
[ -f pnpm-lock.yaml ] && pm="pnpm"
[ -f yarn.lock ] && pm="yarn"

run_if_script_exists() {
  local script="$1"
  if [ -f package.json ] && jq -e --arg s "$script" '.scripts[$s]' package.json >/dev/null 2>&1; then
    echo "Running $script..."
    case "$pm" in
      pnpm) pnpm "$script" ;;
      yarn) yarn "$script" ;;
      *) npm run "$script" ;;
    esac
  fi
}

run_if_script_exists lint || true
run_if_script_exists typecheck || true