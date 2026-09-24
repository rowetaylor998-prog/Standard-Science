#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
cd "$ROOT_DIR"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required for local LiveKit audio." >&2
  exit 1
fi
if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose v2 is required." >&2
  exit 1
fi
if ! command -v lsof >/dev/null 2>&1; then
  echo "lsof is required." >&2
  exit 1
fi

# If this checkout already has its backend on :8000, restart it so the
# LiveKit environment below is actually picked up. Never kill another project.
pids="$(lsof -nP -iTCP:8000 -sTCP:LISTEN -t 2>/dev/null || true)"
for pid in $pids; do
  cwd="$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')"
  if [[ "$cwd" == "$BACKEND_DIR" ]]; then
    echo "Restarting this project's backend (PID $pid) with LiveKit enabled..."
    kill "$pid" 2>/dev/null || true
  else
    echo "Port 8000 is used by another process (PID $pid, cwd: $cwd). Stop it first." >&2
    exit 1
  fi
done

docker compose -p standard-science-livekit -f docker/compose.livekit.yml up -d

# livekit-server --dev uses these documented local-development credentials.
export MEETINGS_MEDIA_PROVIDER=livekit
export LIVEKIT_URL=http://127.0.0.1:7880
export LIVEKIT_PUBLIC_URL=ws://127.0.0.1:7880
export LIVEKIT_API_KEY=devkey
export LIVEKIT_API_SECRET=secret

echo "Waiting for LiveKit on 127.0.0.1:7880..."
for _ in $(seq 1 30); do
  if curl --noproxy '*' -sS --max-time 1 http://127.0.0.1:7880/ >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

if ! curl --noproxy '*' -sS --max-time 1 http://127.0.0.1:7880/ >/dev/null 2>&1; then
  echo "LiveKit did not become reachable. Run:" >&2
  echo "  docker compose -p standard-science-livekit -f docker/compose.livekit.yml logs livekit" >&2
  exit 1
fi

echo
echo "LiveKit audio is enabled for this local development run."
echo "Frontend: http://127.0.0.1:5173/meetings"
echo "Stop LiveKit later with: ./scripts/stop-meeting-audio.sh"
echo

exec "$ROOT_DIR/scripts/dev.sh"
