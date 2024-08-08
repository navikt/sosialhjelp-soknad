import {VedleggFrontendType} from "../../generated/client/model";
import {DokumentasjonTexts} from "../types";

export type VedleggFrontendTypeMinusUferdig = Exclude<VedleggFrontendType, "kort|behov" | "kort|situasjonsendring">;

export const dokumentasjon: Record<VedleggFrontendTypeMinusUferdig, DokumentasjonTexts> = {
    "lonnslipp|arbeid": {
        brutto: {
            label: "Lønn før skatt siste måned",
        },
        bruttolonn: {
            label: "Lønn før skatt siste måned",
        },
        leggtil: "Skriv inn beløp (valgfritt)",
        netto: {
            label: "Lønn etter skatt siste måned",
        },
        nettolonn: {
            label: "Lønn etter skatt siste måned",
        },
        slettet: "Vi har slettet dokumentet tilknyttet lønn fordi det ikke lenger er relevant.",
        sporsmal: "Hva mottar du i lønn?",
        undertekst: "Oppgi lønn for alle arbeidsplasser",
        dokumentBeskrivelse: "Eller last opp lønnsslipp (siste måned)",
    },
    "sluttoppgjor|arbeid": {
        belop: {
            label: "Beløp etter skatt",
        },
        brutto: {
            label: "Sluttoppgjør/feriepenger før skatt",
        },
        leggtil: "Legg til beløp",
        netto: {
            label: "Beløp etter skatt",
        },
        slettet: "Vi har slettet dokumentet tilknyttet sluttoppgjør fordi det ikke lenger er relevant.",
        sporsmal: "Hvor mye har du fått utbetalt i sluttoppgjør/feriepenger?",
        dokumentBeskrivelse: "Sluttoppgjør",
    },
    "student|vedtak": {
        belop: {
            label: "Beløp siste måned",
        },
        slettet: "Vi har slettet dokumentet tilknyttet lån/stipend fordi du ikke lenger har svart at du får det.",
        sporsmal: "Hvor mye lån/stipend får du per måned?",
        utbetaling: {
            label: "Beløp siste måned",
        },
        dokumentBeskrivelse: "Last opp vedtak fra Lånekassen",
    },
    "barnebidrag|betaler": {
        belop: {
            label: "Beløp",
        },
        betaler: {
            label: "Beløp",
        },
        slettet:
            "Vi har slettet dokumentet tilknyttet barnebidrag fordi du ikke lenger har svart at du betaler barnebidrag.",
        sporsmal: "Hvor mye betaler du i barnebidrag i måneden?",
        dokumentBeskrivelse: "Last opplysninger for utgift barnebidrag",
    },
    "barnebidrag|mottar": {
        belop: {
            label: "Beløp",
        },
        mottar: {
            label: "Beløp",
        },
        slettet:
            "Vi har slettet dokumentet tilknyttet barnebidrag fordi du ikke lenger har svart at du mottar barnebidrag.",
        sporsmal: "Hvor mye mottar du i barnebidrag i måneden?",
        dokumentBeskrivelse: "Opplysninger for mottatt bidrag",
    },
    "samvarsavtale|barn": {
        slettet: "Vi har slettet dokumentet tilknyttet samvarsavtale fordi det ikke lenger er relevant.",
        sporsmal: "Du har samvær med barnet ditt, vi ber deg derfor laste opp",
        dokumentBeskrivelse: "Samværsavtale eller avtale om delt bosted",
    },
    "husleiekontrakt|husleiekontrakt": {
        slettet: "Vi har slettet vedlegget tilknyttet leiekontrakt fordi du ikke lenger har svart at du leier.",
        sporsmal: "Du leier bolig, vi ber deg derfor dokumentere",
        dokumentBeskrivelse: "Husleiekontrakt",
    },
    "husleiekontrakt|kommunal": {
        slettet: "Vi har slettet dokumentet tilknyttet kommunal bolig fordi du ikke lenger har svart at du har det.",
        sporsmal: "Du leier kommunal bolig, vi ber deg derfor dokumentere",
        dokumentBeskrivelse: "Husleiekontrakt",
    },
    "husbanken|vedtak": {
        belop: {
            label: "Beløp siste måned",
        },
        slettet: "Vi har slettet dokumentet tilknyttet bostøtte fordi du ikke lenger har svart at du får det.",
        sporsmal: "Hva har du mottatt i bostøtte fra Husbanken?",
        utbetaling: {
            label: "Beløp siste måned",
        },
        dokumentBeskrivelse: "Vedtak bostøtte for siste 2 mnd",
    },
    "kontooversikt|brukskonto": {
        belop: {
            label: "Saldo",
        },
        leggtil: "Legg til brukskonto",
        saldo: {
            label: "Saldo",
        },
        slettet: "Vi har slettet dokumentet tilknyttet brukskonto fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hva er saldoen på brukskontoen din?",
        undertekst: "Oppgi saldo for hver brukskonto",
        dokumentBeskrivelse: "Last opp saldoutskrift for brukskonto (på søknadstidspunktet)",
    },
    "kontooversikt|bsu": {
        belop: {
            label: "Saldo",
        },
        leggtil: "Legg til BSU konto",
        saldo: {
            label: "Saldo",
        },
        slettet: "Vi har slettet dokumentet tilknyttet bsu fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hva er saldo på din BSU konto?",
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
        slettet: "Vi har slettet dokumentet tilknyttet sparekonto fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hva er saldoen på sparekontoen din?",
        undertekst: "Oppgi saldo for hver sparekonto",
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
        slettet: "Vi har slettet dokumentet tilknyttet livsforsikring fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hva er saldo på din livsforsikring med sparedel?",
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
        slettet: "Vi har slettet dokumentet tilknyttet aksjer fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hva er saldo på dine aksjer, obligasjoner eller fond?",
        dokumentBeskrivelse: "Last opp saldoutskrift fra VPS-konto",
    },
    "kontooversikt|annet": {
        belop: {
            label: "Saldo",
        },
        leggtil: "Legg til saldo",
        saldo: {
            label: "Saldo",
        },
        slettet: "Vi har slettet dokumentet tilknyttet andre bankkontoer fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hva er saldo på andre bankkontoer eller spareordninger?",
        dokumentBeskrivelse: "Last opp opplysninger på andre bankinnskudd eller sparing",
    },
    "dokumentasjon|utbytte": {
        belop: {
            label: "Sum",
        },
        leggtil: "Legg til utbytte",
        slettet: "Vi har slettet dokumentet tilknyttet utbytte fordi du ikke lenger har svart at du får det.",
        sporsmal: "Hva har du mottatt i utbytte fra aksjer, obligasjoner eller fond?",
        sum: {
            label: "Sum",
        },
        dokumentBeskrivelse: "Last opp opplysninger på utbytte",
    },
    "salgsoppgjor|eiendom": {
        belop: {
            label: "Salgssum",
        },
        leggtil: "Legg til salgssum",
        slettet: "Vi har slettet dokumentet tilknyttet salg fordi du ikke lenger har svart at du får det.",
        sporsmal: "Hva har du mottatt i salgssum for eiendom og/eller eiendeler?",
        sum: {
            label: "Salgssum",
        },
        dokumentBeskrivelse: "Last opp opplysninger på salgsoppgjør",
    },
    "dokumentasjon|forsikringsutbetaling": {
        belop: {
            label: "Sum",
        },
        leggtil: "Legg til utbetaling",
        slettet:
            "Vi har slettet dokumentet tilknyttet forsikringsutbetalinger fordi du ikke lenger har svart at du får det.",
        sporsmal: "Hvor mye har du mottatt i forsikringsutbetalinger?",
        sum: {
            label: "Sum",
        },
        undertekst: "Oppgi totalt beløp",
        dokumentBeskrivelse: "Last opp opplysninger på forsikringsutbetaling",
    },
    "dokumentasjon|annetinntekter": {
        belop: {
            label: "Sum",
        },
        leggtil: "Legg til utbetaling",
        slettet:
            "Vi har slettet dokumentet tilknyttet andre utbetalinger fordi du ikke lenger har svart at du får det.",
        sporsmal: "Du har svart at du har mottatt andre utbetalinger",
        sum: {
            label: "Sum",
        },
        dokumentBeskrivelse: "Last opp opplysninger på andre utbetalinger",
    },
    "faktura|husleie": {
        belop: {
            label: "Beløp per måned",
        },
        permnd: {
            label: "Beløp per måned",
        },
        slettet: "Vi har slettet dokumentet tilknyttet husleie fordi du ikke lenger har svart at du betaler det.",
        sporsmal: "Hvor mye betaler du i husleie per måned?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på husleie",
    },
    "faktura|strom": {
        belop: {
            label: "Beløp siste regning",
        },
        sisteregning: {
            label: "Beløp siste regning",
        },
        slettet:
            "Vi har slettet dokumentet tilknyttet utgifter til strøm fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hvor mye betaler du for strøm?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på strøm",
    },
    "faktura|kommunaleavgifter": {
        belop: {
            label: "Beløp siste regning",
        },
        sisteregning: {
            label: "Beløp siste regning",
        },
        slettet:
            "Vi har slettet dokumentet tilknyttet kommunale avgifter fordi du ikke lenger har svart at du betaler det.",
        sporsmal: "Hvor mye betaler du i kommunale avgifter?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på kommunale avgifter",
    },
    "faktura|oppvarming": {
        belop: {
            label: "Beløp siste regning",
        },
        sisteregning: {
            label: "Beløp siste regning",
        },
        slettet:
            "Vi har slettet dokumentet tilknyttet utgifter til oppvarming fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hvor mye betaler du for oppvarming (ekskludert strøm)?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på oppvarming",
    },
    "nedbetalingsplan|avdraglaan": {
        avdrag: {
            label: "Månedlig avdrag",
        },
        leggtil: "Legg til boliglån",
        renter: {
            label: "Månedlig renter",
        },
        slettet:
            "Vi har slettet dokumentet tilknyttet avdrag og renter til lån fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hvor mye betaler du i avdrag og renter på boliglånet ditt?",
        dokumentBeskrivelse: "Last opp nedbetalingsplan",
    },
    "dokumentasjon|annetboutgift": {
        belop: {
            label: "Beløp boutgift",
        },
        beskrivelse: {
            label: "Type boutgift",
        },
        leggtil: "Legg til boutgift",
        sisteregning: {
            label: "Beløp boutgift",
        },
        slettet: "Vi har slettet dokumentet tilknyttet andre boutgifter fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hvilke andre boutgifter har du?",
        type: {
            label: "Type boutgift",
        },
        dokumentBeskrivelse: "Last opplysninger på andre boutgifter",
    },
    "faktura|fritidsaktivitet": {
        belop: {
            label: "Beløp siste regning",
        },
        beskrivelse: {
            label: "Beskrivelse av aktivitet",
        },
        leggtil: "Legg til aktivitet",
        sisteregning: {
            label: "Beløp siste regning",
        },
        slettet:
            "Vi har slettet dokumentet tilknyttet utgifter til barnefritidsaktiviteter fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hvilke utgifter har du til fritidsaktiviteter for barn?",
        type: {
            label: "Beskrivelse av aktivitet",
        },
        dokumentBeskrivelse: "Last opp kvittering/faktura på fritidsaktivitet",
    },
    "faktura|barnehage": {
        belop: {
            label: "Beløp siste måned",
        },
        leggtil: "Legg til barnehage",
        sistemnd: {
            label: "Beløp siste måned",
        },
        slettet: "Vi har slettet dokumentet tilknyttet barnehageutgifter fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hvor mye betaler du for barnehage?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på barnehage",
    },
    "faktura|sfo": {
        belop: {
            label: "Beløp siste måned",
        },
        leggtil: "Legg til SFO",
        sistemnd: {
            label: "Beløp siste måned",
        },
        slettet: "Vi har slettet dokumentet tilknyttet utgifter til sfo fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hvor mye betaler du for SFO (Skolefritidsordning)?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på SFO",
    },
    "faktura|tannbehandling": {
        belop: {
            label: "Beløp siste regning",
        },
        leggtil: "Legg til regning",
        sisteregning: {
            label: "Beløp siste regning",
        },
        slettet:
            "Vi har slettet dokumentet tilknyttet utgifter til tannbehandling fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hvor mye betaler du for tannregulering for barn?",
        dokumentBeskrivelse: "Last opp kvittering/faktura på tannregulering",
    },
    "faktura|annetbarnutgift": {
        belop: {
            label: "Beløp siste regning",
        },
        beskrivelse: {
            label: "Type utgift",
        },
        leggtil: "Legg til utgift",
        sisteregning: {
            label: "Beløp siste regning",
        },
        slettet:
            "Vi har slettet dokumentet tilknyttet andre barneutgifter fordi du ikke lenger har svart at du har det.",
        sporsmal: "Hvilke andre utgifter har du til barn?",
        type: {
            label: "Type utgift",
        },
        dokumentBeskrivelse: "Last opp kvittering/faktura på andre barneutgifter",
    },
    "skattemelding|skattemelding": {
        slettet: "Vi har slettet dokumentet tilknyttet skattemelding fordi det ikke lenger er relevant.",
        sporsmal: "Vi ber deg dokumentere skattemelding og skatteoppgjør fra det siste året",
        dokumentBeskrivelse: "Last opp skattemelding og skatteoppgjør",
    },
    "oppholdstillatel|oppholdstillatel": {
        sporsmal: "Registreringsbevis eller oppholdstillatelse",
        dokumentBeskrivelse:
            "Vi ber deg laste opp registreringsbevis/oppholdstillatelse som dokumenterer oppholdet i Norge.",
    },
    "annet|annet": {
        belop: {
            label: "Beløp på utgiften",
        },
        beskrivelse: {
            label: "Beskriv kort hva det er",
        },
        leggtil: "Legg til utgift",
        slettet: "Vi har slettet dokumentet tilknyttet andre utgifter fordi du ikke lenger har svart at du har det.",
        sporsmal: "Andre utgifter",
        utgift: {
            label: "Eventuell utgift",
        },
        dokumentInfo: "Hvis du har annen dokumentasjon du ønsker å gi oss, kan du lastes de opp her.",
        dokumentBeskrivelse: "Last opp annen dokumentasjon",
    },
};

export default dokumentasjon;
