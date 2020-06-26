import {Barn} from "./ForsorgerPliktTypes";

export const getTomtAnsvarMedBarn: () => Barn = () => {
    return {
        barn: {
            navn: {
                fornavn: "",
                mellomnavn: "",
                etternavn: "",
                fulltNavn: "",
            },
            fodselsdato: null,
            personnummer: null,
            fodselsnummer: null,
        },
        borSammenMed: null,
        erFolkeregistrertSammen: false,
        harDeltBosted: null,
        samvarsgrad: null,
    };
};
