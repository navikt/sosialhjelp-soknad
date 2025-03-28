import {DokumentasjonTexts} from "../types";
import {type DokumentasjonDtoType} from "../../generated/new/model";

export const dokumentasjon: Record<DokumentasjonDtoType, DokumentasjonTexts> = {
    JOBB: {
        brutto: {
            label: "Løn før skatt siste månad",
        },
        bruttolonn: {
            label: "Løn før skatt siste månad",
        },
        leggtil: "Skriv inn beløp (valfri)",
        netto: {
            label: "Løn etter skatt siste månad",
        },
        nettolonn: {
            label: "Løn etter skatt siste månad",
        },
        slettet: "Vi har sletta dokumentet knytt til løn, då det ikkje lenger er relevant.",
        sporsmal: "Kva får du i løn?",
        undertekst: "Oppgi løn for alle arbeidsforhold",
        dokumentBeskrivelse: "Eller last opp lønsslipp (siste månad)",
    },
    SLUTTOPPGJOER: {
        belop: {
            label: "Beløp etter skatt",
        },
        brutto: {
            label: "Sluttoppgjer/feriepengar før skatt",
        },
        leggtil: "Legg til beløp",
        netto: {
            label: "Beløp etter skatt",
        },
        slettet: "Vi har sletta dokumentet knytt til sluttoppgjer, då det ikkje lenger er relevant.",
        sporsmal: "Kor mykje har du fått utbetalt i sluttoppgjer/feriepengar?",
        dokumentBeskrivelse: "Sluttoppgjer",
    },
    STUDIELAN_INNTEKT: {
        belop: {
            label: "Beløp siste månad",
        },
        slettet: "Vi har sletta dokumentet knytt til lån/stipend, då du har svart at du ikkje lenger får dette.",
        sporsmal: "Kor mykje får du i lån/stipend per månad?",
        utbetaling: {
            label: "Beløp siste månad",
        },
        dokumentBeskrivelse: "Last opp vedtak frå Lånekassen",
    },
    BARNEBIDRAG_BETALER: {
        belop: {
            label: "Beløp",
        },
        betaler: {
            label: "Beløp",
        },
        slettet:
            "Vi har sletta dokumentet knytt til barnebidrag, då du har svart at du ikkje lenger betaler barnebidrag.",
        sporsmal: "Kor mykje betaler du i barnebidrag per månad?",
        dokumentBeskrivelse: "Last opp opplysningar om utgifter til barnebidrag",
    },
    BARNEBIDRAG_MOTTAR: {
        belop: {
            label: "Beløp",
        },
        mottar: {
            label: "Beløp",
        },
        slettet: "Vi har sletta dokumentet knytt til barnebidrag, då du har svart at du ikkje lenger får barnebidrag.",
        sporsmal: "Kor mykje får du i barnebidrag per månad?",
        dokumentBeskrivelse: "Opplysningar om motteke bidrag",
    },
    SAMVARSAVTALE: {
        slettet: "Vi har sletta dokumentet knytt til samværsavtale, då det ikkje lenger er relevant.",
        sporsmal: "Ettersom du har samvær med barnet ditt, ber vi deg om å laste opp",
        dokumentBeskrivelse: "Samværsavtale eller avtale om delt bustad",
    },
    HUSLEIEKONTRAKT: {
        slettet: "Vi har sletta dokumentet knytt til leigekontrakt, då du har svart at du ikkje lenger leiger.",
        sporsmal: "Husleigekontrakt",
        dokumentBeskrivelse: "",
    },
    HUSLEIEKONTRAKT_KOMMUNAL: {
        slettet: "Vi har sletta dokumentet knytt til kommunal bustad, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Husleigekontrakt",
        dokumentBeskrivelse: "",
    },
    UTBETALING_HUSBANKEN: {
        belop: {
            label: "Beløp siste månad",
        },
        slettet: "Vi har sletta dokumentet knytt til bustøtte, då du har svart at du ikkje lenger får dette.",
        sporsmal: "Kva har du fått i bustøtte frå Husbanken?",
        utbetaling: {
            label: "Beløp siste månad",
        },
        dokumentBeskrivelse: "Vedtak om bustøtte for siste 2 mnd.",
    },
    FORMUE_BRUKSKONTO: {
        belop: {
            label: "Saldo brukskonto",
        },
        leggtil: "Legg til brukskonto",
        saldo: {
            label: "Saldo",
        },
        slettet: "Vi har sletta dokumentet knytt til brukskonto, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kva er saldoen på brukskontoen din?",
        undertekst: "Oppgi for kvar brukskonto",
        dokumentBeskrivelse: "Last opp saldoutskrift for brukskonto (på søknadstidspunktet)",
    },
    FORMUE_BSU: {
        belop: {
            label: "Saldo",
        },
        leggtil: "Legg til BSU-konto",
        saldo: {
            label: "Saldo",
        },
        slettet: "Vi har sletta dokumentet knytt til BSU, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kva er saldoen på BSU-kontoen din?",
        dokumentBeskrivelse: "Last opp saldoutskrift for BSU (på søknadstidspunktet)",
    },
    FORMUE_SPAREKONTO: {
        belop: {
            label: "Saldo",
        },
        leggtil: "Legg til sparekonto",
        saldo: {
            label: "Saldo",
        },
        slettet: "Vi har sletta dokumentet knytt til sparekonto, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kva er saldoen på sparekontoen din?",
        undertekst: "Oppgi saldo per sparekonto",
        dokumentBeskrivelse: "Last opp saldoutskrift for sparekonto (på søknadstidspunktet)",
    },
    FORMUE_LIVSFORSIKRING: {
        belop: {
            label: "Saldo",
        },
        leggtil: "Legg til saldo",
        saldo: {
            label: "Saldo",
        },
        slettet: "Vi har sletta dokumentet knytt til livsforsikring, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kva er saldoen på livsforsikringa di med sparedel?",
        dokumentBeskrivelse: "Last opp dokumentasjon på livsforsikring",
    },
    FORMUE_VERDIPAPIRER: {
        belop: {
            label: "Saldo",
        },
        leggtil: "Legg til saldo",
        saldo: {
            label: "Saldo",
        },
        slettet: "Vi har sletta dokumentet knytt til aksjar, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kva er saldoen på aksjane, obligasjonane eller fonda dine?",
        dokumentBeskrivelse: "Last opp saldoutskrift frå VPS-konto",
    },
    FORMUE_ANNET: {
        belop: {
            label: "Saldo",
        },
        leggtil: "Legg til saldo",
        saldo: {
            label: "Saldo",
        },
        slettet: "Vi har sletta dokumentet knytt til andre bankkontoar, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kva er saldoen på andre bankkontoar eller spareordningar du har?",
        dokumentBeskrivelse: "Last opp opplysningar om andre bankinnskot eller sparing",
    },
    UTBETALING_UTBYTTE: {
        belop: {
            label: "Sum",
        },
        leggtil: "Legg til utbyte",
        slettet: "Vi har sletta dokumentet knytt til utbyte, då du har svart at du ikkje lenger får dette.",
        sporsmal: "Kva har du fått i utbyte frå aksjar, obligasjonar eller fond?",
        sum: {
            label: "Sum",
        },
        dokumentBeskrivelse: "Last opp opplysningar om utbyte",
    },
    UTBETALING_SALG: {
        belop: {
            label: "Salssum",
        },
        leggtil: "Legg til salssum",
        slettet: "Vi har sletta dokumentet knytt til sal, då du har svart at dette ikkje lenger er aktuelt.",
        sporsmal: "Kva har du fått i salssum for eigedom og/eller eigedelar?",
        sum: {
            label: "Salssum",
        },
        dokumentBeskrivelse: "Last opp opplysningar om salsoppgjer",
    },
    UTBETALING_FORSIKRING: {
        belop: {
            label: "Sum",
        },
        leggtil: "Legg til utbetaling",
        slettet:
            "Vi har sletta dokumentet knytt til forsikringsutbetalingar, då du har svart at du ikkje lenger får dette.",
        sporsmal: "Kor mykje har du fått i forsikringsutbetalingar?",
        sum: {
            label: "Sum",
        },
        undertekst: "Oppgi totalt beløp",
        dokumentBeskrivelse: "Dokumentasjon på forsikringsutbetaling",
    },
    UTBETALING_ANNET: {
        belop: {
            label: "Sum",
        },
        leggtil: "Legg til utbetaling",
        slettet: "Vi har sletta dokumentet knytt til andre utbetalingar, då du har svart at du ikkje lenger får dette.",
        sporsmal: "Du har svart at du har fått andre utbetalingar",
        sum: {
            label: "Sum",
        },
        dokumentBeskrivelse: "Last opp opplysningar om andre utbetalingar",
    },
    UTGIFTER_HUSLEIE: {
        belop: {
            label: "Beløp per månad",
        },
        permnd: {
            label: "Beløp per månad",
        },
        slettet: "Vi har sletta dokumentet knytt til husleige, då du har svart at du ikkje lenger betaler dette.",
        sporsmal: "Kor mykje betaler du i husleige per månad?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på husleige",
    },
    UTGIFTER_STROM: {
        belop: {
            label: "Beløp siste rekning",
        },
        sisteregning: {
            label: "Beløp siste rekning",
        },
        slettet:
            "Vi har sletta dokumentet knytt til utgifter til straum, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kor mykje betaler du for straum?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på straum",
    },
    UTGIFTER_KOMMUNAL_AVGIFT: {
        belop: {
            label: "Beløp siste rekning",
        },
        sisteregning: {
            label: "Beløp siste rekning",
        },
        slettet:
            "Vi har sletta dokumentet knytt til kommunale avgifter, då du har svart at du ikkje lenger betaler dette.",
        sporsmal: "Kor mykje betaler du i kommunale avgifter?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på kommunale avgifter",
    },
    UTGIFTER_OPPVARMING: {
        belop: {
            label: "Beløp siste rekning",
        },
        sisteregning: {
            label: "Beløp siste rekning",
        },
        slettet:
            "Vi har sletta dokumentet knytt til utgifter til oppvarming, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kor mykje betaler du for oppvarming (ikkje medrekna straum)?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på oppvarming",
    },
    UTGIFTER_BOLIGLAN: {
        avdrag: {
            label: "Månadlege avdrag",
        },
        leggtil: "Legg til bustadlån",
        renter: {
            label: "Månadlege renter",
        },
        slettet:
            "Vi har sletta dokumentet knytt til avdrag og renter på lån, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kor mykje betaler du i avdrag og renter på bustadlånet ditt?",
        dokumentBeskrivelse: "Last opp ledbetalingsplan",
    },
    UTGIFTER_ANNET_BO: {
        belop: {
            label: "Beløp buutgift",
        },
        beskrivelse: {
            label: "Type buutgift",
        },
        leggtil: "Legg til buutgift",
        sisteregning: {
            label: "Beløp buutgift",
        },
        slettet: "Vi har sletta dokumentet knytt til andre buutgifter, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kva andre buutgifter har du?",
        type: {
            label: "Type buutgift",
        },
        dokumentBeskrivelse: "Last opplysningar om andre buutgifter",
    },
    UTGIFTER_BARN_FRITIDSAKTIVITETER: {
        belop: {
            label: "Beløp siste rekning",
        },
        beskrivelse: {
            label: "Beskriving av aktivitet",
        },
        leggtil: "Legg til aktivitet",
        sisteregning: {
            label: "Beløp siste rekning",
        },
        slettet:
            "Vi har sletta dokumentet knytt til utgifter til barnefritidsaktivitetar, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kva utgifter har du til fritidsaktivitetar for barn?",
        type: {
            label: "Beskriving av aktivitet",
        },
        dokumentBeskrivelse: "Last opp kvittering/faktura på fritidsaktivitet",
    },
    UTGIFTER_BARNEHAGE: {
        belop: {
            label: "Beløp siste månad",
        },
        leggtil: "Legg til barnehage",
        sistemnd: {
            label: "Beløp siste månad",
        },
        slettet: "Vi har sletta dokumentet knytt til barnehageutgifter, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kor mykje betaler du for barnehage?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på barnehage",
    },
    UTGIFTER_SFO: {
        belop: {
            label: "Beløp siste månad",
        },
        leggtil: "Legg til SFO",
        sistemnd: {
            label: "Beløp siste månad",
        },
        slettet: "Vi har sletta dokumentet knytt til utgifter til SFO, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kor mykje betaler du for SFO (skulefritidsordning)?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på SFO",
    },
    UTGIFTER_BARN_TANNREGULERING: {
        belop: {
            label: "Beløp siste rekning",
        },
        leggtil: "Legg til rekning",
        sisteregning: {
            label: "Beløp siste rekning",
        },
        slettet:
            "Vi har sletta dokumentet knytt til utgifter til tannbehandling, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kor mykje betaler du for tannregulering for barn?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på tannregulering",
    },
    UTGIFTER_ANNET_BARN: {
        belop: {
            label: "Beløp siste rekning",
        },
        beskrivelse: {
            label: "Type utgift",
        },
        leggtil: "Legg til utgift",
        sisteregning: {
            label: "Beløp siste rekning",
        },
        slettet:
            "Vi har sletta dokumentet knytt til andre barneutgifter, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Kva andre utgifter har du til barn?",
        type: {
            label: "Type utgift",
        },
        dokumentBeskrivelse: "Last opp kvittering/faktura på andre barneutgifter",
    },
    SKATTEMELDING: {
        slettet: "Vi har sletta dokumentet knytt til skattemelding, då det ikkje lenger er relevant.",
        sporsmal: "Vi ber om at du dokumenterer skattemelding og skatteoppgjer frå det siste året",
        dokumentBeskrivelse: "Last opp skattemelding og skatteoppgjer",
    },
    OPPHOLDSTILLATELSE: {
        sporsmal: "Registreringsbevis eller opphaldsløyve",
        dokumentBeskrivelse:
            "Vi ber om at du lastar opp registreringsbevis/opphaldsløyve som dokumenterer opphaldet i Noreg.",
    },
    UTGIFTER_ANDRE_UTGIFTER: {
        belop: {
            label: "Beløp på utgift",
        },
        beskrivelse: {
            label: "Beskriv kort kva det er",
        },
        leggtil: "Legg til utgift",
        slettet: "Vi har sletta dokumentet knytt til andre utgifter, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Andre utgifter",
        utgift: {
            label: "Eventuell utgift",
        },
        dokumentInfo: "Dersom du har annen dokumentasjon du vil at vi skal sjå på, kan du laste dei opp her",
        dokumentBeskrivelse: "Last opp annen dokumentasjon",
    },
    BEHOV: {sporsmal: "", dokumentBeskrivelse: ""},
};

export default dokumentasjon;
