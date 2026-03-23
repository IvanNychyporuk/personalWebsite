#!/usr/bin/env bash
# design-restore.sh — Restore CSS + key TSX files + MDX project content from a versioned backup
# Usage: bash scripts/design-restore.sh <version>   e.g.  bash scripts/design-restore.sh v02
# Run from: web/

set -euo pipefail

BACKUPS_DIR="design-backups"

# ── Args ──────────────────────────────────────────────────────────────────────
if [[ $# -lt 1 ]]; then
  echo "Usage: bash scripts/design-restore.sh <version>"
  echo ""
  echo "Available backups:"
  ls "$BACKUPS_DIR" 2>/dev/null | grep -v '^$' | sed 's/^/  /'
  exit 1
fi

version="$1"

# ── Find the matching backup folder ───────────────────────────────────────────
match=$(ls "$BACKUPS_DIR" 2>/dev/null | grep "^${version}_" | head -1)
if [[ -z "$match" ]]; then
  echo "Error: no backup found for version '$version'"
  echo ""
  echo "Available backups:"
  ls "$BACKUPS_DIR" 2>/dev/null | sed 's/^/  /'
  exit 1
fi

backup_dir="$BACKUPS_DIR/$match"
echo "Restoring from: $backup_dir"
cat "$backup_dir/MANIFEST.txt"
echo ""

# ── Safety: auto-backup current state before overwriting ─────────────────────
echo "Auto-saving current state before restore..."
bash scripts/design-backup.sh "auto-save before restoring $version"

# ── Restore CSS files ─────────────────────────────────────────────────────────
find "$backup_dir/src" -name "*.css" | while read -r file; do
  rel="${file#$backup_dir/src/}"
  dest="src/$rel"
  mkdir -p "$(dirname "$dest")"
  cp "$file" "$dest"
  echo "  restored: $dest"
done

# ── Restore config files (if backed up) ───────────────────────────────────────
for cfg in postcss.config.mjs; do
  if [[ -f "$backup_dir/$cfg" ]]; then
    cp "$backup_dir/$cfg" "./$cfg"
    echo "  restored: $cfg"
  fi
done

# ── Restore key TSX files (if backed up) ─────────────────────────────────────
if [[ -d "$backup_dir/src" ]]; then
  find "$backup_dir/src" -name "*.tsx" -o -name "*.ts" | while read -r file; do
    rel="${file#$backup_dir/}"
    dest_file="$rel"
    mkdir -p "$(dirname "$dest_file")"
    cp "$file" "$dest_file"
    echo "  restored: $dest_file"
  done
fi

# ── Restore MDX project content files (if backed up) ─────────────────────────
if [[ -d "$backup_dir/content/projects" ]]; then
  mkdir -p "content/projects"
  find "$backup_dir/content/projects" -name "*.mdx" | while read -r file; do
    filename="$(basename "$file")"
    cp "$file" "content/projects/$filename"
    echo "  restored: content/projects/$filename"
  done
fi

echo ""
echo "✓ Restore complete. Restart your dev server to see the changes."
