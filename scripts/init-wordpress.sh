#!/usr/bin/env bash
set -euo pipefail

echo "=========================================="
echo "WordPress bootstrap: init + plugins"
echo "=========================================="

WP_TITLE="${WP_TITLE:-Headless WordPress}"
WP_ADMIN_USER="${WP_ADMIN_USER:-admin}"
WP_ADMIN_PASSWORD="${WP_ADMIN_PASSWORD:-admin}"
WP_ADMIN_EMAIL="${WP_ADMIN_EMAIL:-admin@example.com}"
WP_PROTOCOL="${WP_PROTOCOL:-http}"
WP_DOMAIN="${WP_DOMAIN:-localhost:${WORDPRESS_PORT:-8080}}"
SITE_URL="${WP_PROTOCOL}://${WP_DOMAIN}"

echo "Waiting for WordPress container..."
for i in {1..60}; do
  if docker compose exec -T wordpress php -v >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

echo "Waiting for DB connectivity from WordPress..."
for i in {1..60}; do
  if docker compose exec -T wordpress sh -c 'mysqladmin ping -h db -u"${WORDPRESS_DB_USER:-wp}" -p"${WORDPRESS_DB_PASSWORD:-wp}" --silent' >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

if docker compose exec -T wordpress wp core is-installed --allow-root >/dev/null 2>&1; then
  echo "WordPress is already installed."
else
  echo "Installing WordPress core..."
  docker compose exec -T wordpress wp core install \
    --url="${SITE_URL}" \
    --title="${WP_TITLE}" \
    --admin_user="${WP_ADMIN_USER}" \
    --admin_password="${WP_ADMIN_PASSWORD}" \
    --admin_email="${WP_ADMIN_EMAIL}" \
    --skip-email \
    --allow-root
fi

echo "Installing/activating GraphQL + ACF plugins..."
docker compose exec -T wordpress wp plugin install wp-graphql --activate --allow-root
docker compose exec -T wordpress wp plugin install advanced-custom-fields --activate --allow-root
docker compose exec -T wordpress wp plugin install wpgraphql-acf --activate --allow-root 2>/dev/null || \
  echo "Optional wpgraphql-acf install skipped (custom portfolioSettings field does not require it)."
docker compose exec -T wordpress wp plugin install wpgraphql-rest-cors --activate --allow-root >/dev/null 2>&1 || true

echo "Updating site URL settings..."
docker compose exec -T wordpress wp option update siteurl "${SITE_URL}" --allow-root
docker compose exec -T wordpress wp option update home "${SITE_URL}" --allow-root

echo "Ensuring permalink structure..."
docker compose exec -T wordpress wp rewrite structure "/%postname%/" --hard --allow-root || true
docker compose exec -T wordpress wp rewrite flush --hard --allow-root || true

echo "Seeding demo blog..."
bash scripts/seed-blog.sh

echo "Seeding headless portfolio (projects, skill groups, site options)..."
bash scripts/seed-headless-portfolio.sh

echo "Done."
echo "WordPress: ${SITE_URL}/wp-admin"
echo "GraphQL:   ${SITE_URL}/graphql"
