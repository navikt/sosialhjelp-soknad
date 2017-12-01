# Vedlegg

Vedleggskomponenten legges inn på skjemar hvor det skal være en last opp vedlegg knapp.


```
    <Vedlegg
        faktumKey={faktumstruktur.id}
        label={lastOppLonnslippTekst}
    />
```

Label er teskten som vises over knappen. 

Komponentene forutsetter at et REST kall er kjørt for å sjekke hvilke fakta hvor det forventes vedlegg. Det kan for eksempel gjøres slik.

```
componentDidMount() {
    this.props.hentVedleggsForventning(this.props.fakta);
}
```

## Feature toggling

Feature toggling gjøres på skjema, for eksempel slik: 

```
{ this.props.featureToggleBeOmLonnslippVedlegg && (
    <Vedlegg
        faktumKey={faktumstruktur.id}
        label={lastOppLonnslippTekst}
    />
) }

```

