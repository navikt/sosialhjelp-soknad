# Søknadsdata

## Konvensjoner

-   _sti_ - En sti er en streng som både referer til sti i url som brukes mot server, og
    sti i hierarkiet med søknadsdata i redux' state.
-   _faktumKey_ - En faktumKey er en streng som både brukes som språknøkkel, og id i listen over
    valideringsfeil.

## Reactkomponenter

Komponenter som trenger å tilgang til å lese og skrive søknadsdata til server, benytter samme propTypes,  
`SoknadsdataContainerProps`, og `connectSoknadsdataContainer()` i stedet for vanlig `connect()`:

```typescript jsx
class Begrunnelse extends React.Component<SoknadsdataContainerProps, {}> {
	render() {<div/}
}

export default connectSoknadsdataContainer(injectIntl(Begrunnelse));
```

Dette gir komponenten tilgang til å gjøre GET og PUT kall mot søknadsdata API'et til backenden.
Kall mot `this.props.hentSoknadsdata(1001, 'familie/sivilstatus')`, gjør at the dispatches et redux event,
gjøres et fetch kall mot url sti `1001/familie/sivilstatus'` og dataene som kommer fra server legges
på redux' state under `soknadsdata.familie.sivilstatus`.

```typescript jsx
this.props.hentSoknadsdata(brukerBehandlingId, urlPath);
this.props.lagreSoknadsdata(brukerBehandlingId, urlPath, data);
```

Alle søknadsdata ligger på redux' state:

```typescript jsx
this.props.soknadsdata;
```

Søknadsdata på redux' state kan oppdateres slik:

```typescript jsx
this.props.oppdaterSoknadsdataSti(stringSoknadsSti.TELEFONNUMMER, telefonnummer);
```

Feilmeldinger legges på redux' state med:

```typescript jsx
const feilkode: ValideringActionKey = maksLengde(inputVerdi, MAX_CHARS);
this.props.setValideringsfeil(feilkode, faktumKey);
```

## Endring av server API

Hvis server API'et endrer seg, så må typescript definisjonene oppdateres. For eksempel er navnet på feltene
og datatypene som returneres fra serverkallet `GET {id}/begrunnelse`, spesifisert i filen `begrunnelseTypes.ts`.
I filen `SoknadsdataReducer.ts` er det definert hvilke REST kall som er lovlige.
