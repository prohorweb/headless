FROM wordpress:latest

# Устанавливаем WP-CLI прямо в образ, чтобы не зависеть от локальных файлов
RUN curl -fsSL https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar -o /usr/local/bin/wp \
    && chmod +x /usr/local/bin/wp

# Устанавливаем mariadb-client для mysqladmin (нужен для wait-for-db.sh)
RUN apt-get update && apt-get install -y --no-install-recommends mariadb-client \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Создаем скрипт ожидания базы данных
COPY wait-for-db.sh /usr/local/bin/wait-for-db.sh
RUN chmod +x /usr/local/bin/wait-for-db.sh

# Устанавливаем кастомный command для ожидания БД перед запуском Apache
CMD ["sh", "-c", "/usr/local/bin/wait-for-db.sh && exec docker-entrypoint.sh apache2-foreground"]