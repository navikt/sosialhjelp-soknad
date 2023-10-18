import {ForsorgerPlikt, initialForsorgerPlikt} from "../forsorgerplikt/ForsorgerPliktTypes";

export enum Status {
    GIFT = "gift",
    UGIFT = "ugift",
    SAMBOER = "samboer",
    ENKE = "enke",
    SKILT = "skilt",
    SEPARERT = "separert",
}

export interface Navn {
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fulltNavn?: string;
}

export interface Person {
    navn: Navn;
    fodselsdato: null | string;
    personnummer: string | null;
}

export interface Sivilstatus {
    kildeErSystem: boolean;
    sivilstatus: Status;
    ektefelle?: Person;
    harDiskresjonskode?: boolean;
    borSammenMed?: boolean;
    erFolkeregistrertSammen?: boolean;
}

export interface Familie {
    sivilstatus: Sivilstatus;
    forsorgerplikt: ForsorgerPlikt;
}

const initialSivilstatusState: Sivilstatus = {
    kildeErSystem: false,
    sivilstatus: Status.UGIFT,
};

export const initialFamilieStatus: Familie = {
    sivilstatus: initialSivilstatusState,
    forsorgerplikt: initialForsorgerPlikt,
};
