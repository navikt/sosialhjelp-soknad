FROM navikt/node-express:12.2.0-alpine

ENV NODE_ENV production

WORKDIR /app
COPY server.js server.js
COPY build build/

CMD ["node", "./server.js"]