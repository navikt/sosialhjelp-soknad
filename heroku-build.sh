#!/bin/bash
# Denne filen må ha LF som line separator.

# Stop scriptet om en kommando feiler
set -e

# Usage string
usage="Script som bygger prosjektet og deployer på Heroku

Bruk:
./$(basename "$0") OPTIONS

Gyldige OPTIONS:
    -h  | --help        - printer denne hjelpeteksten
"

# Default verdier
PROJECT_ROOT="$( cd "$(dirname "${BASH_SOURCE[0]}" )" && pwd )"
APP_NAME=""
BRANCH_NAME=$(git branch | grep ^\* | cut -d' ' -f2)

# Hent ut argumenter
for arg in "$@"
do
case $arg in
    -h|--help)
    echo "$usage" >&2
    exit 1
    ;;
    -a=*|--app-name=*)
    APP_NAME="${arg#*=}"
    shift
    ;;
    *) # ukjent argument
    printf "Ukjent argument: %s\n" "$1" >&2
    echo ""
    echo "$usage" >&2
    exit 1
    ;;
esac
done

function get_heroku_app_name {
    # FIXME: Don't die if app name cannot be set from repo or arguments
    heroku_repo=$(git remote get-url heroku)
    APP_NAME=$(echo -n $heroku_repo | sed -E 's#^.*/(.*)\.git$#\1#')
}

function deploy_to_heroku {
    heroku stack:set container -a $APP_NAME
    heroku labs:enable runtime-dyno-metadata -a $APP_NAME
    git push $APP_NAME $BRANCH_NAME:master
}

if [ -z "$APP_NAME" ]; then
    get_heroku_app_name
fi

if [[ ! $(git remote | grep $APP_NAME) ]]; then
    git remote add $APP_NAME https://git.heroku.com/$APP_NAME.git
fi

deploy_to_heroku
