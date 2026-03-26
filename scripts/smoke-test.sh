#!/usr/bin/env bash
set -euo pipefail

WP_PROTOCOL="${WP_PROTOCOL:-http}"
WP_DOMAIN="${WP_DOMAIN:-localhost:${WORDPRESS_PORT:-8080}}"
GRAPHQL_ENDPOINT="${GRAPHQL_ENDPOINT:-/graphql}"
FRONTEND_HOST="${FRONTEND_HOST:-localhost}"
FRONTEND_PORT="${FRONTEND_PORT:-5173}"

GRAPHQL_URL="${WP_PROTOCOL}://${WP_DOMAIN}${GRAPHQL_ENDPOINT}"
FRONTEND_URL="http://${FRONTEND_HOST}:${FRONTEND_PORT}"

# If frontend port differs in compose/.env, autodetect published host port.
if docker compose ps frontend >/dev/null 2>&1; then
  DETECTED_FRONTEND_PORT="$(docker compose port frontend 3000 2>/dev/null | sed -E 's/.*:([0-9]+)$/\1/' || true)"
  if [ -n "${DETECTED_FRONTEND_PORT}" ]; then
    FRONTEND_PORT="${DETECTED_FRONTEND_PORT}"
    FRONTEND_URL="http://${FRONTEND_HOST}:${FRONTEND_PORT}"
  fi
fi

echo "=========================================="
echo "Smoke test: frontend + graphql"
echo "=========================================="
echo "GraphQL URL:  ${GRAPHQL_URL}"
echo "Frontend URL: ${FRONTEND_URL}"

echo "1) GraphQL HTTP availability..."
curl -fsS "${GRAPHQL_URL}" >/dev/null
echo "   OK"

echo "2) GraphQL query check..."
GRAPHQL_RESPONSE="$(
  curl -fsS "${GRAPHQL_URL}" \
    -H "Content-Type: application/json" \
    -d '{"query":"query SmokePosts { posts(first: 1) { nodes { id slug } } }"}'
)"

if [[ "${GRAPHQL_RESPONSE}" == *"\"errors\""* ]]; then
  echo "GraphQL returned errors:"
  echo "${GRAPHQL_RESPONSE}"
  exit 1
fi

if [[ "${GRAPHQL_RESPONSE}" != *"\"posts\""* ]]; then
  echo "GraphQL response does not contain posts payload:"
  echo "${GRAPHQL_RESPONSE}"
  exit 1
fi
echo "   OK"

echo "3) Frontend HTTP availability..."
curl -fsS "${FRONTEND_URL}" >/dev/null
echo "   OK"

echo "=========================================="
echo "Smoke test passed"
echo "=========================================="
