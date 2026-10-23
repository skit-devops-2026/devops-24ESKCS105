# skill swapify

![CI](https://github.com/skit-devops-2026/devops-24ESKCS105/actions/workflows/ci.yml/badge.svg)

## Author

| Roll No. | Name | GitHub username |
|---|---|---|
| 24ESKCS105 | deepak swami | b240962-ctrl |

## About

Skill Swapify is a peer-to-peer skill exchange platform where people teach what they know and learn what they don't, without money changing hands. A user offers a skill they can teach, such as guitar, Python or photography, and gets matched with someone who wants that skill and can teach one they want in return. The project is built as a static HTML/CSS/JavaScript frontend with a Node.js / Express backend.

## Tech stack

- Frontend: html,css,javascript
- Backend: Node.js / Express
- Database: MongoDB Atlas
- DevOps: Docker, docker-compose, GitHub Actions (CI/CD to GHCR), Prometheus, Grafana, Kubernetes

## Project structure

```
backend/     Express API - /health and /metrics (Prometheus) endpoints
frontend/    Static HTML/CSS/JavaScript app, served by nginx in Docker
monitoring/  Prometheus config, alert rules and Grafana dashboard
k8s/         Kubernetes deployment and service manifests
docs/        Deployment notes and deployment screenshot
```

## Running locally

```bash
make install
make run
```

Or with Docker (app + Prometheus + Grafana):

```bash
docker compose up --build
# Frontend:  http://localhost:8080
# Backend:   http://localhost:3000/health
# Prometheus: http://localhost:9090
# Grafana:   http://localhost:3001  (admin / admin)
```

## Container images (GHCR)

Built and pushed by GitHub Actions on every push to `main`:

- `ghcr.io/skit-devops-2026/devops-24eskcs105-backend:latest`
- `ghcr.io/skit-devops-2026/devops-24eskcs105-frontend:latest`

## Live URL

https://skit-devops-2026.github.io/devops-24ESKCS105/

Frontend is deployed to GitHub Pages by the CI workflow. The backend is
deployed from the root Dockerfile (see `docs/deployment.md` for the Render
steps).


## Development workflow

Work happens on short-lived branches, never directly on `main`:

1. Create a branch: `feature/<short-name>`, `docs/<short-name>` or `fix/<short-name>`.
2. Commit with a descriptive message (what changed and why, not "update" or "fix").
3. Open a pull request into `main` **with a description** of the change and how it was tested.
4. Wait for the CI workflow to go green, then merge the pull request.

See `CONTRIBUTING.md` for the full guide.

## Health endpoint

`GET /health` returns the running commit SHA. See `Makefile` and the milestone
sheet for why this is required.

Example:

```json
{"status":"ok","commit":"local","uptime":12.3,"timestamp":"2026-10-23T00:00:00.000Z"}
```

## Kubernetes

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

See `k8s/README.md` and `monitoring/README.md` for details.
