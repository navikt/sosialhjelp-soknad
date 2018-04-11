#!/bin/bash

function determine_deploy() {
    nais_deploy_environment="";

    IFS=$'\n';
    for line in $(git log --first-parent --pretty=oneline -10)
    do
        IFS=' ';
        single_commit=($line)
        IFS=$'\n';
        if ! git show-ref --tags -d | grep --quiet "${single_commit[0]}"
        then
            if echo "$line" | grep '\[deploy [tq][1-9]\]'
            then
                unset IFS;
                nais_deploy_environment=$(echo "$line" | sed 's/^.*\[deploy \([tq][1-9]\)\].*$/\1/');
                return;
            fi
        else
            unset IFS;
            return;
        fi
    done

    unset IFS;
    return;
}

determine_deploy
if [[ "${nais_deploy_environment}" != "" ]]
then
    echo "Deploying version ${releaseVersion} on ${nais_deploy_environment} with user ${domenebrukernavn}";
    deploy_result=$(curl -s -S -k --output /dev/stderr --write-out "%{http_code}" -d '{"application": "soknadsosialhjelp","version": "'${releaseVersion}'", "fasitEnvironment": "'${nais_deploy_environment}'", "zone": "sbs", "namespace": "'${nais_deploy_environment}'", "fasitUsername": "'${domenebrukernavn}'", "fasitPassword": "'${domenepassord//\"/\\\"}'", "manifesturl": "https://repo.adeo.no/repository/raw/nais/soknadsosialhjelp/'${releaseVersion}'/nais.yaml"}' https://daemon.nais.oera-q.local/deploy)
    if [[ "${deploy_result}" != "200" ]]
    then
        echo "Deployment failed!";
        exit 1;
    fi
fi

