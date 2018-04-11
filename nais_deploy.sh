#!/bin/bash

application="$1"
nais_deploy_environment="$2"
releaseVersion="$3"
domenebrukernavn="$4"
domenepassord="$5"

echo "Deploying version ${releaseVersion} on ${nais_deploy_environment} with user ${domenebrukernavn}";
deploy_result=$(curl -s -S -k --output /dev/stderr --write-out "%{http_code}" -d '{"application": "'${application}'", "version": "'${releaseVersion}'", "fasitEnvironment": "'${nais_deploy_environment}'", "zone": "sbs", "namespace": "'${nais_deploy_environment}'", "fasitUsername": "'${domenebrukernavn}'", "fasitPassword": "'${domenepassord//\"/\\\"}'", "manifesturl": "https://repo.adeo.no/repository/raw/nais/'${application}'/'${releaseVersion}'/nais.yaml"}' https://daemon.nais.oera-q.local/deploy)
if [[ "${deploy_result}" != "200" ]]
then
    echo "Deployment failed!";
    exit 1;
else
    echo "Deployment succeeded.";
fi
