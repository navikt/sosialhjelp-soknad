import {Navn} from "../../familie/sivilstatus/FamilieTypes";

export interface BasisPersonalia {
    navn: Navn;
    fodselsnummer: string;
    statsborgerskap: string;
    nordiskBorger: boolean;
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
    nordiskBorger: false,
};
