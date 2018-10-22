
# SporsmalFaktum komponent

Wrap spørsmålene i SporsmalFaktum for å få satt faktum og valideringsfunksjon.

Eksempel:
 
```jsx harmony
<SporsmalFaktum
    faktumKey="kontakt.system.oppholdsadresse.valg"
    validerFunc={[(value) => {
        if (value == null) {
            return ValideringActionKey.PAKREVD;
        }
        return null;
    }]}
>
```
