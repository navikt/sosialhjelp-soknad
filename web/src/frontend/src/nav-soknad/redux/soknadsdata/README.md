# Søknadsdata

## Konvensjoner

 * *sti* - En sti er en streng som både referer til sti i url som brukes mot server, og 
 sti i hierarkiet med søknadsdata i redux' state.
 * *faktumKey* - En faktumKey er en streng som både brukes som språknøkkel, og id i listen over 
   valideringsfeil. 

## Reactkomponenter

Komponenter som trenger å tilgang til å lese og skrive søknadsdata til server, kan benytte 
`SoknadsdataContainerProps` og `connectSoknadsdataContainer` slik: 

```typescript jsx
class Begrunnelse extends React.Component<SoknadsdataContainerProps, {}> {
	render() {<div/}
}

export default connectSoknadsdataContainer(injectIntl(Begrunnelse));
```

Dette gir komponenten tilgang til å gjøre GET og PUT kall mot søknadsdata API'et til backenden.
Kall mot `this.props.hentSoknadsdata(id, 'familie/sivilstatus')`, gjør at the dispatches et redux event, 
gjøres et fetch kall mot url sti `id +'familie/sivilstatus'` og dataene som kommer fra server legges
på redux' state under `soknadsdata.familie.sivilstatus`.

```typescript jsx
this.props.hentSoknadsdata?: (brukerBehandlingId: string, urlPath: string) => void;
this.props.lagreSoknadsdata?: (brukerBehandlingId: string, urlPath: string, soknadsdata: SoknadsdataType) => void;
```

Alle søknadsdata ligger på redux' state:
```typescript jsx
this.props.soknadsdata?: null | Soknadsdata;
this.props.brukerBehandlingId?: string;
```

Søknadsdata på redux' state kan oppdateres slik:
```typescript jsx
this.props.oppdaterSoknadsdataState?: (soknadsdata: SoknadsdataActionVerdi) => void;
```

Feilmeldinger legges på redux' state med:
```typescript jsx
const feilkode: ValideringActionKey = maksLengde(inputVerdi, MAX_CHARS);
this.props.setValideringsfeil?: (feilkode: ValideringActionKey, faktumKey: string) => void;
```

## Endring av server API

Hvis server API'et endrer seg, så må typescript definisjonene oppdateres. For eksempel er navnet på feltene 
og datatypene som returneres fra serverkallet `GET {id}/begrunnelse`, spesifisert i filen `begrunnelseTypes.ts`.
I filen `SoknadsdataReducer.ts` er det definert hvilke REST kall som er lovlige.
