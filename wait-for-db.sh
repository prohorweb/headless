#!/bin/sh

# Ожидание подключения к MySQL (порт 3306)
# Используем mysqladmin вместо /dev/tcp, так как это более надёжный способ

MAX_ATTEMPTS=30
ATTEMPT=1

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    # Проверяем доступность через mysqladmin ping (работает с MariaDB и MySQL)
    if mysqladmin ping -h db -u${MYSQL_USER:-wp} -p${MYSQL_PASSWORD:-wp} --silent 2>/dev/null; then
        echo "Database is ready"
        break
    else
        echo "Waiting for database... ($ATTEMPT/$MAX_ATTEMPTS)"
        sleep 2
        ATTEMPT=$((ATTEMPT + 1))
    fi
done

if [ $ATTEMPT -gt $MAX_ATTEMPTS ]; then
    echo "ERROR: Database connection timeout" >&2
    exit 1
fi