FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

# Source code is bind-mounted at runtime; pnpm install runs on container start
