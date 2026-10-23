# Skill Swapify - root Dockerfile (backend service, for platforms like Render
# that build from the repository root). The per-service Dockerfiles live in
# backend/Dockerfile and frontend/Dockerfile and are what docker-compose uses.
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY backend/ ./
ENV NODE_ENV=production
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1
CMD ["node", "server.js"]
