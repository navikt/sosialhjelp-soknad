import {Soknadsdata} from "../redux/soknadsdata/soknadsdataReducer";
import {NavEnhet} from "../skjema/personopplysninger/adresse/AdresseTypes";

function finnSoknadsMottaker(soknadsdata: Soknadsdata): NavEnhet | null {
	let valgtNavEnhet: NavEnhet | null = null;
	if (soknadsdata.personalia.navEnheter){
		valgtNavEnhet = soknadsdata.personalia.navEnhet
	}
	return valgtNavEnhet;
}

function finnValgtEnhetsNavn(soknadsdata: Soknadsdata): string {
	const soknadsmottaker = finnSoknadsMottaker(soknadsdata);
	if (soknadsmottaker !== null) {
		return soknadsmottaker.enhetsnavn + ", " + soknadsmottaker.kommunenavn + " kommune";
	}
	return "";
}

export {
	finnValgtEnhetsNavn
};
