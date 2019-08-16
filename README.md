Søknadsosialhjelp
================

Frontend for søknad om sosialhjelp. 

## Kjøring lokalt mot lokal utviklingsbackend

Kjører mot (mock backend)

* `npm install` 
* `npm start` - Starter webpack server og mock backend utviklet i node express.
* `npm test` - Kjør enhetstestene
* `npm test -- -u` - Oppdatert snapshotfilen som snapshottestene tester mot for lokal utvikling. 

I stedet for npm er det mulig å bruke yarn.
 
 ## Kjøring mot sendsoknad backend i stedet for mock backend
 
 * `cd soknadsosialhjelp-tekster && mvn clean install -Ddev` - bygger tekstfilene.
 * Start no.nav.sbl.dialogarena.StartSoknadJetty fra IntelliJ - Starter reel backend
 * Legg inn url til sendsokand i nav-soknad/utils/rest-utils.ts:
 
 ```javascript
    export function getApiBaseUrl(): string {
        if (erDev()) {
        	// Kjør mot lokal sendsoknad
            // return "http://localhost:8189/sendsoknad/";
            return "http://localhost:3001/";
        }
        return kjorerJetty() ? "http://127.0.0.1:8181/sendsoknad/" : "/sendsoknad/";
    }
 ```

 * Endre linjen environment-test.properties fra true til false for å laste ned kodeverk på xml format:
 ```
    start.kodeverk.withmock=true
 ```
 * `cd soknadsosialhjelp/web/src/frontend && npm start`

 * Åpne `http://localhost:3000/soknadsosialhjelp/informasjon` i nettleseren.

 ## Deploy til testmiljø på Heroku

 Forutsetter at [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) er installert og at man har opprettet
 og autentisert mot egen Heroku-konto:
 
 ```bash
 heroku auth:login
 heroku container:login
```

 Forutsetter at [Docker](https://docs.docker.com/docker-for-mac/install/) er installert:
 For å opprette applikasjon og deploye til Heroku:

 ```bash
 heroku create en-kul-ny-feature
 git add .
 git commit -m "[WIP]"

 ./heroku-build.sh -a=en-kul-ny-feature
 ```
  
 Hvis applikasjonen allerede eksisterer i Heroku, kan app name angis ved deploy:
 
 ```bash
 ./heroku-build.sh --app-name=en-kul-ny-feature
 ``` 
 
 Eventuelt kan applikasjonen settes som en git remote:
 
 ```bash
 git remote add heroku https://git.heroku.com/en-kul-ny-feature.git
 ```
 
 Etter deploy vil applikasjonen være tilgjengelig på `https://www.digisos-test.com/en-kul-ny-feature/soknadsosialhjelp/`.
 (Forutsetter at backend `en-kul-ny-feature-server` er deployet.)
 
 ## Tekster
 
 Tekstene ligger i repoet `sosialhjelp-soknad-server` med felles byggejobb på `cisbl.devillo.no`. Tekstendringer blir automatisk
 deployet til miljø som er konfigurert opp i byggejobben. I tillegg har man en mocket tekstfil for lokal utvikling, men endringer
 gjort i denne må synces til teksterrepoet for å bli brukt i miljøene.
 
# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:
* https://github.com/orgs/navikt/teams/digisos

## For Kommunalt ansatte og leverandører av soisalsystemer
* Be om tilgang til https://digisos-nav-it.slack.com/
* Slack kanal #general

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #digisos.
