# Søknadsdata

## Konvensjoner

-   _sti_ - En sti er en streng som både referer til sti i url som brukes mot server, og
    sti i hierarkiet med søknadsdata i redux' state.
-   _faktumKey_ - En faktumKey er en streng som både brukes som språknøkkel, og id i listen over
    valideringsfeil.

## Reactkomponenter

Alle søknadsdata ligger på redux' state:

```typescript jsx
state.soknadsdata;
```

Søknadsdata på redux' state kan oppdateres slik:

```typescript jsx
dispatch(oppdaterSoknadsdataSti(stringSoknadsSti.TELEFONNUMMER, telefonnummer));
```

Feilmeldinger legges på redux' state med:

```typescript jsx
const feilkode: ValideringActionKey = maksLengde(inputVerdi, MAX_CHARS);
dispatch(setValideringsfeil(feilkode, faktumKey));
```
