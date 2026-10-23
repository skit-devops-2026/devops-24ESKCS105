# Deployment - Skill Swapify

## Live deployment (no extra account needed)

The frontend is deployed automatically to **GitHub Pages** by the
`deploy-pages` job in `.github/workflows/ci.yml` on every push to `main`.

**Live URL:** https://skit-devops-2026.github.io/devops-24ESKCS105/

One-time setup in the GitHub repo (repo admin):
Settings -> Pages -> Build and deployment -> Source: **GitHub Actions**.

## Backend deployment on Render (free, 5 minutes)

1. Go to https://dashboard.render.com -> New -> Web Service.
2. Connect the GitHub repo `skit-devops-2026/devops-24ESKCS105`.
3. Runtime: **Docker**. Dockerfile path: `./Dockerfile` (repository root -
   this builds the backend service). Root directory: leave empty.
4. Instance type: Free. Click Create Web Service.
5. When the deploy finishes, Render gives a URL like
   `https://devops-24eskcs105.onrender.com`
6. Check `https://<your-render-url>/health` - it must return
   `{"status":"ok","commit":...}`.
7. Paste the Render URL into `README.md` under Live URL (as the backend URL)
   and take a screenshot of the Render "Live" deployment + the `/health`
   response, saving it over `docs/deployment.png` in this folder.

The screenshot currently in this folder (`deployment.png`) was captured from
a verified local run of exactly the same Dockerised app (health endpoint
responding OK) before the Render service was connected.

## Docker deployment (any VM / local)

```bash
docker compose up --build
# Frontend  http://localhost:8080
# Backend   http://localhost:3000/health
# Prometheus http://localhost:9090
# Grafana   http://localhost:3001
```

## Container images

CI pushes on every push to `main`:

- `ghcr.io/skit-devops-2026/devops-24eskcs105-backend:latest`
- `ghcr.io/skit-devops-2026/devops-24eskcs105-frontend:latest`

## Kubernetes deployment

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

See `k8s/README.md`.
