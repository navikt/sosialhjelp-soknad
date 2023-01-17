import {z} from "zod";

export interface AdressesokTreff {
    adresse: null | string;
    husnummer: null | string;
    husbokstav: null | string;
    kommunenummer: null | string;
    kommunenavn: null | string;
    postnummer: null | string;
    poststed: null | string;
    geografiskTilknytning: null | string;
    gatekode: null | string;
    bydel: null | string;
    type: null | string;
}

export const NavEnhetSchema = z.object({
    orgnr: z.string().nullable(),
    enhetsnr: z.string().nullable(),
    isMottakMidlertidigDeaktivert: z.boolean(),
    isMottakDeaktivert: z.boolean(),
    enhetsnavn: z.string(),
    kommunenavn: z.string(),
    kommuneNr: z.string(),
    valgt: z.boolean(),
});

export type NavEnhet = z.infer<typeof NavEnhetSchema>;

export enum AdresseKategori {
    FOLKEREGISTRERT = "folkeregistrert",
    MIDLERTIDIG = "midlertidig",
    SOKNAD = "soknad",
}

export enum AdresseType {
    GATEADRESSE = "gateadresse",
    MATRIKKELADRESSE = "matrikkeladresse",
    USTRUKTURERT = "ustrukturert",
}

export interface Baseadresse {
    kommunenummer: string;
}

export interface Matrikkeladresse extends Baseadresse {
    bruksnummer: string;
    gaardsnummer: string;
    festenummer: string;
    seksjonsnummer: string;
    undernummer: string;
}

export interface Gateadresse extends Baseadresse {
    landkode: null;
    adresselinjer: string[];
    bolignummer: string;
    postnummer: string;
    poststed: string;
    gatenavn: string;
    husnummer: string;
    husbokstav: string;
}

export interface UstrukturertAdresse {
    type: AdresseType.USTRUKTURERT;
    adresse: string[];
}

export interface AdresseElement {
    type: AdresseType;
    gateadresse: null | Gateadresse;
    matrikkeladresse: null | Matrikkeladresse;
    ustrukturert: null | UstrukturertAdresse;
}

export interface Adresser {
    valg: AdresseKategori | null;
    folkeregistrert: AdresseElement;
    midlertidig: AdresseElement | null;
    soknad: null | AdresseElement;
}

export const initialAdresserState: Adresser = {
    valg: null,
    folkeregistrert: {
        type: AdresseType.GATEADRESSE,
        gateadresse: {
            landkode: null,
            kommunenummer: "",
            adresselinjer: [],
            bolignummer: "",
            postnummer: "",
            poststed: "",
            gatenavn: "",
            husnummer: "",
            husbokstav: "",
        },
        matrikkeladresse: null,
        ustrukturert: null,
    },
    midlertidig: null,
    soknad: null,
};
