SHELL := /bin/bash

.PHONY: setup up init seed-demo bootstrap down restart logs ps status clean backup restore frontend-lint frontend-build check smoke ci forbidden-artifacts prepr

setup:
	@test -f .env || cp .env.example .env
	@chmod +x scripts/*.sh
	@echo "Environment ready."

up: setup
	docker compose up -d --build

init:
	bash scripts/init-wordpress.sh

seed-demo:
	FORCE_SEED=true bash scripts/seed-blog.sh

bootstrap: setup
	bash scripts/bootstrap.sh

down:
	docker compose down

restart:
	docker compose down && docker compose up -d --build

logs:
	docker compose logs -f

ps status:
	docker compose ps

clean:
	docker compose down -v

backup:
	bash scripts/backup-db.sh

restore:
	@if [ -z "$(FILE)" ]; then \
		echo "Usage: make restore FILE=backups/your_backup.tar.gz"; \
		exit 1; \
	fi
	bash scripts/restore-db.sh "$(FILE)"

frontend-lint:
	npm --prefix frontend run lint

frontend-build:
	npm --prefix frontend run build

check:
	curl -fsS "$${WP_PROTOCOL:-http}://$${WP_DOMAIN:-localhost:$${WORDPRESS_PORT:-8080}}$${GRAPHQL_ENDPOINT:-/graphql}" >/dev/null
	@echo "GraphQL check passed."

smoke:
	bash scripts/smoke-test.sh

ci: frontend-build check smoke
	@echo "CI checks passed."

forbidden-artifacts:
	@if git ls-files --error-unmatch .env >/dev/null 2>&1; then \
		echo "ERROR: .env must not be tracked"; \
		exit 1; \
	fi
	@if [ -n "$$(git ls-files frontend/dist)" ]; then \
		echo "ERROR: frontend/dist must not be tracked"; \
		exit 1; \
	fi
	@echo "Forbidden artifacts check passed."

prepr: frontend-lint ci forbidden-artifacts
	@echo "Pre-PR checks passed."
