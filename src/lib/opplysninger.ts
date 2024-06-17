import {VedleggFrontend, VedleggFrontendGruppe, VedleggFrontendType} from "../generated/model";

export type Opplysning = VedleggFrontend & {
    slettet?: boolean;
    pendingLasterOppFil?: boolean;
};

export type OpplysningInputType = "beskrivelse" | "belop" | "brutto" | "netto" | "avdrag" | "renter";

export type OpplysningSpec = {
    numRows: "ingen" | "en" | "flere";
    inputs: OpplysningInputType[];
    textKey: string;
    sortKey: number;
};

export const opplysningSpec: Record<VedleggFrontendType, OpplysningSpec> = {
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

export const vedleggGrupper: VedleggFrontendGruppe[] = [
    "statsborgerskap",
    "arbeid",
    "familie",
    "bosituasjon",
    "inntekt",
    "utgifter",
    "generelle vedlegg",
    "andre utgifter",
];
