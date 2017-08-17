#!groovy
@Library('common')
import common

def common = new common()

application = "soknadsosialhjelp"
author = "Unknown"
deploy = "Unknown"
releaseVersion = "Unknown"
isMasterBuild = (env.BRANCH_NAME == 'master')

def project = "navikt"
def repoName = "soknadsosialhjelp"

def notifyFailed(reason, error) {
    currentBuild.result = 'FAILED'
//    step([$class: 'StashNotifier'])

    throw error
}

def returnOk(message) {
    echo "${message}"
    currentBuild.result = "SUCCESS"
    step([$class: 'StashNotifier'])
}

node {
    properties([
            parameters([
                    string(name: 'DeployTilNexus', defaultValue: 'false'),
                    string(name: 'testurl', defaultValue: 'http://tjenester-t1.nav.no/veivisersosialhjelp')
            ])
    ])
    common.setupTools("maven3", "java8")

    stage('Checkout') {
        deleteDir()
        checkout scm

        author = sh(returnStdout: true, script: 'git --no-pager show -s --format="%an <%ae>" HEAD').trim()
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
                notifyFailed("Bygg feilet ved npm-install", e)
            }
        }

        stage('Test') {
            try {
                sh "CI=true npm run test"
            } catch (Exception e) {
                notifyFailed("Tester feilet", e)
            }
        }

        stage('Build') {
            try {
                sh "npm run build"
            } catch (Exception e) {
                notifyFailed("Bygging av JS feilet", e)
            }
        }
    }

    echo "${params.DeployTilNexus} deploy til nexus"
    if (isMasterBuild || params.DeployTilNexus == "true") {
        stage('Deploy nexus') {
            try {
                sh "mvn -B deploy -DskipTests -P pipeline"
                currentBuild.description = "Version: ${releaseVersion}"
                withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088']) {
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'navikt-jenkins-github', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
                        sh("git tag -a ${releaseVersion} -m ${releaseVersion} HEAD && git push --tags https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/navikt/soknadsosialhjelp.git master")
                    }
                }
            } catch (Exception e) {
                notifyFailed("Deploy av artifakt til nexus feilet", e)
            }
        }
    }
}

if (isMasterBuild) {
    stage("Deploy app til t1") {
        callback = "${env.BUILD_URL}input/Deploy/"
        node {
            deploy = common.deployApp(application, releaseVersion, "t1", callback, author).key
        }

        try {
            timeout(time: 30, unit: 'MINUTES') {
                input id: 'deploy', message: "deployer ${deploy}, deploy OK?"
            }
        } catch (Exception e) {
            msg = "Deploy feilet [" + deploy + "](https://jira.adeo.no/browse/" + deploy + ")"
            node {
                notifyFailed(msg, e)
            }
        }
    }
    stage("Deploy app til q1") {
        callback = "${env.BUILD_URL}input/Deploy/"
        node {
            deploy = common.deployApp(application, releaseVersion, "q1", callback, author).key
        }

        try {
            timeout(time: 30, unit: 'MINUTES') {
                input id: 'deploy', message: "deployer ${deploy}, deploy OK?"
            }
        } catch (Exception e) {
            msg = "Deploy feilet [" + deploy + "](https://jira.adeo.no/browse/" + deploy + ")"
            node {
                notifyFailed(msg, e)
            }
        }
    }
}

if (isMasterBuild) {
    stage('Integrasjonstester') {
        node {
            try {
                dir('web/src/frontend') {
                    sh("node nightwatch.js --env phantomjs --url ${testurl}")
                }
            } catch (Exception e) {
                notifyFailed('Integrasjonstester feilet', e)
                step([$class: 'JUnitResultArchiver', testResults: '**/target/surefire-reports/*.int.xml'])
            }
        }
    }
}

node {
    returnOk('All good')
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
        withCredentials([string(credentialsId: 'navikt-jenkins-oauthtoken', variable: 'ACCESS_TOKEN')]) {
            sh "curl 'https://api.github.com/repos/${owner}/${repo}/statuses/${sha}?access_token=$ACCESS_TOKEN' \
                -H 'Content-Type: application/json' \
                -X POST \
                -d '${postBodyString}'"
        }
    }
}