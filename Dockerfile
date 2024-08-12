FROM node:22-alpine AS dependencies

ARG NODE_AUTH_TOKEN=${NODE_AUTH_TOKEN}

ENV NODE_AUTH_TOKEN=${NODE_AUTH_TOKEN}

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY .npmrc .

RUN NODE_AUTH_TOKEN=$NODE_AUTH_TOKEN npm ci --prefer-offline --no-audit

FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules/ node_modules/
COPY . .

RUN npm run build

FROM node:22-alpine AS release

ENV PORT 8080

WORKDIR /app
COPY --from=builder /app/dist/ dist/
COPY --from=dependencies /app/node_modules/ node_modules/
COPY package.json .

CMD ["npm", "start"]