#!/bin/bash
# Установка GraphQL плагинов для WordPress

set -e

echo "🔧 Установка GraphQL плагинов..."

docker compose exec -T wordpress wp plugin install wp-graphql --activate --allow-root 2>/dev/null || true
docker compose exec -T wordpress wp plugin install wpgraphql-rest-cors --activate --allow-root 2>/dev/null || true
docker compose exec -T wordpress wp plugin install headless-wp --activate --allow-root 2>/dev/null || true

echo "✅ GraphQL плагины установлены"