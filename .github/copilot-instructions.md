# Copilot / AI agent instructions

Это проект **Headless WordPress + React** с автоматизированным локальным запуском через `Makefile`.

## Актуальный запуск

```bash
make bootstrap
```

Что делает bootstrap:

- поднимает Docker сервисы (`db`, `wordpress`, `frontend`);
- инициализирует WordPress и GraphQL;
- заполняет демо-контент (если нужно);
- запускает smoke-проверку frontend + GraphQL.

## Основные команды

- `make up` — поднять контейнеры
- `make init` — переинициализировать WordPress
- `make seed-demo` — принудительно пересоздать демо-посты
- `make smoke` — smoke-check endpoint'ов
- `make ci` — локальный pre-push прогон
- `make backup` / `make restore FILE=...` — бэкап и восстановление БД

## Текущая архитектура

- `docker-compose.yml`: MariaDB + WordPress + frontend (Vite dev server)
- `scripts/bootstrap.sh`: единая точка автоматизации
- `scripts/init-wordpress.sh`: WP init + plugin activation + permalink + seed
- `scripts/smoke-test.sh`: проверка `http://localhost:8080/graphql` и frontend
- `frontend/src/apollo/client.js`: запросы идут через `/graphql`

## Важно

- Используйте `docker compose` (без дефиса) в новых командах/скриптах.
- Для WordPress-контента ориентируйтесь на данные из GraphQL (`id`, `slug` обязательны в списках).
- Не коммитьте секреты и артефакты сборки (`.env`, `frontend/dist`, `node_modules`).

