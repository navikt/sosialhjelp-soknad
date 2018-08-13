Søknadsosialhjelp
================

Frontend for søknad om sosialhjelp. 

## Kjøring lokalt mot lokal utviklingsbackend

Kan gjøres av alle. Kjører mot (mock backend)

* `cd web/src/frontend` 
* `npm install` 
* `npm start` - Starter webpack server og mock backend utviklet i node express.
* `npm test` - Kjør enhetstestene
* `npm test -- -u` - Oppdatert snapshotfilen som snapshottestene tester mot for lokal utvikling. 

I stedet for npm er det mulig å bruke yarn.
 
## Kjøring via jetty

Forutsetter at man har tilgang til git repository tilgjengelig på internt nett hos NAV.

* `cd web/src/frontend` 
* `npm build` - bygger filer til buildmappen som videre blir kopiert til webappmappen
* `cd soknadsosialhjelp-tekster`
* `mvn clean install -Ddev` - bygger tekstfilene. Slår samme alle tekstfilene til lokal fil i temp folder.
* Start no.nav.sbl.dialogarena.StartSoknadJetty fra IntelliJ - Starter reel backend
* Start no.nav.sbl.soknadsosialhjelp.StartJetty fra IntelliJ - Starter frontend server
* Åpne `http://localhost:8189/soknadsosialhjelp/informasjon` i nettleser
 
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

 * Åpne `http://localhost:3000/soknadsosialhjelp/informasjon` i nettelseren
     
 ## Tekster
 
 Tekstene ligger i repoert `soknadsosialhjelp-tekster` med felles byggejobb på `cisbl.devillo.no`. Tekstendringer blir automatisk
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
