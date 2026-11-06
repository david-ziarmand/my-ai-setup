#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source_dir="$repo_dir/claude"
target_dir="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
manifest="$target_dir/.my-ai-setup-manifest"
dry_run=false

for arg in "$@"; do
  case "$arg" in
    --dry-run) dry_run=true ;;
    -h | --help)
      echo "Usage: ./install.sh [--dry-run]"
      echo "Copies claude/ from this repo into $target_dir, with a backup of every file it replaces."
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      exit 1
      ;;
  esac
done

run() {
  if $dry_run; then
    echo "  [dry-run] $*"
  else
    "$@"
  fi
}

native_path() {
  if command -v cygpath > /dev/null 2>&1; then
    cygpath -m "$1"
  else
    echo "$1"
  fi
}

managed_items=(CLAUDE.md settings.json statusline.js)
for rule in "$source_dir"/rules/*.md; do
  managed_items+=("rules/$(basename "$rule")")
done
for skill in "$source_dir"/skills/*/; do
  managed_items+=("skills/$(basename "$skill")")
done

backup_dir="$target_dir/my-ai-setup-backups/$(date +%Y%m%d-%H%M%S)"
echo "Source: $source_dir"
echo "Target: $target_dir"
$dry_run && echo "Dry run, nothing will be changed."

backup() {
  local item="$1"
  if [ -e "$target_dir/$item" ]; then
    run mkdir -p "$(dirname "$backup_dir/$item")"
    run cp -R "$target_dir/$item" "$backup_dir/$item"
  fi
}

if [ -f "$manifest" ]; then
  while IFS= read -r old_item; do
    [ -z "$old_item" ] && continue
    if [[ ! " ${managed_items[*]} " =~ " $old_item " ]] && [ -e "$target_dir/$old_item" ]; then
      echo "Remove (no longer in repo): $old_item"
      backup "$old_item"
      run rm -rf "${target_dir:?}/$old_item"
    fi
  done < "$manifest"
fi

run mkdir -p "$target_dir/rules" "$target_dir/skills"

for item in "${managed_items[@]}"; do
  echo "Install: $item"
  backup "$item"
  run rm -rf "${target_dir:?}/$item"
  run cp -R "$source_dir/$item" "$target_dir/$item"
done

claude_home="$(native_path "$target_dir")"
if $dry_run; then
  echo "  [dry-run] set {{CLAUDE_HOME}} in settings.json to $claude_home"
else
  sed -i.tmp "s#{{CLAUDE_HOME}}#$claude_home#g" "$target_dir/settings.json"
  rm -f "$target_dir/settings.json.tmp"
  printf "%s\n" "${managed_items[@]}" > "$manifest"
fi

if [ -d "$backup_dir" ]; then
  echo "Backup of replaced files: $backup_dir"
fi
echo "Done."
