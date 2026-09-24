#!/usr/bin/env bash

set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
WEB_DIR="$ROOT_DIR/apps/web"
FRONTEND_URL="http://127.0.0.1:5173"

print_header() {
  printf "\n== %s ==\n" "$1"
}

has_command() {
  command -v "$1" >/dev/null 2>&1
}

open_website() {
  local attempt
  printf '\nWaiting for frontend and backend to be ready...\n'
  for ((attempt = 0; attempt < 30; attempt++)); do
    if curl --noproxy '*' -fsS --max-time 2 http://127.0.0.1:8000/health >/dev/null 2>&1 &&
       curl --noproxy '*' -fsS --max-time 2 "$FRONTEND_URL" >/dev/null 2>&1; then
      printf '前后端已就绪，正在打开浏览器：%s\n' "$FRONTEND_URL"
      if [[ "$(uname -s)" == Darwin ]]; then
        open "$FRONTEND_URL" && return 0
      elif has_command xdg-open; then
        xdg-open "$FRONTEND_URL" && return 0
      fi
      printf '未能自动打开浏览器，请复制此地址到浏览器地址栏：%s\n' "$FRONTEND_URL"
      return 0
    fi
    if [[ -n "${BACKEND_PID:-}" ]] && ! kill -0 "$BACKEND_PID" 2>/dev/null; then
      printf 'Backend exited before it was ready. Check the error above.\n' >&2
      return 1
    fi
    if [[ -n "${FRONTEND_PID:-}" ]] && ! kill -0 "$FRONTEND_PID" 2>/dev/null; then
      printf 'Frontend exited before it was ready. Check the error above.\n' >&2
      return 1
    fi
    sleep 1
  done
  printf 'Services did not become ready. Check the startup logs above.\n' >&2
  return 1
}

# Reuse only listeners whose working directory belongs to this checkout.
service_state() {
  local port="$1" expected_dir="$2" pids pid process_dir
  pids="$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t 2>/dev/null || true)"
  if [[ -z "$pids" ]]; then
    printf 'stopped'
    return
  fi
  for pid in $pids; do
    process_dir="$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')"
    if [[ "$process_dir" != "$expected_dir" ]]; then
      printf 'Port %s is occupied by another process (PID %s). No services were started.\n' "$port" "$pid" >&2
      return 1
    fi
  done
  printf 'running'
}

cleanup() {
  if [[ -n "${BACKEND_PID:-}" ]]; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
  if [[ -n "${FRONTEND_PID:-}" ]]; then
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

print_header "Be Knowledgeable MVP Development"
printf "Backend:  http://127.0.0.1:8000\n"
printf "Frontend: http://127.0.0.1:5173\n"

if ! has_command npm; then
  printf "\nMissing npm. Start the frontend manually after installing Node.js:\n"
  printf "  cd apps/web\n  npm install\n  npm run dev\n"
  exit 1
fi

if ! has_command lsof; then
  printf '\nMissing lsof; install it to check development ports safely.\n'
  exit 1
fi

if ! has_command curl; then
  printf '\nMissing curl; install it to check service readiness.\n'
  exit 1
fi

BACKEND_STATE="$(service_state 8000 "$BACKEND_DIR")" || exit 1
FRONTEND_STATE="$(service_state 5173 "$WEB_DIR")" || exit 1

if [[ "$BACKEND_STATE" == running && "$FRONTEND_STATE" == running ]]; then
  printf '\nBoth services are already running for this project.\n'
  open_website
  exit $?
fi

if [[ -x "$BACKEND_DIR/.venv/bin/python" ]]; then
  PYTHON_BIN="$BACKEND_DIR/.venv/bin/python"
else
  PYTHON_BIN="$(command -v python3 || command -v python || true)"
fi

if [[ -z "$PYTHON_BIN" ]]; then
  printf "\nMissing Python. Start the backend manually after installing Python:\n"
  printf "  cd backend\n  python3 -m venv .venv\n  source .venv/bin/activate\n  pip install -r requirements.txt\n  uvicorn main:app --reload\n"
  exit 1
fi

if ! "$PYTHON_BIN" -c "import uvicorn" >/dev/null 2>&1; then
  print_header "Backend Setup Needed"
  printf "Uvicorn was not found. Run:\n"
  printf "  cd backend\n"
  printf "  python3 -m venv .venv\n"
  printf "  source .venv/bin/activate\n"
  printf "  pip install -r requirements.txt\n"
  printf "  uvicorn main:app --reload\n"
  printf "\nThen start the frontend:\n"
  printf "  cd apps/web\n"
  printf "  npm install\n"
  printf "  npm run dev\n"
  exit 1
fi

STARTED_PIDS=()
if [[ "$BACKEND_STATE" == stopped ]]; then
  print_header "Starting Backend"
  (
    cd "$BACKEND_DIR" || exit 1
    exec "$PYTHON_BIN" -m uvicorn main:app --reload
  ) &
  BACKEND_PID=$!
  STARTED_PIDS+=("$BACKEND_PID")
else
  print_header "Reusing Running Backend"
fi

if [[ "$FRONTEND_STATE" == stopped ]]; then
  print_header "Starting Frontend"
  (
    cd "$WEB_DIR" || exit 1
    exec npm run dev
  ) &
  FRONTEND_PID=$!
  STARTED_PIDS+=("$FRONTEND_PID")
else
  print_header "Reusing Running Frontend"
fi

open_website || exit 1

print_header "Running"
printf "Press Ctrl+C to stop services started by this command.\n"
# Bash 3.2 (included with macOS) has no wait -n. Notice either child exiting
# so a failed startup cannot leave this command waiting on the other service.
while true; do
  for pid in "${STARTED_PIDS[@]}"; do
    if ! kill -0 "$pid" 2>/dev/null; then
      wait "$pid"
      exit $?
    fi
  done
  sleep 1
done
