import {Navn} from "../../familie/sivilstatus/FamilieTypes";

export interface BasisPersonalia {
    navn: Navn;
    fodselsnummer: string;
    statsborgerskap: string;
}

export const initialBasisPersonalia: BasisPersonalia = {
    navn: {
        fornavn: "",
        mellomnavn: "",
        etternavn: "",
        fulltNavn: "",
    },
    fodselsnummer: "",
    statsborgerskap: "",
};
