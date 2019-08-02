FROM node as node-builder
ADD / /source
WORKDIR /source
ENV CI=true
RUN npm ci && npm run test && npm run build

FROM navikt/pus-decorator
ENV APPLICATION_NAME=soknadsosialhjelp
ENV HEADER_TYPE=WITH_MENU
ENV FOOTER_TYPE=WITHOUT_ALPHABET
ENV CONTEXT_PATH=/soknadsosialhjelp/
COPY --from=node-builder /source/build /app
