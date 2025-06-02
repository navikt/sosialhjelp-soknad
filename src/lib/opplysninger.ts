import {DokumentasjonDtoType} from "../generated/new/model";

export type OpplysningInputType = "beskrivelse" | "belop" | "brutto" | "netto" | "avdrag" | "renter";

export type OpplysningSpec = {
    formVariant: keyof typeof formVariants;
    textKey: string;
    sortKey: number;
};

export const formVariants = {
    bruttonetto: {numRows: "flere"},
    belopFlere: {numRows: "flere"},
    belopEn: {numRows: "en"},
    belopBeskrivelse: {numRows: "flere"},
    avdragRenter: {numRows: "flere"},
    ingen: {numRows: "ingen"},
} as const;

export const opplysningSpec = {
    JOBB: {
        formVariant: "bruttonetto",
        textKey: "opplysninger.arbeid.jobb",
        sortKey: 0,
    },
    SLUTTOPPGJOER: {
        formVariant: "belopFlere",
        textKey: "opplysninger.arbeid.avsluttet",
        sortKey: 1,
    },
    STUDIELAN_INNTEKT: {
        formVariant: "belopEn",
        textKey: "opplysninger.arbeid.student",
        sortKey: 2,
    },
    BARNEBIDRAG_BETALER: {
        formVariant: "belopEn",
        textKey: "opplysninger.familiesituasjon.barnebidrag.betaler",
        sortKey: 3,
    },
    BARNEBIDRAG_MOTTAR: {
        formVariant: "belopEn",
        textKey: "opplysninger.familiesituasjon.barnebidrag.mottar",
        sortKey: 4,
    },
    SAMVARSAVTALE: {
        formVariant: "ingen",
        textKey: "opplysninger.familiesituasjon.barn.samvarsavtale",
        sortKey: 5,
    },
    HUSLEIEKONTRAKT: {
        formVariant: "ingen",
        textKey: "opplysninger.bosituasjon.leier",
        sortKey: 6,
    },
    HUSLEIEKONTRAKT_KOMMUNAL: {
        formVariant: "ingen",
        textKey: "opplysninger.bosituasjon.kommunal",
        sortKey: 7,
    },
    UTBETALING_HUSBANKEN: {
        formVariant: "belopEn",
        textKey: "opplysninger.inntekt.bostotte",
        sortKey: 8,
    },
    FORMUE_BRUKSKONTO: {
        formVariant: "belopFlere",
        textKey: "opplysninger.inntekt.bankinnskudd.brukskonto",
        sortKey: 9,
    },
    FORMUE_BSU: {
        formVariant: "belopFlere",
        textKey: "opplysninger.inntekt.bankinnskudd.bsu",
        sortKey: 10,
    },
    FORMUE_SPAREKONTO: {
        formVariant: "belopFlere",
        textKey: "opplysninger.inntekt.bankinnskudd.sparekonto",
        sortKey: 11,
    },
    FORMUE_LIVSFORSIKRING: {
        formVariant: "belopFlere",
        textKey: "opplysninger.inntekt.bankinnskudd.livsforsikring",
        sortKey: 12,
    },
    FORMUE_VERDIPAPIRER: {
        formVariant: "belopFlere",
        textKey: "opplysninger.inntekt.bankinnskudd.aksjer",
        sortKey: 13,
    },
    FORMUE_ANNET: {
        formVariant: "belopFlere",
        textKey: "opplysninger.inntekt.bankinnskudd.annet",
        sortKey: 14,
    },
    UTBETALING_UTBYTTE: {
        formVariant: "belopFlere",
        textKey: "opplysninger.inntekt.inntekter.utbytte",
        sortKey: 15,
    },
    UTBETALING_SALG: {
        formVariant: "belopFlere",
        textKey: "opplysninger.inntekt.inntekter.salg",
        sortKey: 16,
    },
    UTBETALING_FORSIKRING: {
        formVariant: "belopFlere",
        textKey: "opplysninger.inntekt.inntekter.forsikringsutbetalinger",
        sortKey: 17,
    },
    UTBETALING_ANNET: {
        formVariant: "belopFlere",
        textKey: "opplysninger.inntekt.inntekter.annet",
        sortKey: 18,
    },
    UTGIFTER_HUSLEIE: {
        formVariant: "belopEn",
        textKey: "opplysninger.utgifter.boutgift.husleie",
        sortKey: 19,
    },
    UTGIFTER_STROM: {
        formVariant: "belopEn",
        textKey: "opplysninger.utgifter.boutgift.strom",
        sortKey: 20,
    },
    UTGIFTER_KOMMUNAL_AVGIFT: {
        formVariant: "belopEn",
        textKey: "opplysninger.utgifter.boutgift.kommunaleavgifter",
        sortKey: 21,
    },
    UTGIFTER_OPPVARMING: {
        formVariant: "belopEn",
        textKey: "opplysninger.utgifter.boutgift.oppvarming",
        sortKey: 22,
    },
    UTGIFTER_BOLIGLAN: {
        formVariant: "avdragRenter",
        textKey: "opplysninger.utgifter.boutgift.avdraglaan",
        sortKey: 23,
    },
    UTGIFTER_ANNET_BO: {
        formVariant: "belopBeskrivelse",
        textKey: "opplysninger.utgifter.boutgift.andreutgifter",
        sortKey: 24,
    },
    UTGIFTER_BARN_FRITIDSAKTIVITETER: {
        formVariant: "belopBeskrivelse",
        textKey: "opplysninger.utgifter.barn.fritidsaktivitet",
        sortKey: 25,
    },
    UTGIFTER_BARNEHAGE: {
        formVariant: "belopFlere",
        textKey: "opplysninger.utgifter.barn.barnehage",
        sortKey: 26,
    },
    UTGIFTER_SFO: {
        formVariant: "belopFlere",
        textKey: "opplysninger.utgifter.barn.sfo",
        sortKey: 27,
    },
    UTGIFTER_BARN_TANNREGULERING: {
        formVariant: "belopFlere",
        textKey: "opplysninger.utgifter.barn.tannbehandling",
        sortKey: 28,
    },
    UTGIFTER_ANNET_BARN: {
        formVariant: "belopBeskrivelse",
        textKey: "opplysninger.utgifter.barn.annet",
        sortKey: 29,
    },
    SKATTEMELDING: {
        formVariant: "ingen",
        textKey: "opplysninger.generell.skattemelding",
        sortKey: 30,
    },
    OPPHOLDSTILLATELSE: {
        formVariant: "ingen",
        textKey: "opplysninger.oppholdstillatelse.oppholdstillatelse",
        sortKey: 31,
    },
    UTGIFTER_ANDRE_UTGIFTER: {
        formVariant: "belopBeskrivelse",
        textKey: "opplysninger.ekstrainfo.utgifter",
        sortKey: 32,
    },
    // Brukes ikke, men "må" med pga. kort søknad
    BEHOV: {
        formVariant: "ingen",
        textKey: "opplysninger.oppholdstillatelse.oppholdstillatelse",
        sortKey: 33,
    },
    // Brukes som et "mellomled", dette pga. av at JOBB blir slettet pga. noe med skatteetatenSamtykke i backend,
    // og dette medfører til at når søker velger kategori JOBB for opplastet dokument så krasjer alt.
    LONNSLIPP: {
        formVariant: "ingen",
        textKey: "opplysninger.oppholdstillatelse.oppholdstillatelse",
        sortKey: 34,
    },
} as const satisfies Record<DokumentasjonDtoType, OpplysningSpec>;
type OpplysningSpecMap = typeof opplysningSpec;
type FormVariants = OpplysningSpecMap[keyof OpplysningSpecMap]["formVariant"];

// Utility type: Gir alle dokumentasjonstyper som har en spesifisert formVariant
export type DokumentasjonTypesForVariant<Variant extends FormVariants> = {
    [K in keyof OpplysningSpecMap]: OpplysningSpecMap[K]["formVariant"] extends Variant ? K : never;
}[keyof OpplysningSpecMap];
