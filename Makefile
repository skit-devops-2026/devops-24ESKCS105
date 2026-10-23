.PHONY: install test build run docker-build docker-up

install:
	cd backend && npm install
	@echo "frontend: static HTML/CSS/JS, nothing to install"

test:
	cd backend && npm test

build:
	@test -f frontend/index.html && test -f frontend/styles.css && test -f frontend/app.js && echo "frontend: static site OK"
	@echo "backend: no build step (Node.js)"

run:
	cd backend && node server.js

# Needed from M4 onwards
docker-build:
	docker build -t ghcr.io/skit-devops-2026/devops-24eskcs105-backend:latest ./backend
	docker build -t ghcr.io/skit-devops-2026/devops-24eskcs105-frontend:latest ./frontend

docker-up:
	docker compose up --build
