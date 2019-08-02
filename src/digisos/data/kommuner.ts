import {Soknadsdata} from "../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import {NavEnhet} from "../skjema/personopplysninger/adresse/AdresseTypes";

function finnSoknadsMottaker(soknadsdata: Soknadsdata): NavEnhet | undefined {
	let valgtNavEnhet: NavEnhet | undefined = undefined;
	if (soknadsdata.personalia.navEnheter){
		valgtNavEnhet = soknadsdata.personalia.navEnheter.find((navenhet: NavEnhet) => navenhet.valgt);
	}
	return valgtNavEnhet;
}

function finnValgtEnhetsNavn(soknadsdata: Soknadsdata): string {
	const soknadsmottaker = finnSoknadsMottaker(soknadsdata);
	if (typeof soknadsmottaker !== 'undefined') {
		return soknadsmottaker.enhetsnavn + ", " + soknadsmottaker.kommunenavn + " kommune";
	}
	return "";
}

export {
	finnValgtEnhetsNavn
};
