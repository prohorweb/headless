#!/usr/bin/env bash
set -euo pipefail

# Восстанавливает WordPress из бэкапа (БД + wp-content)

ARCHIVE="${1:-}"

if [ -z "$ARCHIVE" ] || [ ! -f "$ARCHIVE" ]; then
  echo "Использование: ./scripts/restore-db.sh <путь_к_архиву.tar.gz>"
  echo ""
  echo "Примеры:"
  echo "  ./scripts/restore-db.sh backups/wordpress_backup_20251228_120000.tar.gz"
  echo "  ./scripts/restore-db.sh wordpress_backup.tar.gz"
  exit 1
fi

echo "=========================================="
echo "Восстановление WordPress из бэкапа"
echo "=========================================="
echo "Архив: $ARCHIVE"
echo ""

# Распаковываем архив
echo "Распаковываем архив..."
tar -xzf "$ARCHIVE"
echo "✓ Архив распакован"

# Находим SQL файл в распакованных файлах
SQL_FILE=$(find . -maxdepth 2 -name "*.sql" 2>/dev/null | head -1)

if [ -z "$SQL_FILE" ]; then
  echo "❌ Ошибка: SQL файл не найден в архиве"
  exit 1
fi

echo ""
echo "Импортируем БД из $SQL_FILE..."

# Убеждаемся, что контейнеры запущены
echo "Проверяем контейнеры..."
docker compose up -d db >/dev/null 2>&1

# Ждём, пока БД будет готова
echo "Ожидаем готовности БД..."
for i in {1..30}; do
  if docker compose exec -T db mysql -u wp -pwp -e "SELECT 1" >/dev/null 2>&1; then
    echo "БД готова"
    break
  fi
  sleep 1
done

# Импортируем БД
docker compose exec -T db mysql -u wp -pwp wordpress < "$SQL_FILE"
echo "✓ БД импортирована"

# Очищаем временный SQL файл
rm -f "$SQL_FILE"

echo ""
echo "Запускаем WordPress контейнер..."
docker compose up -d wordpress >/dev/null 2>&1

echo ""
echo "=========================================="
echo "✓ Восстановление завершено"
echo "=========================================="
echo ""
