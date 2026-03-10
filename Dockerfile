# ── Development stage (used by docker-compose dev) ──────────────────────────
FROM node:22-alpine AS dev

RUN npm install -g pnpm
WORKDIR /app
# Source code is bind-mounted at runtime; pnpm install runs on container start

# ── Production build stage ───────────────────────────────────────────────────
FROM node:22-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# Build args become VITE_ env vars at build time
ARG VITE_API_URL
ARG VITE_CHAT_WS_URL
ARG VITE_AUTH0_ENABLED
RUN pnpm build

# ── Production serve stage ───────────────────────────────────────────────────
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
