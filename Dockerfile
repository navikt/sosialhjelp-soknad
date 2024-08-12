FROM node:22-alpine AS dependencies

COPY package.json .
COPY package-lock.json .
COPY .npmrc.dockerbuild .npmrc

RUN --mount=type=secret,id=NODE_AUTH_TOKEN NODE_AUTH_TOKEN=$(cat /run/secrets/NODE_AUTH_TOKEN) \
    npm ci --prefer-offline --no-audit

FROM node:22-alpine AS builder

COPY --from=dependencies node_modules/ node_modules/
COPY . .

RUN npm run orval
RUN npm run build

FROM node:22-alpine AS release

ENV PORT=8080

COPY --from=builder dist/ dist/
COPY --from=dependencies node_modules/ node_modules/
COPY package.json .

CMD ["npm", "start"]