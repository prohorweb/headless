# Copilot / AI agent instructions — краткое руководство

Это **Headless WordPress + React SPA** стартер с Docker Compose, WPGraphQL и современным фронтендом на Vite.

## Быстрая ориентация

- **Основные компоненты:**
  - `docker-compose.yml`: WordPress (8080) + MariaDB
  - `frontend/`: React 19 SPA через Vite (5173), Apollo Client, React Router
  - `scripts/`: автоматизация установки плагинов, обновления доменов
  
- **Ключевые файлы:**
  - `frontend/src/main.jsx` — точка входа React
  - `frontend/src/apollo/client.js` — конфиг Apollo (использует относительный `/graphql`)
  - `frontend/src/pages/Home.jsx`, `PostDetail.jsx` — GraphQL запросы с `id` и `slug`
  - `.github/copilot-instructions.md`, `README.md` — документация

## Рабочий процесс

1. **Запуск окружения:**
   ```bash
   docker-compose up -d
   ./scripts/install-wp-graphql.sh
   ./scripts/update-wp-domain.sh  # для Codespaces/облака
   cd frontend && npm install && npm run dev
   ```

2. **Доступ в админку:**
   - Локально: `http://localhost:8080/wp-login.php` (admin / admin)
   - GitHub Codespaces: `https://{CODESPACE_NAME}-8080.app.github.dev/wp-login.php`

3. **Добавление контента:** создавайте посты в wp-admin → Posts, они сразу видны через GraphQL и фронтенд

4. **GraphQL запросы:** всегда запрашивайте `id` и `slug` для корректной работы маршрутизации

## Архитектура

```
headless/
├── docker-compose.yml          # WordPress + MariaDB
├── scripts/
│   ├── install-wp-graphql.sh   # установка WPGraphQL плагина
│   ├── update-wp-domain.sh     # обновление siteurl для Codespaces
│   └── check-and-fix-graphql.sh # отладка GraphQL endpoint
├── frontend/                   # React SPA
│   ├── src/apollo/client.js    # Apollo + proxy на /graphql
│   ├── src/pages/Home.jsx      # список постов
│   ├── src/pages/PostDetail.jsx # детали поста
│   ├── vite.config.js          # Vite с прокси
│   └── package.json
└── README.md, .github/copilot-instructions.md
```

## Важные детали

- **CORS:** фронтенд обращается к `/graphql` (релативный путь), Vite-proxy форвардит на `http://localhost:8080/graphql` в dev-режиме
- **Домены в облаке:** скрипт `update-wp-domain.sh` автоматически определяет `CODESPACE_NAME` и обновляет `siteurl`/`home` в WordPress
- **Пермалинки:** отключены (пустая `permalink_structure`) для упрощения; при необходимости включите чистые URL'ы и убедитесь, что Apache может писать `.htaccess`
- **WP-CLI:** скачивается внутри контейнера WordPress, не требует отдельного сервиса

## Типичные задачи

| Задача | Команда |
|--------|---------|
| Установить новый плагин | `docker-compose exec wordpress wp plugin install {slug} --activate --allow-root` |
| Создать тестовый пост | WP-CLI или wp-admin → Posts → Add New |
| Обновить GraphQL запрос | отредактируйте `gql` в `src/pages/*.jsx`, используйте DevTools Network для проверки |
| Добавить кастомный тип | добавьте код в wp-content/themes или плагин, затем экспортируйте через WPGraphQL |
| Деплой фронтенда | `npm run build` в `frontend/`, статику раздавайте отдельно (S3, Vercel и т.д.) |

## Что НЕ делать

- Не изменяйте `docker-compose.yml` без документирования причины
- Не удаляйте скрипты автоматизации (`scripts/`), они критичны для воспроизводимости
- Не коммитьте `wp-content/`, `node_modules/`, `db_data/` — используйте `.gitignore`
- Не используйте root-пароль от БД в коде; для локальной разработки это нормально, но в продакшене используйте переменные окружения

## Соглашения

- React компоненты — функциональные с хуками
- Apollo Client кэширует результаты; для инвалидации используйте `cache.evict()` или `refetch()`
- GraphQL переменные типизируйте правильно (`String!` для slug, не `ID!`)
- CSS через простые классы или Tailwind (сейчас отключён, но может быть включён позже)

