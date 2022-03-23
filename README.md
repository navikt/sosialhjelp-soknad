![](https://github.com/navikt/sosialhjelp-soknad/workflows/Build%20image/badge.svg?branch=master)
![](https://github.com/navikt/sosialhjelp-soknad/workflows/Deploy%20til%20dev/badge.svg?)
![](https://github.com/navikt/sosialhjelp-soknad/workflows/Deploy%20til%20prod-sbs/badge.svg?)

# Søknadsosialhjelp

Frontend for søknad om sosialhjelp.

## Todo for refaktorering

-   Flytte inn enhetstestene igjen
-   Skrive ny Sporsmal som bruker underklasser, men ikke CSS-klassenavn, faktum-i18n el
-   Innarbeide/teste ny Sporsmal i Bosituasjon
-   Utvide useSWR-hooks for å skrive tilbake til backend

## Kjøring lokalt mot lokal utviklingsbackend

### Miljøvariabler

Vi bruker env-variabler for å styre en del URLer i appen, disse kan overstyres med å legge følgende inn i en `.env.local`.

```dotenv
REACT_APP_ENVIRONMENT="localhost"
REACT_APP_API_BASE_URL="http://localhost:8181/sosialhjelp/soknad-api/"
REACT_APP_API_BASE_URL_WITH_ACCESS_TOKEN="http://localhost:8181/sosialhjelp/soknad-api/"
REACT_APP_INNSYN_URL="http://localhost:3000/sosialhjelp/innsyn/"
REACT_APP_DITT_NAV_URL="https://www.nav.no/person/dittnav/"
```

### Backend

Eksempel ihht [«Oppsett av lokalt utviklingsmiljø»](https://github.com/navikt/digisos/blob/main/oppsett-devmiljo.md#docker-compose--mock-milj%C3%B8) i digisos-repoet:

```shell
cd ../digisos-docker-compose
docker-compose up \
                  sosialhjelp-mock-alt \
                  sosialhjelp-mock-alt-api \
                  sosialhjelp-soknad-api
```

### Github package registry

Vi bruker Github sitt package registry for npm pakker, siden flere av Nav sine pakker kun blir publisert her.

For å kunne kjøre `npm install` lokalt må du logge inn mot Github package registry:

-   Lag/forny access token med repo og read:packages rettigheter i github ( under developer settings). husk enable sso
-   Login på npm med `npm login --scope=@navikt --registry=https://npm.pkg.github.com` og benytt github brukernavn, epost og tokenet du nettopp genererte

### Frontend

```shell
npm install # Hent avhengigheter
npm run dev # Bygger less og starter dev-server
npm test # Kjør enhetstestene
```

## Manuell deploy til dev

Gjøres via Github Actions, se: https://github.com/navikt/sosialhjelp-soknad/actions/workflows/deploy_dev.yml

## Logge inn i dev-gcp med mock-alt

Da må appen gå via proxy. Url er https://digisos-gcp.dev.nav.no/sosialhjelp/soknad

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

-   https://github.com/orgs/navikt/teams/digisos

### For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #digisos.

## Kodestil

Dette prosjektet bruker formatering av kode med prettier.
Det er lagt inn automatisk formatering av kode med en pre-commit hook.
Detaljer rundt dette ligger i `package.json`. Konfigurasjon av prettier ligger i `.prettierrc.js`.

Dersom du i tillegg ønsker å sette opp formatering av kode i IntelliJ slik at koden blir formatert før du committer kan det gjøres slik:

-   Installer Prettier plugin i IntelliJ
-   Trykk ⌥⇧⌘P for å formatere kode
-   Optional: Sette opp filewatcher og automatisk formatering. Se her `https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher`
