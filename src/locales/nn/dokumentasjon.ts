import {VedleggFrontendType} from "../../generated/model";
import {DokumentStrenger} from "../types";
export const dokumentasjon: Record<VedleggFrontendType, DokumentStrenger> = {
    "lonnslipp|arbeid": {
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
    "sluttoppgjor|arbeid": {
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
    "student|vedtak": {
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
    "barnebidrag|betaler": {
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
    "barnebidrag|mottar": {
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
    "samvarsavtale|barn": {
        slettet: "Vi har sletta dokumentet knytt til samværsavtale, då det ikkje lenger er relevant.",
        sporsmal: "Ettersom du har samvær med barnet ditt, ber vi deg om å laste opp",
        dokumentBeskrivelse: "Samværsavtale eller avtale om delt bustad",
    },
    "husleiekontrakt|husleiekontrakt": {
        slettet: "Vi har sletta dokumentet knytt til leigekontrakt, då du har svart at du ikkje lenger leiger.",
        sporsmal: "Då du leiger ein bustad, ber vi om dokumentasjon",
        dokumentBeskrivelse: "Husleigekontrakt",
    },
    "husleiekontrakt|kommunal": {
        slettet: "Vi har sletta dokumentet knytt til kommunal bustad, då du har svart at du ikkje lenger har dette.",
        sporsmal: "Då du leiger ein kommunal bustad, ber vi om dokumentasjon",
        dokumentBeskrivelse: "Husleigekontrakt",
    },
    "husbanken|vedtak": {
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
    "kontooversikt|brukskonto": {
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
    "kontooversikt|bsu": {
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
    "kontooversikt|sparekonto": {
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
    "kontooversikt|livsforsikring": {
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
    "kontooversikt|aksjer": {
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
    "kontooversikt|annet": {
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
    "dokumentasjon|utbytte": {
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
    "salgsoppgjor|eiendom": {
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
    "dokumentasjon|forsikringsutbetaling": {
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
    "dokumentasjon|annetinntekter": {
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
    "faktura|husleie": {
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
    "faktura|strom": {
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
    "faktura|kommunaleavgifter": {
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
    "faktura|oppvarming": {
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
    "nedbetalingsplan|avdraglaan": {
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
    "dokumentasjon|annetboutgift": {
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
    "faktura|fritidsaktivitet": {
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
    "faktura|barnehage": {
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
    "faktura|sfo": {
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
    "faktura|tannbehandling": {
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
    "faktura|annetbarnutgift": {
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
    "skattemelding|skattemelding": {
        slettet: "Vi har sletta dokumentet knytt til skattemelding, då det ikkje lenger er relevant.",
        sporsmal: "Vi ber om at du dokumenterer skattemelding og skatteoppgjer frå det siste året",
        dokumentBeskrivelse: "Last opp skattemelding og skatteoppgjer",
    },
    "oppholdstillatel|oppholdstillatel": {
        sporsmal: "Registreringsbevis eller opphaldsløyve",
        dokumentBeskrivelse:
            "Vi ber om at du lastar opp registreringsbevis/opphaldsløyve som dokumenterer opphaldet i Noreg.",
    },
    "annet|annet": {
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
};

export default dokumentasjon;
