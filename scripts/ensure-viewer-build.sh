#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
VIEWER_DIR="$ROOT_DIR/viewer"
BUNDLE="$ROOT_DIR/scripts/tldraw-viewer.js"

if [ -f "$BUNDLE" ]; then
  # Check if any viewer source file is newer than the bundle
  NEWER=$(find "$VIEWER_DIR/src" "$VIEWER_DIR/vite.config.ts" "$VIEWER_DIR/package.json" -newer "$BUNDLE" 2>/dev/null | head -1)
  if [ -z "$NEWER" ]; then
    exit 0
  fi
fi

echo "Building tldraw viewer..."

if ! command -v pnpm &>/dev/null; then
  echo "pnpm not found, skipping viewer build" >&2
  exit 0
fi

if [ ! -d "$VIEWER_DIR/node_modules" ]; then
  (cd "$VIEWER_DIR" && pnpm install --frozen-lockfile)
fi

(cd "$VIEWER_DIR" && pnpm build)
