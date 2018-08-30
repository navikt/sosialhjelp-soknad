FROM openjdk:8-jdk-alpine

RUN wget -O /dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64
RUN chmod +x /dumb-init

RUN apk add --no-cache curl

ENV LC_ALL="no_NB.UTF-8"
ENV LANG="no_NB.UTF-8"
ENV TZ="Europe/Oslo"

# Please see https://blogs.oracle.com/java-platform-group/java-se-support-for-docker-cpu-and-memory-limits
ENV DEFAULT_JAVA_OPTS="-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap"

WORKDIR /app

EXPOSE 8080

COPY web/target/appassembler /app/

ENTRYPOINT ["/dumb-init"]
CMD /app/bin/app
