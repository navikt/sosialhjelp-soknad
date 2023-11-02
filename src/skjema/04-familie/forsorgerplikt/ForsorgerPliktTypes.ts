import {NavnFrontend} from "../../../generated/model";

export interface Barn {
    barn: {
        navn: NavnFrontend;
        fodselsdato: null | string;
        personnummer: null | string;
        fodselsnummer: null | string;
    };
    borSammenMed: null | boolean;
    erFolkeregistrertSammen: boolean;
    harDeltBosted: null | boolean;
    samvarsgrad: null | number;
}

export interface ForsorgerPlikt {
    harForsorgerplikt: boolean;
    barnebidrag: string | null;
    ansvar: Barn[];
}

export interface Barnebidrag {
    barnebidrag: string;
}

export const initialForsorgerPlikt: ForsorgerPlikt = {
    harForsorgerplikt: false,
    barnebidrag: null,
    ansvar: [],
};
