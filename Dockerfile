# NB: Når Node-versjon endres, bør samme endring også gjøres i:
# - .nvmrc
# - .github/dependabot.yml (fjern versjonspin for docker)
# - packages.json under "engines" (her leter dependabot npm)
# - .ncurc.js (automatiske oppdateringer for node-types)
FROM node:20-alpine AS dependencies

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY .npmrc.dockerbuild .npmrc

RUN --mount=type=secret,id=NODE_AUTH_TOKEN NODE_AUTH_TOKEN=$(cat /run/secrets/NODE_AUTH_TOKEN) \
    npm ci --prefer-offline --no-audit

FROM node:20-alpine AS builder

ARG DIGISOS_ENV
ENV NEXT_PUBLIC_DIGISOS_ENV=${DIGISOS_ENV}
WORKDIR /app
COPY --from=dependencies /app/node_modules/ node_modules/
COPY . .

RUN npm run orval
RUN npm run build


FROM node:20-slim AS release

ARG DIGISOS_ENV

ENV NEXT_PUBLIC_DIGISOS_ENV=${DIGISOS_ENV}
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder --chown=1069:1069 /app/build build
COPY --from=dependencies /app/node_modules/ node_modules/
COPY package.json .
COPY . .

CMD ["npm", "start"]
