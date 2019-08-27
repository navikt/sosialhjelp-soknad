#!/usr/bin/env bash

if [[ "$HEROKU_APP_NAME" != "sosialhjelp-soknad" ]]; then
    sed -i 's!soknadsosialhjelp!'$HEROKU_APP_NAME'/soknadsosialhjelp!g' index.html
fi
