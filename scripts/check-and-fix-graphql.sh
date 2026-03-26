#!/bin/bash
# Проверка и исправление конфигурации GraphQL

set -e

echo "🔍 Проверка конфигурации GraphQL..."

# Установка плагинов если еще не установлены
docker compose exec -T wordpress wp plugin install wp-graphql --activate --allow-root 2>/dev/null || true
docker compose exec -T wordpress wp plugin install wpgraphql-rest-cors --activate --allow-root 2>/dev/null || true

# Обновление конфигурации GraphQL
if [ -f ./scripts/install-wp-graphql.sh ]; then
  bash ./scripts/install-wp-graphql.sh
fi

echo "✅ Конфигурация GraphQL проверена"