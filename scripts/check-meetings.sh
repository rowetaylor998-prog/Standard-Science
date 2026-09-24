#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

PY="$ROOT_DIR/backend/.venv/bin/python"
if [[ ! -x "$PY" ]]; then
  echo "Backend virtual environment missing. Run:" >&2
  echo "  cd backend && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt" >&2
  exit 1
fi

echo "== Backend meeting tests =="
(
  cd "$ROOT_DIR/backend"
  "$PY" -m unittest discover -s tests -v
)

echo
echo "== Frontend type-check + production build =="
(
  cd "$ROOT_DIR/apps/web"
  npm run build
)

echo
echo "Open Meeting automated checks passed."
