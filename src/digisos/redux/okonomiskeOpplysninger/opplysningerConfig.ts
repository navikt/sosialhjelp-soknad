import {OpplysningInputType, OpplysningSpecGammeltFormat, VedleggGruppe} from "./opplysningerTypes";
import {VedleggFrontend, VedleggFrontendType} from "../../../generated/model";

export type OpplysningSpec = {
    numRows: "ingen" | "en" | "flere";
    inputFields: OpplysningInputType[];
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
export type VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring = Exclude<
    VedleggFrontendType,
    | "dokumentasjon|annet"
    | "dokumentasjon|kjoretoy"
    | "dokumentasjon|annetverdi"
    | "dokumentasjon|fritidseiendom"
    | "dokumentasjon|campingvogn"
    | "kjopekontrakt|kjopekontrakt"
>;

// Se over
export type VedleggFrontendMinusEtParTingSomTrengerAvklaring = VedleggFrontend & {
    type: VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring;
};

// Se over
export type VedleggFrontendsMinusEtParTingSomTrengerAvklaring = {
    okonomiskeOpplysninger: VedleggFrontendMinusEtParTingSomTrengerAvklaring[];
    slettedeVedlegg: VedleggFrontendMinusEtParTingSomTrengerAvklaring[];
    isOkonomiskeOpplysningerBekreftet: boolean;
};

export const opplysningSpec: Record<VedleggFrontendTypeMinusEtParTingSomTrengerAvklaring, OpplysningSpec> = {
    "lonnslipp|arbeid": {
        numRows: "flere",
        inputFields: ["brutto", "netto"],
        textKey: "opplysninger.arbeid.jobb",
        sortKey: 0,
    },
    "sluttoppgjor|arbeid": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.arbeid.avsluttet",
        sortKey: 1,
    },
    "student|vedtak": {
        numRows: "en",
        inputFields: ["belop"],
        textKey: "opplysninger.arbeid.student",
        sortKey: 2,
    },
    "barnebidrag|betaler": {
        numRows: "en",
        inputFields: ["belop"],
        textKey: "opplysninger.familiesituasjon.barnebidrag.betaler",
        sortKey: 3,
    },
    "barnebidrag|mottar": {
        numRows: "en",
        inputFields: ["belop"],
        textKey: "opplysninger.familiesituasjon.barnebidrag.mottar",
        sortKey: 4,
    },
    "samvarsavtale|barn": {
        numRows: "ingen",
        inputFields: [],
        textKey: "opplysninger.familiesituasjon.barn.samvarsavtale",
        sortKey: 5,
    },
    "husleiekontrakt|husleiekontrakt": {
        numRows: "ingen",
        inputFields: [],
        textKey: "opplysninger.bosituasjon.leier",
        sortKey: 6,
    },
    "husleiekontrakt|kommunal": {
        numRows: "ingen",
        inputFields: [],
        textKey: "opplysninger.bosituasjon.kommunal",
        sortKey: 7,
    },
    "husbanken|vedtak": {
        numRows: "en",
        inputFields: ["belop"],
        textKey: "opplysninger.inntekt.bostotte",
        sortKey: 8,
    },
    "kontooversikt|brukskonto": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.brukskonto",
        sortKey: 9,
    },
    "kontooversikt|bsu": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.bsu",
        sortKey: 10,
    },
    "kontooversikt|sparekonto": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.sparekonto",
        sortKey: 11,
    },
    "kontooversikt|livsforsikring": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.livsforsikring",
        sortKey: 12,
    },
    "kontooversikt|aksjer": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.aksjer",
        sortKey: 13,
    },
    "kontooversikt|annet": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.annet",
        sortKey: 14,
    },
    "dokumentasjon|utbytte": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.utbytte",
        sortKey: 15,
    },
    "salgsoppgjor|eiendom": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.salg",
        sortKey: 16,
    },
    "dokumentasjon|forsikringsutbetaling": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.forsikringsutbetalinger",
        sortKey: 17,
    },
    "dokumentasjon|annetinntekter": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.annet",
        sortKey: 18,
    },
    "faktura|husleie": {
        numRows: "en",
        inputFields: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.husleie",
        sortKey: 19,
    },
    "faktura|strom": {
        numRows: "en",
        inputFields: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.strom",
        sortKey: 20,
    },
    "faktura|kommunaleavgifter": {
        numRows: "en",
        inputFields: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.kommunaleavgifter",
        sortKey: 21,
    },
    "faktura|oppvarming": {
        numRows: "en",
        inputFields: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.oppvarming",
        sortKey: 22,
    },
    "nedbetalingsplan|avdraglaan": {
        numRows: "flere",
        inputFields: ["avdrag", "renter"],
        textKey: "opplysninger.utgifter.boutgift.avdraglaan",
        sortKey: 23,
    },
    "dokumentasjon|annetboutgift": {
        numRows: "flere",
        inputFields: ["beskrivelse", "belop"],
        textKey: "opplysninger.utgifter.boutgift.andreutgifter",
        sortKey: 24,
    },
    "faktura|fritidsaktivitet": {
        numRows: "flere",
        inputFields: ["beskrivelse", "belop"],
        textKey: "opplysninger.utgifter.barn.fritidsaktivitet",
        sortKey: 25,
    },
    "faktura|barnehage": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.utgifter.barn.barnehage",
        sortKey: 26,
    },
    "faktura|sfo": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.utgifter.barn.sfo",
        sortKey: 27,
    },
    "faktura|tannbehandling": {
        numRows: "flere",
        inputFields: ["belop"],
        textKey: "opplysninger.utgifter.barn.tannbehandling",
        sortKey: 28,
    },
    "faktura|annetbarnutgift": {
        numRows: "flere",
        inputFields: ["beskrivelse", "belop"],
        textKey: "opplysninger.utgifter.barn.annet",
        sortKey: 29,
    },
    "skattemelding|skattemelding": {
        numRows: "ingen",
        inputFields: [],
        textKey: "opplysninger.generell.skattemelding",
        sortKey: 30,
    },
    "oppholdstillatel|oppholdstillatel": {
        numRows: "ingen",
        inputFields: [],
        textKey: "opplysninger.oppholdstillatelse.oppholdstillatelse",
        sortKey: 31,
    },
    "annet|annet": {
        numRows: "flere",
        inputFields: ["beskrivelse", "belop"],
        textKey: "opplysninger.ekstrainfo.utgifter",
        sortKey: 32,
    },
};

export const sortertSpecGammeltFormat: OpplysningSpecGammeltFormat[] = [
    {
        type: "lonnslipp|arbeid",
        antallRader: "flere",
        radInnhold: ["brutto", "netto"],
        textKey: "opplysninger.arbeid.jobb",
    },
    {
        type: "sluttoppgjor|arbeid",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.arbeid.avsluttet",
    }, // RADER_MED_BRUTTO_OG_NETTO
    {
        type: "student|vedtak",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.arbeid.student",
    }, // RAD_MED_BELOP
    {
        type: "barnebidrag|betaler",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.familiesituasjon.barnebidrag.betaler",
    }, // RAD_MED_BELOP
    {
        type: "barnebidrag|mottar",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.familiesituasjon.barnebidrag.mottar",
    }, // RAD_MED_BELOP
    {
        type: "samvarsavtale|barn",
        antallRader: "ingen",
        radInnhold: [],
        textKey: "opplysninger.familiesituasjon.barn.samvarsavtale",
    }, // NOTHING
    {
        type: "husleiekontrakt|husleiekontrakt",
        antallRader: "ingen",
        radInnhold: [],
        textKey: "opplysninger.bosituasjon.leier",
    }, // NOTHING
    {
        type: "husleiekontrakt|kommunal",
        antallRader: "ingen",
        radInnhold: [],
        textKey: "opplysninger.bosituasjon.kommunal",
    }, // NOTHING
    {
        type: "husbanken|vedtak",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bostotte",
    }, // RAD_MED_BELOP
    {
        type: "kontooversikt|brukskonto",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.brukskonto",
    }, // RADER_MED_BELOP
    {
        type: "kontooversikt|bsu",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.bsu",
    }, // RADER_MED_BELOP
    {
        type: "kontooversikt|sparekonto",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.sparekonto",
    }, // RADER_MED_BELOP
    {
        type: "kontooversikt|livsforsikring",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.livsforsikring",
    }, // RADER_MED_BELOP
    {
        type: "kontooversikt|aksjer",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.aksjer",
    }, // RADER_MED_BELOP
    {
        type: "kontooversikt|annet",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.bankinnskudd.annet",
    }, // RADER_MED_BELOP
    {
        type: "dokumentasjon|utbytte",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.utbytte",
    }, // RADER_MED_BELOP
    {
        type: "salgsoppgjor|eiendom",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.salg",
    }, // RADER_MED_BELOP
    {
        type: "dokumentasjon|forsikringsutbetaling",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.forsikringsutbetalinger",
    }, // RADER_MED_BELOP
    {
        type: "dokumentasjon|annetinntekter",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.inntekt.inntekter.annet",
    }, // RADER_MED_BELOP
    {
        type: "faktura|husleie",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.husleie",
    }, // RAD_MED_BELOP
    {
        type: "faktura|strom",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.strom",
    }, // RAD_MED_BELOP
    {
        type: "faktura|kommunaleavgifter",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.kommunaleavgifter",
    }, // RAD_MED_BELOP
    {
        type: "faktura|oppvarming",
        antallRader: "en",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.boutgift.oppvarming",
    }, // RAD_MED_BELOP
    {
        type: "nedbetalingsplan|avdraglaan",
        antallRader: "flere",
        radInnhold: ["avdrag", "renter"],
        textKey: "opplysninger.utgifter.boutgift.avdraglaan",
    }, // RADER_MED_AVDRAG_OG_RENTER
    {
        type: "dokumentasjon|annetboutgift",
        antallRader: "flere",
        radInnhold: ["beskrivelse", "belop"],
        textKey: "opplysninger.utgifter.boutgift.andreutgifter",
    }, // RADER_MED_BESKRIVELSE_OG_BELOP
    {
        type: "faktura|fritidsaktivitet",
        antallRader: "flere",
        radInnhold: ["beskrivelse", "belop"],
        textKey: "opplysninger.utgifter.barn.fritidsaktivitet",
    }, // RADER_MED_BESKRIVELSE_OG_BELOP
    {
        type: "faktura|barnehage",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.barn.barnehage",
    }, // RADER_MED_BELOP
    {
        type: "faktura|sfo",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.barn.sfo",
    }, // RADER_MED_BELOP
    {
        type: "faktura|tannbehandling",
        antallRader: "flere",
        radInnhold: ["belop"],
        textKey: "opplysninger.utgifter.barn.tannbehandling",
    }, // RADER_MED_BELOP
    {
        type: "faktura|annetbarnutgift",
        antallRader: "flere",
        radInnhold: ["beskrivelse", "belop"],
        textKey: "opplysninger.utgifter.barn.annet",
    }, // RADER_MED_BESKRIVELSE_OG_BELOP
    {
        type: "skattemelding|skattemelding",
        antallRader: "ingen",
        radInnhold: [],
        textKey: "opplysninger.generell.skattemelding",
    }, // NOTHING
    {
        type: "oppholdstillatel|oppholdstillatel",
        antallRader: "ingen",
        radInnhold: [],
        textKey: "opplysninger.oppholdstillatelse.oppholdstillatelse",
    }, // INGEN
    {
        type: "annet|annet",
        antallRader: "flere",
        radInnhold: ["beskrivelse", "belop"],
        textKey: "opplysninger.ekstrainfo.utgifter",
    }, // RADER_MED_BESKRIVELSE_OG_BELOP
];

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
