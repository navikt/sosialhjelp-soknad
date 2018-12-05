FROM navikt/java:8

WORKDIR /app

COPY /web/target/soknadsosialhjelp-web-2.0-SNAPSHOT.jar /app/soknadsosialhjelp-web-2.0-SNAPSHOT.jar

CMD java -jar /app/soknadsosialhjelp-web-2.0-SNAPSHOT.jar