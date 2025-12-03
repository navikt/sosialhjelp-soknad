# NB: Når Node-versjon endres, bør samme endring også gjøres i:
# - .nvmrc
# - .github/dependabot.yml (fjern versjonspin for docker)
# - .ncurc.js (automatiske oppdateringer for node-types)
FROM node:22-alpine AS dependencies

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
COPY .npmrc.dockerbuild .npmrc

ENV CI=true

RUN --mount=type=secret,id=NODE_AUTH_TOKEN NODE_AUTH_TOKEN=$(cat /run/secrets/NODE_AUTH_TOKEN) \
    pnpm i --prefer-offline --frozen-lockfile

FROM node:22-alpine AS builder

ARG DIGISOS_ENV
ARG LOGIN_SESSION_API_URL
ARG LOGOUT_URL
ENV NEXT_PUBLIC_DIGISOS_ENV=${DIGISOS_ENV}
ENV LOGIN_SESSION_API_URL=${LOGIN_SESSION_API_URL}
ENV LOGOUT_URL=${LOGOUT_URL}

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ENV CI=true

WORKDIR /app
COPY --from=dependencies /app/node_modules/ node_modules/
COPY . .

RUN pnpm run orval
RUN pnpm run build
RUN pnpm prune --production


FROM gcr.io/distroless/nodejs18-debian12 AS runner

ARG DIGISOS_ENV

ENV NEXT_PUBLIC_DIGISOS_ENV=${DIGISOS_ENV}
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production
ENV CREATE_MESSAGES_DECLARATION=skip

WORKDIR /app

COPY --from=builder --chown=1069:1069 /app/.next .next
COPY --from=builder /app/node_modules/ node_modules/
COPY package.json .
COPY . .

CMD ["./node_modules/next/dist/bin/next", "start"]
