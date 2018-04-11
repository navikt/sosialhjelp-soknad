#!/bin/bash

function determine_deploy() {
    nais_deploy_environment="";

    git fetch -q origin 'refs/tags/*:refs/tags/*'

    IFS=$'\n';
    for line in $(git log --first-parent --pretty=oneline -10)
    do
        IFS=' ';
        single_commit=($line)
        IFS=$'\n';
        if ! git show-ref --tags -d | grep --quiet "${single_commit[0]}"
        then
            if echo "$line" | grep --quiet '\[deploy [tq][1-9]\]'
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
echo -n "${nais_deploy_environment}"
