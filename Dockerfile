FROM navikt/java:8

WORKDIR /app

COPY /web/target/soknadsosialhjelp.jar /app/app.jar
