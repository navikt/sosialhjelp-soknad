import {VedleggFrontendType} from "../../generated/model";
import {DokumentasjonTexts} from "../types";

export type VedleggFrontendTypeMinusUferdig = Exclude<VedleggFrontendType, "kort|behov" | "kort|situasjonsendring">;

export const dokumentasjon: Record<VedleggFrontendTypeMinusUferdig, DokumentasjonTexts> = {
    "lonnslipp|arbeid": {
        brutto: {
            label: "Income before tax last month",
        },
        bruttolonn: {
            label: "Income before tax last month",
        },
        leggtil: "State paycheck amount (optional)",
        netto: {
            label: "Income after tax last month",
        },
        nettolonn: {
            label: "Income after tax last month",
        },
        slettet: "We have deleted your documentation relating to income as it is no longer relevant.",
        sporsmal: "What is your income?",
        undertekst: "State your income for all work situations",
        dokumentBeskrivelse: "Upload information on income",
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
        dokumentBeskrivelse: "Upload final settlement",
    },
    "student|vedtak": {
        belop: {
            label: "Amount",
        },
        slettet:
            "We have deleted the documentation on loans/grants as you have no longer responded you receive these.",
        sporsmal: "How much in loan/grants do you receive per month from Lånekassen?",
        utbetaling: {
            label: "Amount",
        },
        dokumentBeskrivelse: "Upload letter of decision from Lånekassen",
    },
    "barnebidrag|betaler": {
        belop: {
            label: "Amount",
        },
        betaler: {
            label: "Amount",
        },
        slettet:
            "We have deleted the documentation on child support as you have no longer responded that you pay child support.",
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
            "We have deleted the documentation on child support as you have no longer responded that you receive child support.",
        sporsmal: "How much do you receive in child support per month?",
        dokumentBeskrivelse: "Upload information on received child support",
    },
    "samvarsavtale|barn": {
        slettet: "We have deleted the documentation on visitation agreement as it is no longer relevant.",
        sporsmal: "You have visits with your child, we therefore ask that you upload",
        dokumentBeskrivelse: "Upload visitation agreement, or agreement on shared residence",
    },
    "husleiekontrakt|husleiekontrakt": {
        slettet:
            "We have deleted the rental agreement for private home as you have no longer responded that you rent.",
        sporsmal: "Rental agreement",
        dokumentBeskrivelse: "Upload rental agreement",
    },
    "husleiekontrakt|kommunal": {
        slettet:
            "We have deleted the rental agreement for municipal home as you have no longer responded you have it.",
        sporsmal: "Rental agreement",
        dokumentBeskrivelse: "Upload rental agreement",
    },
    "husbanken|vedtak": {
        belop: {
            label: "Amount",
        },
        slettet:
            "We have deleted the documentation on housing allowance as you have no longer responded you receive it.",
        sporsmal: "How much do you receive in housing allowance from Husbanken?",
        utbetaling: {
            label: "Amount",
        },
        dokumentBeskrivelse: "Upload the last letter of decision on housing allowance",
    },
    "kontooversikt|brukskonto": {
        belop: {
            label: "Balance",
        },
        leggtil: "Add a current account",
        saldo: {
            label: "Balance",
        },
        slettet:
            "We have deleted the documentation on current account as you have no longer responded you have it.",
        sporsmal: "What is the balance in your current account?",
        undertekst: "State the balance in each current account",
        dokumentBeskrivelse: "Upload balance statement",
    },
    "kontooversikt|bsu": {
        belop: {
            label: "Balance",
        },
        leggtil: "Add a BSU account",
        saldo: {
            label: "Balance",
        },
        slettet: "We have deleted the documentation on BSU as you have no longer responded you have it.",
        sporsmal: "What is the balance in your BSU account?",
        dokumentBeskrivelse: "Upload balance statement",
    },
    "kontooversikt|sparekonto": {
        belop: {
            label: "Balance",
        },
        leggtil: "Add a savings account",
        saldo: {
            label: "Balance",
        },
        slettet:
            "We have deleted the documentation on savings account as you have no longer responded you have it.",
        sporsmal: "What is the balance in your savings account(s)?",
        undertekst: "State the balance in each savings account",
        dokumentBeskrivelse: "Upload balance statement",
    },
    "kontooversikt|livsforsikring": {
        belop: {
            label: "Balance",
        },
        leggtil: "Add balance",
        saldo: {
            label: "Balance",
        },
        slettet: "We have deleted the documentation on life insurance as you have no longer responded you have it.",
        sporsmal: "What is the balance in your life insurance?",
        dokumentBeskrivelse: "Upload documentation on life insurance",
    },
    "kontooversikt|aksjer": {
        belop: {
            label: "Balance ",
        },
        leggtil: "Add balance",
        saldo: {
            label: "Balance",
        },
        slettet: "We have deleted the documentation on shares as you have no longer responded you have them.",
        sporsmal: "What is the balance on your shares, bonds funds?",
        dokumentBeskrivelse: "Upload balance statement",
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
            "We have deleted the documentation on other bank accounts, as you have no longer responded you have them.",
        sporsmal: "What is the balance in other bank accounts or savings schemes?",
        dokumentBeskrivelse: "Upload information on other bank deposits or savings",
    },
    "dokumentasjon|utbytte": {
        belop: {
            label: "Amount",
        },
        leggtil: "Add dividends",
        slettet: "We have deleted the documentation on dividends as you have no longer responded you receive them.",
        sporsmal: "How much have you received in dividends from shares, bonds or funds?",
        sum: {
            label: "Amount",
        },
        dokumentBeskrivelse: "Upload information on dividends",
    },
    "salgsoppgjor|eiendom": {
        belop: {
            label: "Sales sum",
        },
        leggtil: "Add sales sum",
        slettet: "We have deleted the documentation on sales as you have no longer responded you receive it.",
        sporsmal: "How much have you received in sales sum for property and/or assets?",
        sum: {
            label: "Sales sum",
        },
        dokumentBeskrivelse: "Upload information on sale settlement",
    },
    "dokumentasjon|forsikringsutbetaling": {
        belop: {
            label: "Amount",
        },
        leggtil: "Add payout",
        slettet:
            "We have deleted the documentation on insurance payouts as you have no longer responded you receive them.",
        sporsmal: "How much have you received in insurance payouts?",
        sum: {
            label: "Amount",
        },
        undertekst: "State total amount",
        dokumentBeskrivelse: "Upload information on insurance payouts",
    },
    "dokumentasjon|annetinntekter": {
        belop: {
            label: "Amount",
        },
        leggtil: "Add other payments",
        slettet:
            "We have deleted the documentation on other payments, as you have no longer responded you receive them.",
        sporsmal: "You have responded that you have received other payments",
        sum: {
            label: "Amount",
        },
        dokumentBeskrivelse: "Upload information on other payments",
    },
    "faktura|husleie": {
        belop: {
            label: "Amount",
        },
        permnd: {
            label: "Amount",
        },
        slettet: "We have deleted the documentation on rent as you have no longer responded you have them.",
        sporsmal: "How much do you pay in rent per month?",
        dokumentBeskrivelse: "Upload receipt/invoice",
    },
    "faktura|strom": {
        belop: {
            label: "Amount on the last bill",
        },
        sisteregning: {
            label: "Amount on the last bill",
        },
        slettet:
            "We have deleted the documentation on electricity expenses as you have no longer responded you have them.",
        sporsmal: "How much do you pay for electricity?",
        dokumentBeskrivelse: "Upload receipt/invoice",
    },
    "faktura|kommunaleavgifter": {
        belop: {
            label: "Amount on the last bill",
        },
        sisteregning: {
            label: "Amount on the last bill",
        },
        slettet:
            "We have deleted the documentation on municipal charges as you have no longer responded you have them.",
        sporsmal: "How much do you pay in municipal charges?",
        dokumentBeskrivelse: "Upload receipt/invoice",
    },
    "faktura|oppvarming": {
        belop: {
            label: "Amount on the last bill",
        },
        sisteregning: {
            label: "Amount on the last bill",
        },
        slettet:
            "We have deleted the documentation on heating expenses as you have no longer responded you have them.",
        sporsmal: "How much do you pay for heating (excluding electricity)?",
        dokumentBeskrivelse: "Upload receipt/invoice",
    },
    "nedbetalingsplan|avdraglaan": {
        avdrag: {
            label: "Monthly installments",
        },
        leggtil: "Add home mortage",
        renter: {
            label: "Monthly interest",
        },
        slettet:
            "We have deleted the documentation on installments and interest on loans as you have no longer responded you have them.",
        sporsmal: "How much do you pay in installments and interest on your home mortage?",
        dokumentBeskrivelse: "Upload installment plan",
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
            "We have deleted the documentation on other housing expenses as you have no longer responded you have them.",
        sporsmal: "What other housing expenses do you have?",
        type: {
            label: "Type of expense",
        },
        dokumentBeskrivelse: "Upload information on other housing expenses",
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
            "We have deleted the documentation on children’s leisure activities as you have no longer responded you have it.",
        sporsmal: "What expenses do you have for children’s leisure activities?",
        type: {
            label: "Description of activity",
        },
        dokumentBeskrivelse: "Upload receipt/invoice",
    },
    "faktura|barnehage": {
        belop: {
            label: "Amount",
        },
        leggtil: "Add kindergarten",
        sistemnd: {
            label: "Amount",
        },
        slettet:
            "We have deleted the document relating to kindergarten expenses as you have no longer responded you have them.",
        sporsmal: "How much do you pay for kindergarten?",
        dokumentBeskrivelse: "Upload receipt/invoice",
    },
    "faktura|sfo": {
        belop: {
            label: "Amount",
        },
        leggtil: "Add after-school program (SFO/AKS)",
        sistemnd: {
            label: "Amount",
        },
        slettet:
            "We have deleted the document relating to after-school program (SFO/AKS) as you have no longer responded you have it.",
        sporsmal: "How much do you pay for after-school program (SFO/AKS)?",
        dokumentBeskrivelse: "Upload receipt/invoice",
    },
    "faktura|tannbehandling": {
        belop: {
            label: "Amount on the last bill",
        },
        leggtil: "Add expense",
        sisteregning: {
            label: "Amount on the last bill",
        },
        slettet:
            "We have deleted the document relating to dental treatment expenses as you have no longer responded you have them.",
        sporsmal: "How much do you pay for orthodontic treatment for children?",
        dokumentBeskrivelse: "Upload receipt/invoice",
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
        sporsmal: "What other expenses do you have for children?",
        type: {
            label: "Type of expense",
        },
        dokumentBeskrivelse: "Upload receipt/invoice",
    },
    "skattemelding|skattemelding": {
        slettet: "We have deleted the documentation relating to tax return as it is no longer relevant.",
        sporsmal: "Please document tax return and tax settlement from the last year.",
        dokumentBeskrivelse: "Upload tax return and tax settlement",
    },
    "oppholdstillatel|oppholdstillatel": {
        sporsmal: "Please document your stay in Norway with a registration certificate or residence permit",
        dokumentBeskrivelse:
            "Upload registration certificate/residence permit",
    },
    "annet|annet": {
        belop: {
            label: "Amount",
        },
        beskrivelse: {
            label: "Provide details about other expences",
        },
        leggtil: "Add expense",
        slettet:
            "We have deleted the documentation relating to other expenses as you have no longer responded you have them.",
        sporsmal: "Other expenses",
        utgift: {
            label: "Expense (if applicable)",
        },
        dokumentInfo: "If you have other attachments you wish to send, they can be uploaded here.",
        dokumentBeskrivelse: "Upload relevant documentation",
    },
};

export default dokumentasjon;
