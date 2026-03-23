#!/usr/bin/env bash
# design-backup.sh — Snapshot CSS + key TSX files + MDX project content with versioned folder + timestamp
# Usage: bash scripts/design-backup.sh ["optional note"]
# Run from: web/

set -euo pipefail

BACKUPS_DIR="design-backups"
SRC_DIR="src"

# ── Determine next version number ────────────────────────────────────────────
mkdir -p "$BACKUPS_DIR"

last=$(ls "$BACKUPS_DIR" 2>/dev/null | grep -oE '^v[0-9]+' | grep -oE '[0-9]+' | sort -n | tail -1 || true)
if [[ -z "$last" ]]; then
  next=1
else
  next=$((10#$last + 1))
fi
version=$(printf "v%02d" "$next")

# ── Build folder name: v01_2026-03-19_14-30-00 ───────────────────────────────
timestamp=$(date '+%Y-%m-%d_%H-%M-%S')
folder="${version}_${timestamp}"
dest="$BACKUPS_DIR/$folder"
mkdir -p "$dest"

# ── Copy all CSS files preserving relative paths ─────────────────────────────
find "$SRC_DIR" -name "*.css" | while read -r file; do
  rel="${file#$SRC_DIR/}"
  target_dir="$dest/src/$(dirname "$rel")"
  mkdir -p "$target_dir"
  cp "$file" "$dest/src/$rel"
done

# ── Copy top-level design-adjacent config files ───────────────────────────────
for cfg in postcss.config.mjs; do
  [[ -f "$cfg" ]] && cp "$cfg" "$dest/"
done

# ── Copy key TSX files (rendering pipeline) ──────────────────────────────────
TSX_FILES=(
  "src/app/[locale]/projects/[slug]/page.tsx"
  "src/app/[locale]/projects/page.tsx"
  "src/app/[locale]/layout.tsx"
  "src/app/layout.tsx"
  "src/lib/projects.ts"
  "src/lib/dictionaries.ts"
)
for f in "${TSX_FILES[@]}"; do
  if [[ -f "$f" ]]; then
    target_dir="$dest/$(dirname "$f")"
    mkdir -p "$target_dir"
    cp "$f" "$dest/$f"
  fi
done

# ── Copy MDX project content files ───────────────────────────────────────────
if [[ -d "content/projects" ]]; then
  mkdir -p "$dest/content/projects"
  find "content/projects" -name "*.mdx" | while read -r file; do
    cp "$file" "$dest/content/projects/"
  done
fi

# ── Write manifest ────────────────────────────────────────────────────────────
note="${1:-}"
{
  echo "version:   $version"
  echo "timestamp: $timestamp"
  echo "note:      ${note:-<no note>}"
  echo ""
  echo "files backed up:"
  find "$dest/src" -name "*.css" | sed "s|$dest/||" | sort
  find "$dest/src" -name "*.tsx" -o -name "*.ts" 2>/dev/null | sed "s|$dest/||" | sort
  find "$dest/content" -name "*.mdx" 2>/dev/null | sed "s|$dest/||" | sort
} > "$dest/MANIFEST.txt"

echo "✓ Backup created: $dest"
[[ -n "$note" ]] && echo "  note: $note"
echo "  Run 'bash scripts/design-restore.sh $version' to restore."
