FROM gcr.io/distroless/nodejs20-debian11 AS runtime

ARG DIGISOS_ENV

ENV NEXT_PUBLIC_DIGISOS_ENV=${DIGISOS_ENV}

WORKDIR /app

COPY src/next-logger.config.js /app/
COPY build/standalone /app/
COPY public /app/public/

EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080
ENV NODE_OPTIONS='-r @navikt/next-logger'

CMD ["server.js"]
