#!/usr/bin/env bash

#* Get root directory
root=$(git rev-parse --show-toplevel 2>/dev/null)

#* Check if watchexec is installed
if ! command -v watchexec &>/dev/null; then
  echo "watchexec could not be found"
  echo "Please install it and try again"
  echo "e.g. \`cargo binstall watchexec-cli\`"
  exit 1
fi

#* Load .env file
if [ -f "$root/.env" ]; then
  source "$root/.env"
else
  echo "No .env file found"
  echo "Please create one and try again"
  echo "e.g. \`cp .env.example .env\`"
  exit 1
fi

#* Execute dev command
watchexec --no-vcs-ignore --exts "js,json,css" \
  cp "$root"/main.js "$root"/styles.css "$root"/manifest.json "${OUTPUT_PLUGIN_DIR}"
