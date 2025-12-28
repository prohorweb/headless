#!/usr/bin/env bash
set -euo pipefail

echo "Проверка GraphQL endpoint (HTTP)..."
echo "--- HTTP response ---"
curl -i -s -X POST http://localhost:8080/graphql -H "Content-Type: application/json" -d '{"query":"query{posts(first:1){nodes{id slug}}}"}' || true
echo "--- end HTTP response ---"

echo "Проверка и исправление внутри контейнера WordPress..."
docker-compose exec -T wordpress bash -lc '
  set -e
  if [ ! -f /tmp/wp-cli.phar ]; then
    echo "Скачиваем wp-cli.phar внутри контейнера..."
    curl -sL https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar -o /tmp/wp-cli.phar
    chmod +x /tmp/wp-cli.phar
  fi

  echo "Версия WP-CLI:"
  php /tmp/wp-cli.phar --allow-root --version || true

  echo "Статус плагина wp-graphql:"
  php /tmp/wp-cli.phar --allow-root plugin status wp-graphql || true

  if php /tmp/wp-cli.phar --allow-root plugin is-installed wp-graphql >/dev/null 2>&1; then
    echo "Плагин установлен — пытаемся активировать"
    php /tmp/wp-cli.phar --allow-root plugin activate wp-graphql || true
  else
    echo "Плагин не установлен — устанавливаем и активируем"
    php /tmp/wp-cli.phar --allow-root plugin install wp-graphql --activate || true
  fi

  echo "Проверяем permalink_structure"
  PERM=$(php /tmp/wp-cli.phar --allow-root option get permalink_structure || true)
  echo "permalink_structure=$PERM"
  if [ -z "$PERM" ]; then
    echo "Устанавливаем понятные постоянные ссылки и принудительно сбрасываем правила перезаписи"
    php /tmp/wp-cli.phar --allow-root option update permalink_structure "/%postname%/" || true
    php /tmp/wp-cli.phar --allow-root rewrite flush --hard || true
  fi
'

echo "Повторная проверка GraphQL endpoint (HTTP)..."
curl -i -s -X POST http://localhost:8080/graphql -H "Content-Type: application/json" -d '{"query":"query{posts(first:1){nodes{id slug}}}"}' || true

echo "Готово. Если endpoint по-прежнему редиректит — пришлите вывод этой команды и лог контейнера WordPress (docker-compose logs wordpress)."
