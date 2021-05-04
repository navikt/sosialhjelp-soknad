FROM navikt/node-express:12.2.0-alpine

ENV NODE_ENV production

WORKDIR /app
COPY package.json .
RUN npm i node-fetch node-cache @navikt/nav-dekoratoren-moduler jsdom
COPY server.js server.js
COPY build build/

CMD ["node", "./server.js"]