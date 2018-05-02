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

def deployAppNais(app, version, environment, zone, namespace, callback) {
    // Generert:
    def environmentIds = [
        "d1": "18650",
        "d2": "18651",
        "d3": "18652",
        "d4": "18653",
        "d230": "18656",
        "d231": "18657",
        "d234": "18658",
        "dx": "18654",
        "dy": "18655",
        "dz": "21751",
        "dv": "21752",
        "o1": "19150",
        "p": "17658",
        "q0": "16824",
        "q1": "16825",
        "q2": "16652",
        "q3": "16653",
        "q4": "16647",
        "q5": "16649",
        "q6": "16648",
        "q7": "16794",
        "q8": "16651",
        "q9": "16654",
        "q10": "18673",
        "q11": "20250",
        "q230": "16771",
        "q231": "16772",
        "q234": "16773",
        "q411": "16774",
        "q412": "16775",
        "q415": "16814",
        "q469": "16776",
        "qa": "16768",
        "qb": "16769",
        "qc": "16770",
        "qx": "16815",
        "t0": "16556",
        "t1": "16557",
        "t2": "16558",
        "t3": "16559",
        "t4": "16560",
        "t5": "16561",
        "t6": "16562",
        "t7": "16563",
        "t8": "16564",
        "t9": "16565",
        "t10": "16566",
        "t11": "16567",
        "t12": "16763",
        "t13": "21750",
        "t411": "16765",
        "t412": "16766",
        "t415": "16813",
        "t469": "16767",
        "ta": "16764",
        "tpr-u1": "16667",
        "tx": "17550",
        "ty": "17551",
        "u1": "16657",
        "u2": "16658",
        "u3": "16659",
        "u4": "16660",
        "u5": "16661",
        "u6": "16662",
        "u7": "16663",
        "u8": "16664",
        "u9": "16665",
        "u10": "16666",
        "u11": "19151",
        "u12": "16795",
        "u13": "16796",
        "u14": "16797",
        "u15": "16798",
        "u16": "16799",
        "u17": "19152",
        "u18": "16800",
        "u19": "16801",
        "u21": "22152",
        "u22": "16802",
        "u23": "18008",
        "ussi1": "22579",
        "ci": "23369"
    ]
    def zoneIds = [
        "fss": "23451",
        "sbs": "23452"
    ]
    def environmentId = environmentIds[environment]
    def zoneId = zoneIds[zone]

    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'domenebruker', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
        def postBody = [
            fields: [
                project          : [key: 'DEPLOY'],
                issuetype        : [id: '14302'],
                customfield_14811: [id: environmentId, value: environmentId],
                customfield_14812: "${app}:${version}",
                customfield_19413: namespace,
                customfield_19610: [id: zoneId, value: zoneId],
                customfield_17410: callback,
                summary          : "Automatisk deploy"
            ]
        ]

        def postBodyString = groovy.json.JsonOutput.toJson(postBody)
        def base64encoded = "${env.USERNAME}:${env.PASSWORD}".bytes.encodeBase64().toString()

        def response = httpRequest (
            url: 'https://jira.adeo.no/rest/api/2/issue/',
            customHeaders: [[name: "Authorization", value: "Basic ${base64encoded}"]],
            consoleLogResponseBody: true,
            contentType: 'APPLICATION_JSON',
            httpMode: 'POST',
            requestBody: postBodyString
        )
        def slurper = new groovy.json.JsonSlurperClassic()
        return slurper.parseText(response.content);
    }
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
                        notifyFailed("Git tag feilet", e, env.BUILD_URL)
                    }
                }
            }
        }
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
    }

    if (deployToNaisEnvironment != "") {
//        stage("Deploy Nais") {
//            try {
//                echo "Deploying to ${deployToNaisEnvironment}."
//                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'domenebruker', usernameVariable: 'domenebrukernavn', passwordVariable: 'domenepassord']]) {
//                    sh "./nais_deploy.sh '${application}' '${deployToNaisEnvironment}' '${releaseVersion}' '${domenebrukernavn}' '${domenepassord}'"
//                }
//            } catch (Exception e) {
//                notifyFailed("Deploy Nais Failed", e, env.BUILD_URL)
//            }
//        }
        def callback = "${env.BUILD_URL}input/Deploy/"
        deployAppNais(application, releaseVersion, deployToNaisEnvironment, "sbs", deployToNaisEnvironment, callback) 
        timeout(time: 60, unit: 'MINUTES') {
            input id: 'deploy', message: "deployer ${deploy.key}, deploy OK?"
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
