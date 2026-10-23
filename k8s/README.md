# Kubernetes - Skill Swapify

Manifests for deploying Skill Swapify to a Kubernetes cluster (minikube, kind,
or a cloud cluster).

## Files

| File | Contents |
|---|---|
| `deployment.yaml` | `Deployment` for the backend (2 replicas, `/health` readiness + liveness probes, resource requests/limits, Prometheus scrape annotations) and a `Deployment` for the frontend. Images are the GHCR images built by CI. |
| `service.yaml` | `Service` of type `LoadBalancer` for the backend (80 -> 3000) and for the frontend (80 -> 80), with selectors matching the deployment pod labels. |

## Deploy

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

kubectl get pods
kubectl get services
kubectl rollout status deployment/skillswapify-backend
kubectl rollout status deployment/skillswapify-frontend
```

On minikube, run `minikube tunnel` in a separate terminal so the
LoadBalancer services get an external IP, then open the frontend service IP.

## Remove

```bash
kubectl delete -f k8s/service.yaml -f k8s/deployment.yaml
```
