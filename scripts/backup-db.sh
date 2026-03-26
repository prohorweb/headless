#!/usr/bin/env bash
set -euo pipefail

# Создаёт полный бэкап WordPress (БД + wp-content)

BACKUP_DIR="backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="wordpress_backup_${TIMESTAMP}"
BACKUP_FILE="${BACKUP_DIR}/${BACKUP_NAME}.sql"
BACKUP_ARCHIVE="${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"

echo "=========================================="
echo "Создание бэкапа WordPress"
echo "=========================================="

# Создаём папку для бэкапов если её нет
mkdir -p "$BACKUP_DIR"

echo "Экспортируем БД в $BACKUP_FILE..."
docker compose exec -T db mysqldump -u wp -pwp wordpress > "$BACKUP_FILE"
echo "✓ БД экспортирована ($(du -h "$BACKUP_FILE" | cut -f1))"

echo ""
echo "Создаём архив с БД и wp-content..."
# В текущей конфигурации wp-content может отсутствовать на хосте (без bind mount).
# Добавляем его в архив только если папка реально существует.
if [ -d "wp-content" ]; then
  tar -czf "$BACKUP_ARCHIVE" -C . "$BACKUP_FILE" wp-content
else
  echo "⚠️  Папка wp-content не найдена на хосте, архивируем только SQL."
  tar -czf "$BACKUP_ARCHIVE" -C . "$BACKUP_FILE"
fi
ARCHIVE_SIZE=$(du -h "$BACKUP_ARCHIVE" | cut -f1)
echo "✓ Архив создан ($ARCHIVE_SIZE)"

# Удаляем отдельный SQL файл после успешного создания архива
rm -f "$BACKUP_FILE"

echo ""
echo "=========================================="
echo "✓ Бэкап готов"
echo "=========================================="
echo ""
echo "Файл: $BACKUP_ARCHIVE"
echo "Дата: $(date)"
echo ""
echo "Для восстановления используйте:"
echo "  ./scripts/restore-db.sh $BACKUP_ARCHIVE"
echo ""
