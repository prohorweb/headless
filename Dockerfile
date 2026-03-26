FROM wordpress:latest

# Устанавливаем WP-CLI прямо в образ, чтобы не зависеть от локальных файлов
RUN curl -fsSL https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar -o /usr/local/bin/wp \
    && chmod +x /usr/local/bin/wp

# Устанавливаем mariadb-client для mysqladmin (используется в docker-compose command)
RUN apt-get update && apt-get install -y --no-install-recommends mariadb-client \
    curl \
    && rm -rf /var/lib/apt/lists/*