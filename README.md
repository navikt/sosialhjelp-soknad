![](https://github.com/navikt/sosialhjelp-soknad/workflows/Build%20image/badge.svg?branch=master)
![](https://github.com/navikt/sosialhjelp-soknad/workflows/Deploy%20til%20dev/badge.svg?)
![](https://github.com/navikt/sosialhjelp-soknad/workflows/Deploy%20til%20prod-sbs/badge.svg?)

# Søknadsosialhjelp

Frontend for søknad om sosialhjelp.

## Kjøring lokalt mot lokal utviklingsbackend

Kjører mot (mock backend)

-   `npm install`
-   `npm start` - Starter webpack server og mock backend utviklet i node express.
-   `npm test` - Kjør enhetstestene
-   `npm test -- -u` - Oppdatert snapshotfilen som snapshottestene tester mot for lokal utvikling.

I stedet for npm er det mulig å bruke yarn.

### Mock login

Besøk http://localhost:3000/sosialhjelp/soknad/mock-login

## Manuell deploy til dev

Gjøres via Github Actions, se: https://github.com/navikt/sosialhjelp-soknad/actions/workflows/deploy_dev.yml

## Logge inn i dev-gcp med mock-alt

Da må appen gå via proxy. Url er https://digisos-gcp.dev.nav.no/sosialhjelp/soknad

## Tekster

Tekstene ligger i repoet `sosialhjelp-soknad-server` med felles byggejobb på `cisbl.devillo.no`. Tekstendringer blir automatisk
deployet til miljø som er konfigurert opp i byggejobben. I tillegg har man en mocket tekstfil for lokal utvikling, men endringer
gjort i denne må synces til teksterrepoet for å bli brukt i miljøene.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

-   https://github.com/orgs/navikt/teams/digisos

## For Kommunalt ansatte og leverandører av soisalsystemer

-   Be om tilgang til https://digisos-nav-it.slack.com/
-   Slack kanal #general

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #digisos.

## Kodestil

Dette prosjektet bruker formatering av kode med prettier. Det er lagt inn automatisk formatering av kode med en pre-commit hook.
Detaljer rundt dette ligger i `package.json`. Konfigurasjon av prettier ligger i `.prettierrc.js`.

Dersom du i tillegg ønsker å sette opp formatering av kode i IntelliJ slik at koden blir formatert før du committer kan det gjøres slik:

-   Installer Prettier plugin i IntelliJ
-   Trykk ⌥⇧⌘P for å formatere kode
-   Optional: Sette opp filewatcher og automatisk formatering. Se her `https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher`
