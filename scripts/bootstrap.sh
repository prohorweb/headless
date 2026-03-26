#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -f .env ]; then
  echo ".env not found, creating from .env.example"
  cp .env.example .env
fi

echo "Starting containers..."
docker compose up -d --build

echo "Initializing WordPress and GraphQL..."
bash scripts/init-wordpress.sh

echo "Checking GraphQL endpoint..."
GRAPHQL_URL="${WP_PROTOCOL:-http}://${WP_DOMAIN:-localhost:${WORDPRESS_PORT:-8080}}${GRAPHQL_ENDPOINT:-/graphql}"
for i in {1..30}; do
  if curl -fsS "$GRAPHQL_URL" >/dev/null 2>&1; then
    echo "GraphQL is reachable: $GRAPHQL_URL"
    echo "Running smoke test..."
    bash scripts/smoke-test.sh
    exit 0
  fi
  sleep 2
done

echo "GraphQL did not become reachable in time: $GRAPHQL_URL" >&2
exit 1
