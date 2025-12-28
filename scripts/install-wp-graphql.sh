#!/usr/bin/env bash
set -euo pipefail

# Скрипт поднимает контейнеры, ждёт доступности БД и WordPress,
# затем скачивает WP-CLI внутри контейнера и устанавливает плагины.

COMPOSE="docker-compose"

echo "Запуск контейнеров..."
${COMPOSE} up -d

echo "Ожидание доступности MariaDB на db:3306..."
for i in {1..60}; do
  if ${COMPOSE} exec -T db mysql -h db -u wp -pwp wordpress -e "SELECT 1" >/dev/null 2>&1; then
    echo "MariaDB доступна"
    break
  fi
  echo -n '.'
  sleep 2
done

echo "Ожидание доступности WordPress на http://localhost:8080..."
for i in {1..60}; do
  if curl -sSf http://localhost:8080 >/dev/null 2>&1; then
    echo "WordPress доступен"
    break
  fi
  echo -n '.'
  sleep 2
done

echo "Скачиваем WP-CLI и устанавливаем плагины..."

# Скачаем WP-CLI phar внутри контейнера WordPress и используем его
${COMPOSE} exec -T wordpress bash -c '
  set -e
  curl -sL https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar -o /tmp/wp-cli.phar
  chmod +x /tmp/wp-cli.phar
  
  # Проверим WP-CLI
  php /tmp/wp-cli.phar --allow-root --version
  
  # Инициализируем WordPress (если ещё не инициализирован)
  echo "Проверяем инициализацию WordPress..."
  if ! php /tmp/wp-cli.phar --allow-root core is-installed 2>/dev/null; then
    echo "Инициализируем WordPress через WP-CLI..."
    php /tmp/wp-cli.phar --allow-root core install \
      --url="http://localhost:8080" \
      --title="Headless WordPress" \
      --admin_user="admin" \
      --admin_password="admin" \
      --admin_email="admin@example.com" \
      2>/dev/null || echo "WordPress уже может быть инициализирован"
  else
    echo "WordPress уже инициализирован"
  fi
  
  # Установим WPGraphQL
  echo "Устанавливаем WPGraphQL..."
  php /tmp/wp-cli.phar --allow-root plugin install wp-graphql --activate 2>/dev/null || echo "WPGraphQL может быть уже установлен или произошла ошибка"
  
  # Установим тему
  echo "Устанавливаем тему twentytwentyone..."
  php /tmp/wp-cli.phar --allow-root theme install twentytwentyone --activate 2>/dev/null || echo "Тема может быть уже установлена"
  
  # Создадим пример поста
  echo "Создаём примерный пост..."
  POST_ID=$(php /tmp/wp-cli.phar --allow-root post create --post_type=post --post_status=publish --post_title="Hello World from setup" --post_content="This is a sample post created during initialization." --porcelain 2>/dev/null || echo "0")
  if [ "$POST_ID" != "0" ]; then
    echo "Создана запись id: $POST_ID"
  fi
'

echo "Проверяем доступность GraphQL endpoint..."
GRAPHQL_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/graphql || echo "000")
if [ "$GRAPHQL_CODE" = "200" ] || [ "$GRAPHQL_CODE" = "405" ]; then
  echo "GraphQL endpoint доступен (HTTP $GRAPHQL_CODE)"
  echo "Выполняем тестовый GraphQL запрос..."
  curl -s -X POST http://localhost:8080/graphql \
    -H "Content-Type: application/json" \
    -d '{"query":"query{posts(first:1){nodes{id slug title}}}"}' | head -c 500
  echo ""
else
  echo "GraphQL endpoint вернул HTTP код: $GRAPHQL_CODE (может быть, плагин ещё не активирован)"
fi

echo "Готово."
echo ""
echo "WordPress: http://localhost:8080"
echo "GraphQL:   http://localhost:8080/graphql"
echo "Frontend:  http://localhost:5173 (после npm run dev в папке frontend)"
