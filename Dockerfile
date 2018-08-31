FROM navikt/java:8

WORKDIR /app

COPY web/target/appassembler /app/

CMD ["/app/bin/app"]
