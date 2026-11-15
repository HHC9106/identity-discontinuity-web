.PHONY: install dev check build preview

# Node projects isolate dependencies in node_modules; no Python venv is used.
install:
	npm ci

dev:
	npm run dev

check:
	npm run check

build:
	npm run build

preview:
	npm run preview
