# Draft: Headless WordPress — GraphQL, ACF, тёмный UI, форма контактов

Скопируйте заголовок и тело ниже при создании PR: **Compare** `main` ← `feature/wp-graphql-wire`.

## Title (заголовок PR)

```
Headless WordPress: GraphQL, ACF, тёмный UI, форма контактов
```

## Description (описание PR)

### WordPress / Docker

- Mu-plugin `wordpress/mu-plugins/headless-portfolio.php`: CPT `project`, `skill_group`, `contact_submission`; ACF **Site Settings**; GraphQL `portfolioSettings` (через `get_field`); публичная mutation `submitContact` (заявка в админке + `wp_mail`).
- `docker-compose`: тома mu-plugins и scripts; `init-wordpress.sh`: WPGraphQL, ACF, wpgraphql-acf (опционально); сиды блога и `seed-headless-portfolio`.
- `smoke-test.sh`: проверка `portfolioSettings`.

### Frontend

- Apollo Client, запросы/мутации, прокси Vite: `/graphql`, `/wp-content`.
- Страницы: Home, Blog, Projects, Post/Project detail; данные из WP.
- Тёмная вёрстка (из `feat/dark-theme-portfolio-static`): Header, Footer с формой, Hero, секции.
- Tailwind: директивы `@tailwind` в `index.css`; тип переменной slug `ID!` для постов/проектов.
- Featured Projects: 2 колонки на планшете (до `xl`), третья карточка скрыта в двухколоночной сетке.

### Проверка

- `make bootstrap` / `docker compose up` + `scripts/init-wordpress.sh`
- `npm run build` в `frontend/`
