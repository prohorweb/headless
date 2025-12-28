#!/usr/bin/env bash
set -euo pipefail

# Автоматически определяем и обновляем домен WordPress для GitHub Codespaces / облачной среды

# Пытаемся определить домен из переменных окружения или боремся с тем, что есть
CODESPACE_NAME="${CODESPACE_NAME:-}"
GITHUB_CODESPACES="${GITHUB_CODESPACES:-false}"

if [ "$GITHUB_CODESPACES" = "true" ] && [ -n "$CODESPACE_NAME" ]; then
  # GitHub Codespaces: используем переменную окружения
  WP_DOMAIN="${CODESPACE_NAME}-8080.app.github.dev"
  WP_PROTOCOL="https"
else
  # Локальная машина или другая среда — используем localhost
  WP_DOMAIN="${WP_DOMAIN:-localhost:8080}"
  WP_PROTOCOL="${WP_PROTOCOL:-http}"
fi

SITEURL="${WP_PROTOCOL}://${WP_DOMAIN}"

echo "=========================================="
echo "Обновляем WordPress siteurl и home"
echo "=========================================="
echo "Целевой URL: $SITEURL"
echo ""

docker-compose exec -T wordpress bash -c '
  set -e
  
  if [ ! -f /tmp/wp-cli.phar ]; then
    echo "Скачиваем WP-CLI phar..."
    curl -sL https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar -o /tmp/wp-cli.phar
    chmod +x /tmp/wp-cli.phar
  fi
  
  echo "Текущие значения:"
  CURRENT_SITEURL=$(php /tmp/wp-cli.phar --allow-root option get siteurl || echo "не установлено")
  CURRENT_HOME=$(php /tmp/wp-cli.phar --allow-root option get home || echo "не установлено")
  echo "  siteurl: $CURRENT_SITEURL"
  echo "  home:    $CURRENT_HOME"
  echo ""
  
  echo "Обновляем на: '"$SITEURL"'"
  php /tmp/wp-cli.phar --allow-root option update siteurl '"$SITEURL"' || true
  php /tmp/wp-cli.phar --allow-root option update home '"$SITEURL"' || true
  echo ""
  
  echo "Новые значения:"
  echo "  siteurl: $(php /tmp/wp-cli.phar --allow-root option get siteurl)"
  echo "  home:    $(php /tmp/wp-cli.phar --allow-root option get home)"
'

echo ""
echo "=========================================="
echo "✓ Готово"
echo "=========================================="
echo ""
echo "Заходите на:"
echo "  WordPress:  ${SITEURL}/wp-admin"
echo "  GraphQL:    ${SITEURL}/graphql"
echo "  Frontend:   https://${CODESPACE_NAME}-5173.app.github.dev/ (или http://localhost:5173)"
echo ""
echo "Логин: admin"
echo "Пароль: admin"
echo ""
