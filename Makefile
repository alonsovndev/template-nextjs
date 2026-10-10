.PHONY: install dev test lint format ci

# CI runs on a clean checkout without a .env file; give it the local default
# so the production env guard only fires for real deployment builds.
export NEXT_PUBLIC_API_BASE_URL ?= http://localhost:8080

install:
	npm ci

dev:
	npm run dev

test:
	npm run test

lint:
	npm run lint

format:
	npm run format

# Runs exactly what the CI workflow runs.
ci:
	npm run format:check
	npm run verify
