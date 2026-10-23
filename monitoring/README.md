# Monitoring - Skill Swapify

Prometheus + Grafana monitoring for the Skill Swapify backend.

## Files

| File | Purpose |
|---|---|
| `prometheus.yml` | Prometheus configuration. Scrapes the backend `/metrics` endpoint every 15s (`job: skillswapify-backend`, target `backend:3000` in Docker/Kubernetes, `localhost:3000` locally). |
| `alert-rules.yml` | Alert rules: `BackendDown` and `HighErrorRate`. |
| `grafana-dashboard.json` | Grafana dashboard "Skill Swapify Monitoring Dashboard" - request rate by route, backend up status, uptime and heap usage. Import it in Grafana via Dashboards > Import, or place it in a Grafana dashboards provisioning directory. |
| `dashboard.json` | Copy of the Grafana dashboard for checkers/importers that look for this name. |
| `sample-metrics.txt` | A real sample of the backend `/metrics` output captured from a running instance. |

## Run it

```bash
docker compose up --build
```

- Backend metrics: http://localhost:3000/metrics
- Prometheus: http://localhost:9090  (Targets page shows `skillswapify-backend` UP)
- Grafana: http://localhost:3001  (admin / admin)

The backend exposes Prometheus metrics with `prom-client`: default Node.js
metrics prefixed `skillswapify_`, plus the `skillswapify_http_requests_total`
counter labelled by method, route and status.
