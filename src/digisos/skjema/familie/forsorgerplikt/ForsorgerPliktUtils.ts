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
        harDiskresjonskode: false,
        borSammenMed: null,
        erFolkeregistrertSammen: false,
        harDeltBosted: null,
        samvarsgrad: null,
    };
};
