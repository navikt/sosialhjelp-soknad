#!groovy
@Library('common')
import common

def common = new common()

application = "soknadsosialhjelp"
author = "Unknown"
deploy = "Unknown"
releaseVersion = "Unknown"
isMasterBuild = (env.BRANCH_NAME == 'master')

project = "navikt"
repoName = "soknadsosialhjelp"
deployToNaisEnvironment = ""

def notifyFailed(reason, error, buildNr) {
    currentBuild.result = 'FAILED'

    notifyGithub("${project}", "${repoName}", "${commitHash}", 'failure', "Build #${buildNr} : ${reason}")

    throw error
}

def returnOk(message, buildNr) {
    echo "${message}"
    currentBuild.result = "SUCCESS"

    notifyGithub("${project}", "${repoName}", "${commitHash}", 'success', "Build #${buildNr}")
}

node("a34apvl00071") {
    properties([
            parameters([
                    string(name: 'DeployTilNexus', defaultValue: 'false'),
                    string(name: 'testurl', defaultValue: 'https://tjenester-t6.nav.no/soknadsosialhjelp/informasjon'),
            ])
    ])
    common.setupTools("maven3", "java8")

    stage('Checkout') {
        deleteDir()
        checkout scm
        commitHash = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()

        author = sh(returnStdout: true, script: 'git --no-pager show -s --format="%an <%ae>" HEAD').trim()
        notifyGithub("${project}", "${repoName}", "${commitHash}", 'pending', "Build #${env.BUILD_NUMBER} has started")

    }

    if (!isMasterBuild) {
        stage('Merge master') {
            sh "git merge origin/master"
        }
    }

    stage('Set version') {
        pom = readMavenPom file: 'pom.xml'
        def gitCommitNumber = sh(returnStdout: true, script: 'git rev-list --count HEAD').trim()
        def version = pom.version.replace("-SNAPSHOT", "")
        releaseVersion =  "${version}.${gitCommitNumber}.${currentBuild.number}"
        sh "mvn versions:set -DnewVersion=${releaseVersion}"
    }

    dir("web/src/frontend") {
        stage('Install') {
            try {
                sh "npm install"
            } catch (Exception e) {
                notifyFailed("Bygg feilet ved npm-install", e, env.BUILD_URL)
            }
        }

        stage('Test') {
            try {
                sh "CI=true npm run test"
            } catch (Exception e) {
                notifyFailed("Tester feilet", e, env.BUILD_URL)
            }
        }

        stage('Build') {
            try {
                sh "npm run build"
            } catch (Exception e) {
                notifyFailed("Bygging av JS feilet", e, env.BUILD_URL)
            }
        }

    }

    deployToNaisEnvironment = sh script: './determine_deploy.sh', returnStdout: true

    echo "${params.DeployTilNexus} deploy til nexus"
    if (isMasterBuild || params.DeployTilNexus == "true" || deployToNaisEnvironment != "") {
        stage('Deploy nexus') {
            try {
                // TODO: Vent med deploy til etter tag, men ta en install.
                sh "mvn -B deploy -DskipTests -P pipeline"
                currentBuild.description = "Version: ${releaseVersion}"
            } catch (Exception e) {
                notifyFailed("Deploy av artifakt til nexus feilet", e, env.BUILD_URL)
            }
        }
        stage("Git tag") {
            withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088']) {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'navikt-jenkins-github', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
                    try {
                        sh("git tag -a ${releaseVersion} -m ${releaseVersion} HEAD && git push --tags https://navikt-jenkins:${GIT_PASSWORD}@github.com/navikt/soknadsosialhjelp.git")
                    } catch (Exception e) {
                        notifyFailed("Git tag feilet, e, env.BUILD_URL)
                    }
                }
            }
        }
    }

    if (deployToNaisEnvironment != "") {
        stage("Build Docker and Update Nais") {
            try {
                dir("web/target/appassembler") {
                    sh "docker build . -t docker.adeo.no:5000/${application}:${releaseVersion}"
                    sh "docker push docker.adeo.no:5000/${application}:${releaseVersion}"
                }
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'nexusUploader', usernameVariable: 'nexusUploaderUsername', passwordVariable: 'nexusUploaderPassword']]) {
                    sh "curl -v -s -S --user \"${nexusUploaderUsername}:${nexusUploaderPassword}\" --upload-file web/nais.yaml \"https://repo.adeo.no/repository/raw/nais/${application}/${releaseVersion}/nais.yaml\""
                    sh "curl -v -s -S --user \"${nexusUploaderUsername}:${nexusUploaderPassword}\" --upload-file config/src/main/resources/openam/app-policies.xml \"https://repo.adeo.no/repository/raw/nais/${application}/${releaseVersion}/am/app-policies.xml\""
                    sh "curl -v -s -S --user \"${nexusUploaderUsername}:${nexusUploaderPassword}\" --upload-file config/src/main/resources/openam/not-enforced-urls.txt \"https://repo.adeo.no/repository/raw/nais/${application}/${releaseVersion}/am/not-enforced-urls.txt\""
                }
            } catch (Exception e) {
                notifyFailed("Build Docker and Update Nais Failed", e, env.BUILD_URL)
            }
        }
        stage("Deploy Nais") {
            try {
                echo "Deploying to ${deployToNaisEnvironment}."
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'domenebruker', usernameVariable: 'domenebrukernavn', passwordVariable: 'domenepassord']]) {
                    sh "./nais_deploy.sh '${application}' '${deployToNaisEnvironment}' '${releaseVersion}' '${domenebrukernavn}' '${domenepassord}'"
                }
            } catch (Exception e) {
                notifyFailed("Deploy Nais Failed", e, env.BUILD_URL)
            }
        }
    }
}

node {
    returnOk('All good', env.BUILD_URL)
}

def notifyGithub(owner, repo, sha, state, description) {
    def postBody = [
            state: "${state}",
            context: 'continuous-integration/jenkins',
            description: "${description}",
            target_url: "${env.BUILD_URL}"
    ]
    def postBodyString = groovy.json.JsonOutput.toJson(postBody)

    withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088']) {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'navikt-jenkins-github', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
            sh "curl 'https://api.github.com/repos/${owner}/${repo}/statuses/${sha}?access_token=$GIT_PASSWORD' \
                -H 'Content-Type: application/json' \
                -X POST \
                -d '${postBodyString}' \
                -k"
        }
    }
}
