import {DokumentasjonAntallRader} from "../locales/types";
import {DokumentasjonDto, type DokumentasjonDtoType} from "../generated/new/model";

export type Opplysning = DokumentasjonDto & {
    slettet?: boolean;
    pendingLasterOppFil?: boolean;
};

export type OpplysningInputType = "beskrivelse" | "belop" | "brutto" | "netto" | "avdrag" | "renter";

export type OpplysningSpec = {
    componentDescription: keyof typeof permutations;
    textKey: string;
    sortKey: number;
};

export interface ComponentDescription {
    numRows: DokumentasjonAntallRader;
    inputs: ["brutto", "netto"] | ["belop"] | ["belop", "beskrivelse"] | ["avdrag", "renter"] | [];
}

export const permutations = {
    bruttonetto: {inputs: ["brutto", "netto"], numRows: "flere"},
    belopFlere: {inputs: ["belop"], numRows: "flere"},
    belopEn: {inputs: ["belop"], numRows: "en"},
    belopBeskrivelse: {inputs: ["belop", "beskrivelse"], numRows: "flere"},
    avdragRenter: {inputs: ["avdrag", "renter"], numRows: "flere"},
    ingen: {inputs: [], numRows: "ingen"},
} as const;

export const opplysningSpec: Record<DokumentasjonDtoType, OpplysningSpec> = {
    JOBB: {
        componentDescription: "bruttonetto",
        textKey: "opplysninger.arbeid.jobb",
        sortKey: 0,
    },
    SLUTTOPPGJOER: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.arbeid.avsluttet",
        sortKey: 1,
    },
    STUDIELAN_INNTEKT: {
        componentDescription: "belopEn",
        textKey: "opplysninger.arbeid.student",
        sortKey: 2,
    },
    BARNEBIDRAG_BETALER: {
        componentDescription: "belopEn",
        textKey: "opplysninger.familiesituasjon.barnebidrag.betaler",
        sortKey: 3,
    },
    BARNEBIDRAG_MOTTAR: {
        componentDescription: "belopEn",
        textKey: "opplysninger.familiesituasjon.barnebidrag.mottar",
        sortKey: 4,
    },
    SAMVARSAVTALE: {
        componentDescription: "ingen",
        textKey: "opplysninger.familiesituasjon.barn.samvarsavtale",
        sortKey: 5,
    },
    HUSLEIEKONTRAKT: {
        componentDescription: "ingen",
        textKey: "opplysninger.bosituasjon.leier",
        sortKey: 6,
    },
    HUSLEIEKONTRAKT_KOMMUNAL: {
        componentDescription: "ingen",
        textKey: "opplysninger.bosituasjon.kommunal",
        sortKey: 7,
    },
    // TODO: Få inn denne igjen
    // UTBETALING_HUSBANKEN: {
    //     componentDescription: "belopEn",
    //     textKey: "opplysninger.inntekt.bostotte",
    //     sortKey: 8,
    // },
    FORMUE_BRUKSKONTO: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.inntekt.bankinnskudd.brukskonto",
        sortKey: 9,
    },
    FORMUE_BSU: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.inntekt.bankinnskudd.bsu",
        sortKey: 10,
    },
    FORMUE_SPAREKONTO: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.inntekt.bankinnskudd.sparekonto",
        sortKey: 11,
    },
    FORMUE_LIVSFORSIKRING: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.inntekt.bankinnskudd.livsforsikring",
        sortKey: 12,
    },
    FORMUE_VERDIPAPIRER: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.inntekt.bankinnskudd.aksjer",
        sortKey: 13,
    },
    FORMUE_ANNET: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.inntekt.bankinnskudd.annet",
        sortKey: 14,
    },
    UTBETALING_UTBYTTE: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.inntekt.inntekter.utbytte",
        sortKey: 15,
    },
    UTBETALING_SALG: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.inntekt.inntekter.salg",
        sortKey: 16,
    },
    UTBETALING_FORSIKRING: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.inntekt.inntekter.forsikringsutbetalinger",
        sortKey: 17,
    },
    UTBETALING_ANNET: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.inntekt.inntekter.annet",
        sortKey: 18,
    },
    UTGIFTER_HUSLEIE: {
        componentDescription: "belopEn",
        textKey: "opplysninger.utgifter.boutgift.husleie",
        sortKey: 19,
    },
    UTGIFTER_STROM: {
        componentDescription: "belopEn",
        textKey: "opplysninger.utgifter.boutgift.strom",
        sortKey: 20,
    },
    UTGIFTER_KOMMUNAL_AVGIFT: {
        componentDescription: "belopEn",
        textKey: "opplysninger.utgifter.boutgift.kommunaleavgifter",
        sortKey: 21,
    },
    UTGIFTER_OPPVARMING: {
        componentDescription: "belopEn",
        textKey: "opplysninger.utgifter.boutgift.oppvarming",
        sortKey: 22,
    },
    UTGIFTER_BOLIGLAN_AVDRAG: {
        componentDescription: 'avdragRenter',
        textKey: "opplysninger.utgifter.boutgift.avdraglaan",
        sortKey: 23,
    },
    UTGIFTER_ANNET_BO: {
        componentDescription: 'belopBeskrivelse',
        textKey: "opplysninger.utgifter.boutgift.andreutgifter",
        sortKey: 24,
    },
    UTGIFTER_BARN_FRITIDSAKTIVITETER: {
        componentDescription: 'belopBeskrivelse',
        textKey: "opplysninger.utgifter.barn.fritidsaktivitet",
        sortKey: 25,
    },
    UTGIFTER_BARNEHAGE: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.utgifter.barn.barnehage",
        sortKey: 26,
    },
    UTGIFTER_SFO: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.utgifter.barn.sfo",
        sortKey: 27,
    },
    UTGIFTER_BARN_TANNREGULERING: {
        componentDescription: "belopFlere",
        textKey: "opplysninger.utgifter.barn.tannbehandling",
        sortKey: 28,
    },
    UTGIFTER_ANNET_BARN: {
        componentDescription: 'belopBeskrivelse',
        textKey: "opplysninger.utgifter.barn.annet",
        sortKey: 29,
    },
    SKATTEMELDING: {
        componentDescription: "ingen",
        textKey: "opplysninger.generell.skattemelding",
        sortKey: 30,
    },
    OPPHOLDSTILLATELSE: {
        componentDescription: "ingen",
        textKey: "opplysninger.oppholdstillatelse.oppholdstillatelse",
        sortKey: 31,
    },
    UTGIFTER_ANDRE_UTGIFTER: {
        componentDescription: 'belopBeskrivelse',
        textKey: "opplysninger.ekstrainfo.utgifter",
        sortKey: 32,
    },
    // TODO: Herifra og ned var ikke her fra før :think:
    BEHOV: {
        componentDescription: 'ingen',
        textKey: "opplysninger.oppholdstillatelse.oppholdstillatelse",
        sortKey: 33,
    },
    UTGIFTER_BOLIGLAN: {
        componentDescription: 'ingen',
        textKey: "opplysninger.oppholdstillatelse.oppholdstillatelse",
        sortKey: 41,
    },
};
