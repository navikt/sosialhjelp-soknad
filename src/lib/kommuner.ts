import {Soknadsdata} from "../digisos/redux/soknadsdata/soknadsdataReducer";

const finnSoknadsMottaker = ({personalia}: Soknadsdata) => (personalia.navEnheter ? personalia.navEnhet : null);

const finnValgtEnhetsNavn = (soknadsdata: Soknadsdata) => {
    const soknadsmottaker = finnSoknadsMottaker(soknadsdata);
    if (!soknadsmottaker) return "";
    return soknadsmottaker.enhetsnavn + ", " + soknadsmottaker.kommunenavn + " kommune";
};

export {finnValgtEnhetsNavn};
