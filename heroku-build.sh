#!/usr/bin/env bash
# Denne filen må ha LF som line separator.

# Bruk: "./heroku-build.sh feature-navn"

# Default verdier
APP_NAME=$1
BRANCH_NAME=$(git branch | grep ^\* | cut -d' ' -f2)

if [[ -z "$APP_NAME" ]]; then
    # FIXME: Don't die if app name cannot be set from repo or arguments
    heroku_repo=$(git remote get-url heroku)
    APP_NAME=$(echo -n ${heroku_repo} | sed -E 's#^.*/(.*)\.git$#\1#')
fi

if [[ ! $(git remote | grep ${APP_NAME}) ]]; then
    git remote add ${APP_NAME} https://git.heroku.com/${APP_NAME}.git
fi


heroku stack:set container -a ${APP_NAME}
heroku labs:enable runtime-dyno-metadata -a ${APP_NAME}
# Hvis appen finnes og er bygd fra en annen branch, kan det være nødvendig med "-f/--force"
git push ${APP_NAME} ${BRANCH_NAME}:master
