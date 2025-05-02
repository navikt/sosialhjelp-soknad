# NB: Når Node-versjon endres, bør samme endring også gjøres i:
# - .nvmrc
# - .github/dependabot.yml (fjern versjonspin for docker)
# - .ncurc.js (automatiske oppdateringer for node-types)
# pt er vi på node 18 fordi ellers plager dekoratoren oss med "body has already been consumed"
FROM node:22-alpine AS dependencies

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY .npmrc.dockerbuild .npmrc

RUN --mount=type=secret,id=NODE_AUTH_TOKEN NODE_AUTH_TOKEN=$(cat /run/secrets/NODE_AUTH_TOKEN) \
    npm ci --prefer-offline --no-audit

FROM node:22-alpine AS builder

ARG DIGISOS_ENV
ARG LOGIN_SESSION_API_URL
ARG LOGOUT_URL
ENV NEXT_PUBLIC_DIGISOS_ENV=${DIGISOS_ENV}
ENV LOGIN_SESSION_API_URL=${LOGIN_SESSION_API_URL}
ENV LOGOUT_URL=${LOGOUT_URL}

WORKDIR /app
COPY --from=dependencies /app/node_modules/ node_modules/
COPY . .

RUN npm run orval
RUN npm run build
RUN npm prune --production


FROM gcr.io/distroless/nodejs18-debian12 AS runner

ARG DIGISOS_ENV

ENV NEXT_PUBLIC_DIGISOS_ENV=${DIGISOS_ENV}
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder --chown=1069:1069 /app/build build
COPY --from=builder /app/node_modules/ node_modules/
COPY package.json .
COPY . .

CMD ["./node_modules/next/dist/bin/next", "start"]