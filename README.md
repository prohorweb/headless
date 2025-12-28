# headless

This repository scaffold contains a minimal Headless WordPress + React (Vite) starter with Docker Compose.

## Quick start

1. Start WordPress and MariaDB:

```bash
docker-compose up -d
```

2. Install WPGraphQL plugin:

```bash
./scripts/install-wp-graphql.sh
```

3. Update WordPress domain (automatic for GitHub Codespaces, or manual):

```bash
# For GitHub Codespaces (auto-detects from CODESPACE_NAME):
./scripts/update-wp-domain.sh

# For other environments, set variables:
WP_DOMAIN="example.com" WP_PROTOCOL="https" ./scripts/update-wp-domain.sh
```

4. Frontend: install dependencies and run dev server (port 5173):

```bash
cd frontend
npm install
npm run dev
```

## Access WordPress Admin

- **Local:** `http://localhost:8080/wp-login.php`
- **GitHub Codespaces:** `https://{CODESPACE_NAME}-8080.app.github.dev/wp-login.php`

**Credentials:** 
- Username: `admin`
- Password: `admin`

## URLs

- **WordPress:** `http://localhost:8080` (or Codespaces domain)
- **GraphQL API:** `/graphql` endpoint (proxied through Vite dev server)
- **Frontend:** `http://localhost:5173` (dev) or Codespaces domain on port 5173

## Database Backup & Restore

### Backup (Export)

Create a full backup of WordPress database and wp-content:

```bash
./scripts/backup-db.sh
```

Creates a gzipped archive in `backups/` directory with timestamp.

### Restore (Import)

Restore WordPress from a backup archive:

```bash
./scripts/restore-db.sh backups/wordpress_backup_20251228_120000.tar.gz
```

The script will:
1. Extract the archive
2. Import the database
3. Update WordPress domain automatically

## Notes

- WordPress runs on port 8080, frontend dev server on 5173.
- Helper scripts (`scripts/install-wp-graphql.sh`, `scripts/update-wp-domain.sh`) automate setup.
- WP-CLI phar is downloaded inside the wordpress container for plugin management.
- CORS is handled via Vite proxy in dev; in production, configure proper CORS headers in WordPress.
# headless