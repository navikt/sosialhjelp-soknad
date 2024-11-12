![](https://github.com/navikt/sosialhjelp-soknad/workflows/Build%20image/badge.svg?branch=master)
![](https://github.com/navikt/sosialhjelp-soknad/workflows/Deploy%20til%20dev/badge.svg?)
![](https://github.com/navikt/sosialhjelp-soknad/workflows/Deploy%20til%20prod-sbs/badge.svg?)

# Søknadsosialhjelp

Frontend for søknad om sosialhjelp.

## Kjøring lokalt mot lokal utviklingsbackend

### Miljøvariabler

```dotenv
NEXT_PUBLIC_DIGISOS_ENV="localhost"
```

Miljøvariabelen NEXT_PUBLIC_DIGISOS_ENV velger konfigurasjonsprofiler.

Gyldige profiler er "localhost" til lokal utvikling, "mock" til mock-ekstern,
"dev-sbs" til dev og "prod-sbs" til prod.

Konfigurasjonsprofiler og feature-toggles utledes fra disse modi i src/lib/config.ts.

### Bakenforliggende tjenester

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
-   Login på npm med `npm login --auth-type=legacy --scope=@navikt --registry=https://npm.pkg.github.com` og benytt github brukernavn, epost og tokenet du nettopp genererte

### Frontend

```shell
npm --include=dev install # Hent avhengigheter
npm run fetch-api # Hent OpenAPI definition for soknad-api fra mock-miljø og lagrer i soknad-api.json
npm run orval # Genererer API-kode
npm run dev # Bygger less og starter dev-server
npm test # Kjør enhetstestene
```

## Oppgradering av avhengigheter

En snarvei for oppgradering av avhengigheter er:

```shell
npm run checkUpdates
```

Eventuelle unntak (f. eks. når man er låst til en tidligere major) kan konfigureres i `.ncurc.js`.

## Bygg og deploy

Image bygges vha Github Actions,

-   dev: https://github.com/navikt/sosialhjelp-soknad/actions/workflows/build.yml
-   prod: https://github.com/navikt/sosialhjelp-soknad/actions/workflows/build_prod_image.yml

Siden appen ikke kjører på nais lengre, se [ikke-nais deploy](https://teamdigisos.intern.nav.no/docs/utviklerdokumentasjon/ikke-nais%20deploy) for informasjon om deploy.

### Manuell deploy til dev (NB: gjelder kun dev-gcp)

Deploy til dev-gcp gjøres via Github Actions, se: https://github.com/navikt/sosialhjelp-soknad/actions/workflows/deploy_dev.yml

## Logge inn i dev-gcp med mock-alt

Da må appen gå via proxy. Url er https://digisos.ekstern.dev.nav.no/sosialhjelp/soknad

## Wonderwall

Vi bruker en litt custom Wonderwall-setup for at scope for KS og Husbanken skal være inkludert.

### Oppsett

Først, bekreft at en nøkkel eksisterer for kryptering av Wonderwall-sessions i Redis:

```sh
# Denne er trygg å kjøre uansett, ettersom den vil feile om secret alt eksisterer
kubectl create secret generic sosialhjelp-soknad-wonderwall-sessions --from-literal=WONDERWALL_ENCRYPTION_KEY=$(openssl rand -base64 32)
```

Deretter, sørg for at en passende IDPorten-klient er provisjonert via NAIS:

```shell
kubectl apply -f wonderwall/idportenclient.yml
```

Dette vil føre til opprettelsen av en secret med miljøvariabler for IDporten:
`IDPORTEN_CLIENT_ID`, `IDPORTEN_CLIENT_JWK`, `IDPORTEN_ISSUER, IDPORTEN_JWKS_URI`, `IDPORTEN_REDIRECT_URI`, `IDPORTEN_TOKEN_ENDPOINT` og `IDPORTEN_WELL_KNOWN_URL`.

Nå kan Wonderwall provisjoneres:

```shell
kubectl apply -f wonderwall/wonderwall.yml
```

Notér at i påvente av mer offisiell støtte for ekstra scopes i Wonderwall, er det mulig at `wonderwall.yml` kan måtte tilpasses for det aktuelle miljøet (ingress, env/WONDERWALL_INGRESS og accesspolicy/outbound).

Merk også at accesspolicy må settes på innkommende side i frontend.

Når disse ressursene først er opprettet og konfigurert, trengs ingen fornying for senere deploys.

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

-   https://github.com/orgs/navikt/teams/digisos

### For Nav-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team_digisos.

## Hvordan komme i gang

[Felles dokumentasjon for våre frontend apper](https://teamdigisos.intern.nav.no/docs/utviklerdokumentasjon/kom%20igang%20med%20utvikling#frontend)

### Kodestil

Dette prosjektet bruker formatering av kode med prettier.
Det er lagt inn automatisk formatering av kode med en pre-commit hook.
Detaljer rundt dette ligger i `package.json`. Konfigurasjon av prettier ligger i `.prettierrc.mjs`.

Dersom du i tillegg ønsker å sette opp formatering av kode i IntelliJ slik at koden blir formatert før du committer kan det gjøres slik:

-   Installer Prettier plugin i IntelliJ
-   Trykk ⌥⇧⌘P for å formatere kode
-   Optional: Sette opp filewatcher og automatisk formatering. Se her `https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher`
