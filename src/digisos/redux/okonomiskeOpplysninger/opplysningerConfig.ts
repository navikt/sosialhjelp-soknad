import {OpplysningInputType, VedleggGruppe} from "./opplysningerTypes";
import {VedleggFrontend, VedleggFrontends, VedleggFrontendType} from "../../../generated/model";

export type OpplysningSpec = {
    numRows: "ingen" | "en" | "flere";
    inputs: OpplysningInputType[];
    textKey: string;
    sortKey: number;
};

// TODO: Avklare disse:
//  Disse eksisterer på backend, men er ikke presentert på frontend.
//  Skal de slettes fra frontend, eller implementeres her?
//  Jeg vet ikke, så jeg patcher datatypene i første omgang.
//  Når denne diskrepansen er avklart, kan man fjerne denne patchen,
//  og all bruk av disse typene kan erstattes med sine respektive
//  originaltyper, dvs. uten "MinusEtParTingSomTrengerAvklaring".
export const UgyldigeFrontendTyper = [
    "dokumentasjon|annet",
    "dokumentasjon|kjoretoy",
    "dokumentasjon|annetverdi",
    "dokumentasjon|fritidseiendom",
    "dokumentasjon|campingvogn",
    "kjopekontrakt|kjopekontrakt",
] as const;

/**
 * VedleggFrontendType minus UgyldigeFrontendTyper
 *
 * @see UgyldigeFrontendTyper for kontekst
 */
export type VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring = Exclude<
    VedleggFrontendType,
    (typeof UgyldigeFrontendTyper)[number]
>;

/**
 * VedleggFrontend minus UgyldigeFrontendTyper
 *
 * @see UgyldigeFrontendTyper for kontekst
 */
export type VedleggFrontendMinusEtParTingSomTrengerAvklaring = VedleggFrontend & {
    type: VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring;
};

/**
 * VedleggFrontend minus UgyldigeFrontendTyper
 *
 * @see UgyldigeFrontendTyper for kontekst
 */
export type VedleggFrontendsMinusEtParTingSomTrengerAvklaring = {
    okonomiskeOpplysninger: VedleggFrontendMinusEtParTingSomTrengerAvklaring[];
    slettedeVedlegg: VedleggFrontendMinusEtParTingSomTrengerAvklaring[];
    isOkonomiskeOpplysningerBekreftet: boolean;
};

export const invalidVedleggFrontend = (
    data: VedleggFrontend | VedleggFrontendMinusEtParTingSomTrengerAvklaring
): data is VedleggFrontend => UgyldigeFrontendTyper.includes(data.type as any); // Siden det er midlertidig hack
export const validVedleggFrontends = (
    data: VedleggFrontends | VedleggFrontendsMinusEtParTingSomTrengerAvklaring
): data is VedleggFrontendsMinusEtParTingSomTrengerAvklaring =>
    !(data.slettedeVedlegg.some(invalidVedleggFrontend) || data.okonomiskeOpplysninger.some(invalidVedleggFrontend));

export const opplysningSpec: Record<VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring, OpplysningSpec> = {
    "lonnslipp|arbeid": {
        numRows: "flere",
        inputs: ["brutto", "netto"],
        textKey: "opplysninger.arbeid.jobb",
        sortKey: 0,
    },
    "sluttoppgjor|arbeid": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.arbeid.avsluttet",
        sortKey: 1,
    },
    "student|vedtak": {
        numRows: "en",
        inputs: ["belop"],
        textKey: "opplysninger.arbeid.student",
        sortKey: 2,
    },
    "barnebidrag|betaler": {
        numRows: "en",
        inputs: ["belop"],
        textKey: "opplysninger.familiesituasjon.barnebidrag.betaler",
        sortKey: 3,
    },
    "barnebidrag|mottar": {
        numRows: "en",
        inputs: ["belop"],
        textKey: "opplysninger.familiesituasjon.barnebidrag.mottar",
        sortKey: 4,
    },
    "samvarsavtale|barn": {
        numRows: "ingen",
        inputs: [],
        textKey: "opplysninger.familiesituasjon.barn.samvarsavtale",
        sortKey: 5,
    },
    "husleiekontrakt|husleiekontrakt": {
        numRows: "ingen",
        inputs: [],
        textKey: "opplysninger.bosituasjon.leier",
        sortKey: 6,
    },
    "husleiekontrakt|kommunal": {
        numRows: "ingen",
        inputs: [],
        textKey: "opplysninger.bosituasjon.kommunal",
        sortKey: 7,
    },
    "husbanken|vedtak": {
        numRows: "en",
        inputs: ["belop"],
        textKey: "opplysninger.inntekt.bostotte",
        sortKey: 8,
    },
    "kontooversikt|brukskonto": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.brukskonto",
        sortKey: 9,
    },
    "kontooversikt|bsu": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.bsu",
        sortKey: 10,
    },
    "kontooversikt|sparekonto": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.sparekonto",
        sortKey: 11,
    },
    "kontooversikt|livsforsikring": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.livsforsikring",
        sortKey: 12,
    },
    "kontooversikt|aksjer": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.aksjer",
        sortKey: 13,
    },
    "kontooversikt|annet": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.annet",
        sortKey: 14,
    },
    "dokumentasjon|utbytte": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.utbytte",
        sortKey: 15,
    },
    "salgsoppgjor|eiendom": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.salg",
        sortKey: 16,
    },
    "dokumentasjon|forsikringsutbetaling": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.forsikringsutbetalinger",
        sortKey: 17,
    },
    "dokumentasjon|annetinntekter": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.annet",
        sortKey: 18,
    },
    "faktura|husleie": {
        numRows: "en",
        inputs: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.husleie",
        sortKey: 19,
    },
    "faktura|strom": {
        numRows: "en",
        inputs: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.strom",
        sortKey: 20,
    },
    "faktura|kommunaleavgifter": {
        numRows: "en",
        inputs: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.kommunaleavgifter",
        sortKey: 21,
    },
    "faktura|oppvarming": {
        numRows: "en",
        inputs: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.oppvarming",
        sortKey: 22,
    },
    "nedbetalingsplan|avdraglaan": {
        numRows: "flere",
        inputs: ["avdrag", "renter"],
        textKey: "opplysninger.utgifter.boutgift.avdraglaan",
        sortKey: 23,
    },
    "dokumentasjon|annetboutgift": {
        numRows: "flere",
        inputs: ["beskrivelse", "belop"],
        textKey: "opplysninger.utgifter.boutgift.andreutgifter",
        sortKey: 24,
    },
    "faktura|fritidsaktivitet": {
        numRows: "flere",
        inputs: ["beskrivelse", "belop"],
        textKey: "opplysninger.utgifter.barn.fritidsaktivitet",
        sortKey: 25,
    },
    "faktura|barnehage": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.utgifter.barn.barnehage",
        sortKey: 26,
    },
    "faktura|sfo": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.utgifter.barn.sfo",
        sortKey: 27,
    },
    "faktura|tannbehandling": {
        numRows: "flere",
        inputs: ["belop"],
        textKey: "opplysninger.utgifter.barn.tannbehandling",
        sortKey: 28,
    },
    "faktura|annetbarnutgift": {
        numRows: "flere",
        inputs: ["beskrivelse", "belop"],
        textKey: "opplysninger.utgifter.barn.annet",
        sortKey: 29,
    },
    "skattemelding|skattemelding": {
        numRows: "ingen",
        inputs: [],
        textKey: "opplysninger.generell.skattemelding",
        sortKey: 30,
    },
    "oppholdstillatel|oppholdstillatel": {
        numRows: "ingen",
        inputs: [],
        textKey: "opplysninger.oppholdstillatelse.oppholdstillatelse",
        sortKey: 31,
    },
    "annet|annet": {
        numRows: "flere",
        inputs: ["beskrivelse", "belop"],
        textKey: "opplysninger.ekstrainfo.utgifter",
        sortKey: 32,
    },
};

export const vedleggGrupper: VedleggGruppe[] = [
    "statsborgerskap",
    "arbeid",
    "familie",
    "bosituasjon",
    "inntekt",
    "utgifter",
    "generelle vedlegg",
    "andre utgifter",
];
