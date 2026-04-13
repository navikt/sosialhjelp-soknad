FROM gcr.io/distroless/nodejs24-debian12 AS runtime

WORKDIR /app

ARG DIGISOS_ENV

ENV NEXT_PUBLIC_DIGISOS_ENV=${DIGISOS_ENV}
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production
ENV TZ="Europe/Oslo"
ENV CREATE_MESSAGES_DECLARATION=skip

COPY package.json /app/
COPY src/next-logger.config.js /app/
COPY .env.production /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 8080

CMD ["server.js"]
