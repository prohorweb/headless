#!/usr/bin/env bash
set -euo pipefail

echo "=========================================="
echo "Seeding demo blog content"
echo "=========================================="

FORCE_SEED="${FORCE_SEED:-false}"
POST_COUNT="$(docker compose exec -T wordpress wp post list --post_type=post --post_status=publish --format=count --allow-root)"

if [ "${FORCE_SEED}" = "true" ]; then
  echo "Force mode enabled. Recreating demo posts..."
  POST_IDS="$(docker compose exec -T wordpress wp post list --post_type=post --post_status=publish --field=ID --allow-root | tr -d '\r' || true)"
  if [ -n "${POST_IDS}" ]; then
    while IFS= read -r id; do
      [ -n "${id}" ] && docker compose exec -T wordpress wp post delete "${id}" --force --allow-root >/dev/null
    done <<< "${POST_IDS}"
  fi
elif [ "${POST_COUNT}" -gt 0 ]; then
  echo "Posts already exist (${POST_COUNT}). Skip seeding."
  exit 0
fi

docker compose exec -T wordpress wp term create category "News" --slug=news --allow-root >/dev/null 2>&1 || true
docker compose exec -T wordpress wp term create category "Guides" --slug=guides --allow-root >/dev/null 2>&1 || true
docker compose exec -T wordpress wp term create category "Case Studies" --slug=case-studies --allow-root >/dev/null 2>&1 || true

get_category_id() {
  local slug="$1"
  docker compose exec -T wordpress wp term list category --slug="${slug}" --field=term_id --allow-root | tr -d '\r'
}

NEWS_ID="$(get_category_id news)"
GUIDES_ID="$(get_category_id guides)"
CASE_STUDIES_ID="$(get_category_id case-studies)"

create_post() {
  local title="$1"
  local slug="$2"
  local category_id="$3"
  local content="$4"

  docker compose exec -T wordpress wp post create \
    --post_type=post \
    --post_status=publish \
    --post_title="${title}" \
    --post_name="${slug}" \
    --post_content="${content}" \
    --post_category="${category_id}" \
    --allow-root >/dev/null
}

create_post \
  "Senior Software Engineer Portfolio: Demo" \
  "senior-software-engineer-portfolio-demo" \
  "${NEWS_ID}" \
  "<p>This is an auto-generated post for the portfolio-style demo blog.</p><p>Use this layout to showcase projects, architecture notes, and engineering achievements.</p>"

create_post \
  "Building a Scalable Headless CMS Stack" \
  "building-a-scalable-headless-cms-stack" \
  "${GUIDES_ID}" \
  "<p>WPGraphQL exposes WordPress content as a modern API.</p><ul><li>Typed schema with flexible queries</li><li>Fast frontend iteration in React</li><li>Independent deployment of CMS and UI</li></ul>"

create_post \
  "Project Automation Checklist" \
  "project-automation-checklist" \
  "${GUIDES_ID}" \
  "<p>This project supports one-command bootstrap, smoke tests, CI checks, backups, and restore flows.</p>"

create_post \
  "Case Study: Migrating Monolith to Headless" \
  "case-study-migrating-monolith-to-headless" \
  "${CASE_STUDIES_ID}" \
  "<p>We reduced frontend release cycle from days to hours by decoupling CMS and UI.</p><p>Result: better performance, autonomous teams, and cleaner APIs.</p>"

create_post \
  "Engineering Leadership Notes" \
  "engineering-leadership-notes" \
  "${CASE_STUDIES_ID}" \
  "<p>Mentoring, architecture reviews, and quality gates are key to sustainable velocity.</p>"

create_post \
  "Performance Tuning for React + GraphQL" \
  "performance-tuning-react-graphql" \
  "${GUIDES_ID}" \
  "<p>Use query-level optimization, cache policies, and component boundaries to improve perceived speed.</p>"

echo "Demo blog content created."
