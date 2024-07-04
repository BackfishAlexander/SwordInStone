# Stage 1: Build the application
FROM node:lts-alpine AS builder

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
COPY .env .env
COPY prisma ./prisma

RUN npx prisma generate --schema=./prisma/schema.prisma && npm run build && npm prune --omit=dev

# Stage 2: Run the application
FROM node:lts-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules ./node_modules
COPY --from=builder --chown=node:node /home/node/dist ./dist
COPY --from=builder /home/node/.env .env
COPY --from=builder /home/node/prisma ./prisma

ARG PORT
EXPOSE ${PORT:-8080}

# Ensure migrations are run before starting the application
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma && node dist/main.js"]
