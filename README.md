# Headless WordPress - GraphQL API + React Frontend

Модернизированный headless WordPress проект с GraphQL API, React frontend на Vite и Docker-развертыванием.

## 🚀 Быстрый старт

### 1. Первый запуск (полная автоматизация)

```bash
git clone https://github.com/prohorweb/headless.git
cd headless
make bootstrap
```

Команда `make bootstrap` автоматически:
- создаёт `.env` из `.env.example` (если отсутствует),
- собирает и запускает контейнеры,
- инициализирует WordPress (core install),
- активирует GraphQL плагины,
- создаёт тестовый блог с демо-постами (если база пустая),
- проверяет GraphQL endpoint и выполняет smoke-тест frontend + GraphQL.

### 2. Доступ к сервисам

После запуска:
- **WordPress GraphQL API**: `http://localhost:8080/graphql`
- **React Frontend**: `http://localhost:${FRONTEND_PORT}` (по умолчанию `5173`)
- **WordPress Admin**: `http://localhost:8080/wp-admin`

### 3. Локальное тестирование без Docker

```bash
# Установка зависимостей
npm install

# Запуск разработки
npm run dev
```

## 📁 Структура проекта

```
headless/
├── docker-compose.yml          # Docker конфигурация
├── .env.example                # Шаблон окружения
├── frontend/                   # React приложение
│   ├── src/
│   │   ├── apollo/            # GraphQL клиент
│   │   ├── pages/             # Страницы (Home, PostDetail)
│   │   └── styles/            # CSS стили
│   └── index.html
├── scripts/                    # Утилитарные скрипты
│   ├── install-wp-graphql.sh  # Установка GraphQL плагинов
│   ├── check-and-fix-graphql.sh
│   ├── backup-db.sh           # Резервное копирование БД
│   ├── restore-db.sh          # Восстановление БД
│   └── update-wp-domain.sh    # Обновление домена WordPress
└── wp-content/                 # WP контент (темы, плагины)
```

## 🔧 Конфигурация (.env)

```bash
# Порт для frontend (по умолчанию 5173)
FRONTEND_PORT=5173

# MySQL конфигурация
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=wordpress
MYSQL_USER=wp
MYSQL_PASSWORD=wp

# WordPress Admin (логин/пароль создаются автоматически при первом запуске)
```

## 📦 Основные возможности

### GraphQL API

WordPress с активированным WPGraphQL плагинам предоставляет мощный GraphQL API:

```graphql
query {
  posts(first: 10) {
    nodes {
      id
      title
      excerpt
      date
    }
  }
}
```

### React Frontend

- Vite для быстрой разработки и оптимизации
- Apollo Client для GraphQL запросов
- Tailwind CSS для стилей
- Портфолио-лендинг (светлая тема) + страница статьи
- Компоненты: Home, PostDetail

## 🐳 Команды автоматизации (Makefile)

```bash
# Полный автоматический запуск
make bootstrap

# Поднять контейнеры без инициализации
make up

# Повторно инициализировать WP + GraphQL
make init

# Принудительно пересоздать демо-контент блога
make seed-demo

# Проверить GraphQL endpoint
make check

# E2E smoke-тест (GraphQL query + frontend)
make smoke

# Локальный pre-push CI прогон
make ci

# Бэкап/восстановление
make backup
make restore FILE=backups/wordpress_backup_YYYYMMDD_HHMMSS.tar.gz

# Логи и остановка
make logs
make down
```

## 🛠️ Утилитарные скрипты

### Установка GraphQL плагинов
```bash
bash scripts/install-wp-graphql.sh
```

### Проверка и исправление GraphQL конфигурации
```bash
bash scripts/check-and-fix-graphql.sh
```

### Резервное копирование БД
```bash
bash scripts/backup-db.sh
```

### Восстановление БД
```bash
bash scripts/restore-db.sh <backup.sql>
```

### Обновление домена WordPress
```bash
bash scripts/update-wp-domain.sh <new_domain>
```

## 📊 Архитектура

```
┌─────────────┐         ┌─────────────┐
│   Browser   │◄───────►│  Frontend   │
│  (Port 5173)│   HTTP   │(Vite + React)│
└─────────────┘         └─────────────┘
                              │
                              ▼ HTTP
┌─────────────┐         ┌─────────────┐
│   WordPress │◄───────►│    MariaDB  │
│  (Port 80)  │   HTTP   │   (Port 3306)│
│ GraphQL API │          │             │
└─────────────┘         └─────────────┘
```

## 🔐 Безопасность

- Используйте сильные пароли в `.env` файле
- Не коммитьте `.env` файл в Git (включен в .gitignore)
- Регулярно делайте резервные копии базы данных
- Обновляйте WordPress и плагины регулярно

## 🔀 Git Workflow

Рекомендуемый процесс работы с Git:

1. Создавайте ветку от свежего `main` (`feat/*`, `fix/*`, `chore/*`).
2. Перед PR запускайте локальные проверки: `make ci`.
3. Обновляйте ветку через `git rebase origin/main`.
4. Делайте merge через `Squash and merge`.
5. Удаляйте ветку после merge.

Подробные правила и примеры: `CONTRIBUTING.md`.
Шаги для настройки защиты `main`: `docs/branch-protection.md`.
Короткий чеклист для команды: `TEAM_WORKFLOW.md`.

## 📝 Лицензия

MIT License