#!/usr/bin/env bash

if [[ "$HEROKU_APP_NAME" != "sosialhjelp-soknad" ]]; then
    sed -i 's!sosialhjelp!'$HEROKU_APP_NAME'/sosialhjelp!g' index.html
fi
