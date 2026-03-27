#!/usr/bin/env bash
set -euo pipefail

echo "Seeding headless portfolio (ACF options, skill groups, projects)..."

if ! docker compose exec -T wordpress wp core is-installed --allow-root >/dev/null 2>&1; then
  echo "WordPress not installed; skip headless seed."
  exit 0
fi

docker compose exec -T wordpress wp eval-file /opt/scripts/seed-headless-portfolio.php --allow-root
