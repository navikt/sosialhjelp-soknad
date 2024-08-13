FROM node:22-alpine AS dependencies

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY .npmrc.dockerbuild .npmrc

RUN --mount=type=secret,id=NODE_AUTH_TOKEN NODE_AUTH_TOKEN=$(cat /run/secrets/NODE_AUTH_TOKEN) \
    npm ci --prefer-offline --no-audit

FROM node:22-alpine AS builder

ARG DIGISOS_ENV
ENV NEXT_PUBLIC_DIGISOS_ENV=${DIGISOS_ENV}
WORKDIR /app
COPY --from=dependencies /app/node_modules/ node_modules/
COPY . .

RUN npm run orval
RUN npm run build


FROM node:22-alpine AS release

ARG DIGISOS_ENV
ENV NEXT_PUBLIC_DIGISOS_ENV=${DIGISOS_ENV}
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/build build

COPY --from=dependencies /app/node_modules/ node_modules/
COPY package.json .
COPY . .

CMD ["npm", "start"]
