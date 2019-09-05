#!/usr/bin/env bash

# Run `heroku labs:enable runtime-dyno-metadata -a $APP_NAME` to make $HEROKU_APP_NAME available
if [[ -n "$HEROKU_APP_NAME" && "$HEROKU_APP_NAME" != "sosialhjelp-soknad" ]]; then
    sed -i 's!sosialhjelp/soknad!'$HEROKU_APP_NAME'/sosialhjelp/soknad!g' index.html
fi
