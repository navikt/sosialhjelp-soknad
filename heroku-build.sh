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

function go_to_project_root {
    cd $PROJECT_ROOT
}

function go_to_frontend_root {
    cd "$PROJECT_ROOT/web/src/frontend"
}

function build_project {
    npm run build
}

function heroku_login {
    heroku auth:login
    heroku container:login
}

function deploy_to_heroku {
    #heroku container:push --recursive -a $APP_NAME
    git push heroku $APP_NAME
    heroku container:release web -a $APP_NAME
}

if [ -z "$APP_NAME" ]; then
    get_heroku_app_name
fi

go_to_frontend_root
build_project
go_to_project_root
deploy_to_heroku
