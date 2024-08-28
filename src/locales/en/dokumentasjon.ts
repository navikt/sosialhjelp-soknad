import {VedleggFrontendType} from "../../generated/model";
import {DokumentasjonTexts} from "../types";

export type VedleggFrontendTypeMinusUferdig = Exclude<VedleggFrontendType, "kort|behov" | "kort|situasjonsendring">;

export const dokumentasjon: Record<VedleggFrontendTypeMinusUferdig, DokumentasjonTexts> = {
    "lonnslipp|arbeid": {
        brutto: {
            label: "Wages before tax last month",
        },
        bruttolonn: {
            label: "Wages before tax last month",
        },
        leggtil: "Enter paycheck amount (optional)",
        netto: {
            label: "Wages after tax last month",
        },
        nettolonn: {
            label: "Wages after tax last month",
        },
        slettet: "We have deleted the documentation relating to wages as it is no longer relevant.",
        sporsmal: "How much do you receive in wages?",
        undertekst: "State wages for all work situations",
        dokumentBeskrivelse: "Or upload wage slip (last month)",
    },
    "sluttoppgjor|arbeid": {
        belop: {
            label: "Amount after tax",
        },
        brutto: {
            label: "Final settlement/holiday pay before tax",
        },
        leggtil: "Add amount",
        netto: {
            label: "Amount after tax",
        },
        slettet: "We have deleted the documentation relating to the final settlement as it is no longer relevant.",
        sporsmal: "How much have you received in final settlement/holiday pay?",
        dokumentBeskrivelse: "Final settlement",
    },
    "student|vedtak": {
        belop: {
            label: "Amount last month",
        },
        slettet:
            "We have deleted the documentation relating to loans/bursaries as you have no longer responded you receive these.",
        sporsmal: "How much in loan/bursary do you receive per month?",
        utbetaling: {
            label: "Amount last month",
        },
        dokumentBeskrivelse: "Upload decision from Lånekassen",
    },
    "barnebidrag|betaler": {
        belop: {
            label: "Amount",
        },
        betaler: {
            label: "Amount",
        },
        slettet:
            "We have deleted the documentation relating to child support as you have no longer responded that you pay child support.",
        sporsmal: "How much do you pay in child support per month?",
        dokumentBeskrivelse: "Upload information concerning child support expense",
    },
    "barnebidrag|mottar": {
        belop: {
            label: "Amount",
        },
        mottar: {
            label: "Amount",
        },
        slettet:
            "We have deleted the attachment relating to child support as you have no longer responded that you receive child support.",
        sporsmal: "How much do you receive in child support per month?",
        dokumentBeskrivelse: "Information concerning received child support",
    },
    "samvarsavtale|barn": {
        slettet: "We have deleted the documentation relating to visitation agreement as it is no longer relevant.",
        sporsmal: "You have visits with your child, we therefore ask that you upload",
        dokumentBeskrivelse: "Visitation agreement, or agreement on shared residence",
    },
    "husleiekontrakt|husleiekontrakt": {
        slettet:
            "We have deleted the documentation relating to tenancy agreement as you have no longer responded that you rent.",
        sporsmal: "You rent a housing; therefore, we ask that you document",
        dokumentBeskrivelse: "Tenancy agreement",
    },
    "husleiekontrakt|kommunal": {
        slettet:
            "We have documentation the attachment relating to municipal housing as you have no longer responded you have it.",
        sporsmal: "You rent a municipal housing; therefore, we ask that you document",
        dokumentBeskrivelse: "Tenancy agreement",
    },
    "husbanken|vedtak": {
        belop: {
            label: "Amount last month",
        },
        slettet:
            "We have deleted the document relating to housing allowance as you have no longer responded you receive it.",
        sporsmal: "How much have you received in housing allowance from Husbanken?",
        utbetaling: {
            label: "Amount last month",
        },
        dokumentBeskrivelse: "Decision on housing allowance for last 2 months",
    },
    "kontooversikt|brukskonto": {
        belop: {
            label: "Balance in current account",
        },
        leggtil: "Add current account",
        saldo: {
            label: "Balance",
        },
        slettet:
            "We have deleted the document relating to current account as you have no longer responded you have it.",
        sporsmal: "What is the balance in your current account?",
        undertekst: "State the balance for all current accounts",
        dokumentBeskrivelse: "Upload balance statement for current account (at the time of application)",
    },
    "kontooversikt|bsu": {
        belop: {
            label: "Balance",
        },
        leggtil: "Add BSU account",
        saldo: {
            label: "Balance",
        },
        slettet: "We have deleted the document relating to BSU as you have no longer responded you have it.",
        sporsmal: "What is the balance in your BSU account?",
        dokumentBeskrivelse: "Upload balance statement for BSU (at the time of application)",
    },
    "kontooversikt|sparekonto": {
        belop: {
            label: "Balance",
        },
        leggtil: "Add savings account",
        saldo: {
            label: "Balance",
        },
        slettet:
            "We have deleted the document relating to savings account as you have no longer responded you have it.",
        sporsmal: "What is the balance in your savings account?",
        undertekst: "State the balance of all savings accounts",
        dokumentBeskrivelse: "Upload balance statement for savings account(s) (at the time of application)",
    },
    "kontooversikt|livsforsikring": {
        belop: {
            label: "Balance",
        },
        leggtil: "Add balance",
        saldo: {
            label: "Balance",
        },
        slettet: "We have deleted the document relating to life insurance as you have no longer responded you have it.",
        sporsmal: "What is the balance in your life insurance with savings plan?",
        dokumentBeskrivelse: "Upload documentation concerning life insurance",
    },
    "kontooversikt|aksjer": {
        belop: {
            label: "Balance ",
        },
        leggtil: "Add balance",
        saldo: {
            label: "Balance",
        },
        slettet: "We have deleted the document relating to shares as you have no longer responded you have them.",
        sporsmal: "What is the balance on your shares, bonds funds?",
        dokumentBeskrivelse: "Upload balance statement from VPS account",
    },
    "kontooversikt|annet": {
        belop: {
            label: "Balance",
        },
        leggtil: "Add balance",
        saldo: {
            label: "Balance",
        },
        slettet:
            "We have deleted the document relating to other bank accounts, as you have no longer responded you have them.",
        sporsmal: "What is the balance in other bank accounts or savings schemes?",
        dokumentBeskrivelse: "Upload information about other bank deposits or savings",
    },
    "dokumentasjon|utbytte": {
        belop: {
            label: "Amount",
        },
        leggtil: "Add dividends",
        slettet: "We have deleted the document relating to dividends as you have no longer responded you receive them.",
        sporsmal: "How much have you received in dividends from shares, bonds or funds?",
        sum: {
            label: "Amount",
        },
        dokumentBeskrivelse: "Upload information concerning dividends",
    },
    "salgsoppgjor|eiendom": {
        belop: {
            label: "Sales sum",
        },
        leggtil: "Add sales sum",
        slettet: "We have deleted the attachment relating to sales as you have no longer responded you receive it.",
        sporsmal: "How much have you received in sales sum for property and/or assets?",
        sum: {
            label: "Sales sum",
        },
        dokumentBeskrivelse: "Upload information concerning sale settlement",
    },
    "dokumentasjon|forsikringsutbetaling": {
        belop: {
            label: "Amount",
        },
        leggtil: "Add payout",
        slettet:
            "We have deleted the document relating to insurance payouts as you have no longer responded you receive them.",
        sporsmal: "How much have you received in insurance payouts?",
        sum: {
            label: "Amount",
        },
        undertekst: "Enter total amount",
        dokumentBeskrivelse: "Upload information concerning insurance payouts",
    },
    "dokumentasjon|annetinntekter": {
        belop: {
            label: "Amount",
        },
        leggtil: "Add other payments",
        slettet:
            "We have deleted the document relating to other payments, as you have no longer responded you receive them.",
        sporsmal: "You have responded that you have received other payments",
        sum: {
            label: "Amount",
        },
        dokumentBeskrivelse: "Upload information concerning other payments",
    },
    "faktura|husleie": {
        belop: {
            label: "Amount per month",
        },
        permnd: {
            label: "Amount per month",
        },
        slettet: "We have deleted the document relating to rent as you have no longer responded you have them.",
        sporsmal: "How much do you pay in rent per month?",
        dokumentBeskrivelse: "Upload receipt/invoice for rent",
    },
    "faktura|strom": {
        belop: {
            label: "Amount last expense",
        },
        sisteregning: {
            label: "Amount last expense",
        },
        slettet:
            "We have deleted the document relating to electricity expenses as you have no longer responded you have them.",
        sporsmal: "How much do you pay for electricity?",
        dokumentBeskrivelse: "Upload receipt/invoice for electricity",
    },
    "faktura|kommunaleavgifter": {
        belop: {
            label: "Amount last expense",
        },
        sisteregning: {
            label: "Amount last expense",
        },
        slettet:
            "We have deleted the document relating to municipal charges as you have no longer responded you have them.",
        sporsmal: "How much do you pay in municipal charges?",
        dokumentBeskrivelse: "Upload receipt/invoice for municipal charges",
    },
    "faktura|oppvarming": {
        belop: {
            label: "Amount last expense",
        },
        sisteregning: {
            label: "Amount last expense",
        },
        slettet:
            "We have deleted the document relating to heating expenses as you have no longer responded you have them.",
        sporsmal: "How much do you pay for heating (excluding electricity)?",
        dokumentBeskrivelse: "Upload receipt/invoice for heating",
    },
    "nedbetalingsplan|avdraglaan": {
        avdrag: {
            label: "Monthly instalments",
        },
        leggtil: "Add home loan",
        renter: {
            label: "Monthly interest",
        },
        slettet:
            "We have deleted the document relating to instalments and interest on loans as you have no longer responded you have them.",
        sporsmal: "How much do you pay in instalments and interest on your home loan?",
        dokumentBeskrivelse: "Upload instalment plan",
    },
    "dokumentasjon|annetboutgift": {
        belop: {
            label: "Amount of housing expenses",
        },
        beskrivelse: {
            label: "Type of housing expenses",
        },
        leggtil: "Add housing expenses",
        sisteregning: {
            label: "Amount of housing expenses",
        },
        slettet:
            "We have deleted the document relating to other housing expenses as you have no longer responded you have them.",
        sporsmal: "Which other types of housing expenses do you have?",
        type: {
            label: "Type of housing expenses",
        },
        dokumentBeskrivelse: "Upload information concerning other housing expenses",
    },
    "faktura|fritidsaktivitet": {
        belop: {
            label: "Amount last expense",
        },
        beskrivelse: {
            label: "Description of activity",
        },
        leggtil: "Add activity",
        sisteregning: {
            label: "Amount last expense",
        },
        slettet:
            "We have deleted the document relating to children’s recreational activities as you have no longer responded you have it.",
        sporsmal: "How much of expenses do you have for children’s recreational activities?",
        type: {
            label: "Description of activity",
        },
        dokumentBeskrivelse: "Upload receipt/invoice from recreational activity",
    },
    "faktura|barnehage": {
        belop: {
            label: "Amount last month",
        },
        leggtil: "Add kindergarten",
        sistemnd: {
            label: "Amount last month",
        },
        slettet:
            "We have deleted the document relating to kindergarten expenses as you have no longer responded you have them.",
        sporsmal: "How much do you pay for kindergarten?",
        dokumentBeskrivelse: "Upload receipt/invoice from kindergarten",
    },
    "faktura|sfo": {
        belop: {
            label: "Amount last month",
        },
        leggtil: "Add after-school club",
        sistemnd: {
            label: "Amount last month",
        },
        slettet:
            "We have deleted the document relating to after-school club as you have no longer responded you have it.",
        sporsmal: "How much do you pay for after-school club?",
        dokumentBeskrivelse: "Upload receipt/invoice from after-school club",
    },
    "faktura|tannbehandling": {
        belop: {
            label: "Amount last expense",
        },
        leggtil: "Add expense",
        sisteregning: {
            label: "Amount last expense",
        },
        slettet:
            "We have deleted the document relating to dental treatment expenses as you have no longer responded you have them.",
        sporsmal: "How much do you pay for orthodontic treatment for children?",
        dokumentBeskrivelse: "Upload receipt/invoice for orthodontic treatment",
    },
    "faktura|annetbarnutgift": {
        belop: {
            label: "Amount last expense",
        },
        beskrivelse: {
            label: "Type of expense",
        },
        leggtil: "Add expense",
        sisteregning: {
            label: "Amount last expense",
        },
        slettet:
            "We have deleted the document relating to other child expenses, as you have no longer responded you have them.",
        sporsmal: "Which other expenses do you have for children?",
        type: {
            label: "Type of expense",
        },
        dokumentBeskrivelse: "Upload receipt/invoice for other children expenses",
    },
    "skattemelding|skattemelding": {
        slettet: "We have deleted the documentation relating to tax return as it is no longer relevant.",
        sporsmal: "Please document tax return and tax settlement from the last year.",
        dokumentBeskrivelse: "Upload tax return and tax settlement",
    },
    "oppholdstillatel|oppholdstillatel": {
        sporsmal: "Registration certificate or residence permit",
        dokumentBeskrivelse:
            "We ask that you upload your registration certificate/residence permit documenting your residence in Norway.",
    },
    "annet|annet": {
        belop: {
            label: "Expenditure amount",
        },
        beskrivelse: {
            label: "Provide brief details",
        },
        leggtil: "Add expense",
        slettet:
            "We have deleted the documentation relating to other expenses as you have no longer responded you have them.",
        sporsmal: "Other expenses",
        utgift: {
            label: "Expense (if applicable)",
        },
        dokumentInfo: "If you have other attachments you wish to send, they can be uploaded here.",
        dokumentBeskrivelse: "Upload other information",
    },
};

export default dokumentasjon;
