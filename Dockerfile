FROM navikt/java:8

WORKDIR /app

COPY web/target/appassembler /app/

ENTRYPOINT /app/bin/app
