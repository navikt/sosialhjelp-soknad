import {Soknadsdata} from "../redux/soknadsdata/soknadsdataReducer";
import {NavEnhet} from "../skjema/personopplysninger/adresse/AdresseTypes";

function finnSoknadsMottaker(soknadsdata: Soknadsdata): NavEnhet | null {
    let valgtNavEnhet: NavEnhet | null = null;
    if (soknadsdata.personalia.navEnheter) {
        valgtNavEnhet = soknadsdata.personalia.navEnhet;
    }
    return valgtNavEnhet;
}

function finnBehandlendeKommunenavn(navEnhet: NavEnhet): string {
    if (navEnhet.behandlingsansvarlig !== null) {
        // hack for å legge på ordet kommune i visning kun hvis det ikke er lagt inn i navnet
        let behandlingsansvarlig = navEnhet.behandlingsansvarlig.includes("kommune")
            ? navEnhet.behandlingsansvarlig
            : navEnhet.behandlingsansvarlig + " kommune";
        return behandlingsansvarlig;
    }
    return navEnhet.kommunenavn + " kommune";
}

function finnValgtEnhetsNavn(soknadsdata: Soknadsdata): string {
    const soknadsmottaker = finnSoknadsMottaker(soknadsdata);
    if (soknadsmottaker !== null) {
        return soknadsmottaker.enhetsnavn + ", " + finnBehandlendeKommunenavn(soknadsmottaker);
    }
    return "";
}

export {finnValgtEnhetsNavn, finnBehandlendeKommunenavn};
