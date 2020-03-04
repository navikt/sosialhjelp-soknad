FROM navikt/pus-decorator
ENV APPLICATION_NAME=sosialhjelp-soknad
ENV HEADER_TYPE=WITH_MENU
ENV FOOTER_TYPE=WITHOUT_ALPHABET
ENV CONTEXT_PATH=/sosialhjelp/soknad/
COPY /build /app
