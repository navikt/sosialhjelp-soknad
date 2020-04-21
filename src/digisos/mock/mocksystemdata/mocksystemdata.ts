import {endpoints} from "./endpoints";

import {midlertidigPostadresseJSON} from "./jsonPartialTemplates/midlertidigPostadresse";
import {organisasjonJSON} from "./jsonTemplates/organisasjon";
import {nyOrganisasjonJSON} from "./jsonPartialTemplates/organisasjon";
import {adresserJSON} from "./jsonTemplates/adresser";
import {arbeidJSON} from "./jsonTemplates/arbeid";
import {bostotteJSON} from "./jsonTemplates/bostotte";
import {brukerprofilJSON} from "./jsonTemplates/brukerprofil";
import {ektefelleJSON} from "./jsonTemplates/ektefelle";
import {familieJSON} from "./jsonTemplates/familie";
import {norgJSON} from "./jsonTemplates/norg";

import {telefonJSON} from "./jsonTemplates/telefon";
import {enkelNavYtelseJSON} from "./jsonTemplates/enkelNavYtelseJSON";
import {NyPeriodeOgUtbetaler} from "../mockbruker/mockComponents/nySkattetatenUtbetaling";
import {enkelNavUtbetalingJSON} from "./jsonTemplates/enkelNavUtbetalingJSON";
import {NyNavUtbetalingObject, NyNavYtelseObject} from "../mockbruker/mockComponents/nyNavUtbetaling";

const adresser = adresserJSON;
let arbeid = arbeidJSON;
const brukerprofil = brukerprofilJSON;
let familie = familieJSON;
const norg = norgJSON;
let organisasjon = organisasjonJSON;
const telefon = telefonJSON;
const navUtbetalinger: any[] = [];
let skattetaten: NyPeriodeOgUtbetaler[] = [];
const bostotte = bostotteJSON;

const PERSON = "person";
const MIDLERTIDIGPOSTADRESSE = "midlertidigPostadresse";
const STRUKTURERTADRESSE = "strukturertAdresse";
const GNR = "gnr";
const BNR = "bnr";
const KOMMUNENUMMER = "kommunenummer";
const BANKKONTO = "bankkonto";
const VERDI = "verdi";
const ARBEIDSFORHOLD = "arbeidsforhold";
const ORGANISASJON = "organisasjon";
const PERSONNAVN = "personnavn";
const STATSBORGERSKAP = "statsborgerskap";
const LANDKODE = "land";
const IDENT = "ident";

export function settNavn(fornavn: any, mellomnavn: any, etternavn: any) {
    // @ts-ignore
    familie[PERSONNAVN] = {
        etternavn: etternavn,
        fornavn: fornavn,
        mellomnavn: mellomnavn,
        sammensattNavn: null,
        endringstidspunkt: null,
        endretAv: null,
        endringstype: null,
    };
}

export function settStatsborgerskap(land: string) {
    // @ts-ignore
    familie[STATSBORGERSKAP][LANDKODE]["value"] = land;
}

export function settIdent(ident: any) {
    familie[IDENT][IDENT] = ident;
}

export function settMidlertidigPostadresse(midlertidigPostadresseEgendefinertValue: any) {
    // @ts-ignore
    brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = midlertidigPostadresseJSON;
}

export function settMidlertidigMatrikkelGnr(gnr: any) {
    brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE][STRUKTURERTADRESSE][GNR] = gnr;
}
export function settMidlertidigMatrikkelBnr(bnr: any) {
    brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE][STRUKTURERTADRESSE][BNR] = bnr;
}
export function settMidlertidigMatrikkelKommunenummer(kommunenummer: any) {
    brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE][STRUKTURERTADRESSE][KOMMUNENUMMER] = kommunenummer;
}

export function settTelefonnummer(telefonnummer: any) {
    if (typeof telefonnummer === "undefined") {
        throw new Error("Mangler telefonnummer (men det er lov å sette eksplisitt til null).");
    }
    telefon[VERDI] = telefonnummer;
}

export function settBankkontonummer(bankkontonummer: string) {
    if (bankkontonummer !== null) {
        // @ts-ignore
        brukerprofil[PERSON][BANKKONTO] = {bankkonto: {bankkontonummer: bankkontonummer}};
    } else {
        brukerprofil[PERSON][BANKKONTO] = null;
    }
}

export function settArbeidsforholdArbeidsgiverPerson(
    id: string,
    startDato: string,
    sluttDato: string,
    stillingsProsent: string,
    ident: string
) {
    const nyttArbeidsForholdArbeidsgiverPerson = {
        navArbeidsforholdId: "",
        ansettelsesperiode: {
            periode: {
                fom: "",
                tom: "",
            },
        },
        arbeidsavtaler: [
            {
                stillingsprosent: "",
            },
        ],
        arbeidsgiver: {
            type: "",
            offentligIdent: "",
        },
    };

    nyttArbeidsForholdArbeidsgiverPerson.navArbeidsforholdId = id;
    nyttArbeidsForholdArbeidsgiverPerson.ansettelsesperiode.periode.fom = startDato;
    nyttArbeidsForholdArbeidsgiverPerson.ansettelsesperiode.periode.tom = sluttDato;
    nyttArbeidsForholdArbeidsgiverPerson.arbeidsavtaler[0].stillingsprosent = stillingsProsent;
    nyttArbeidsForholdArbeidsgiverPerson.arbeidsgiver.type = "Person";
    nyttArbeidsForholdArbeidsgiverPerson.arbeidsgiver.offentligIdent = ident;

    // @ts-ignore
    arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForholdArbeidsgiverPerson);
}

export function settArbeidsforholdArbeidsgiverOrganisasjon(
    id: string,
    startDato: string,
    sluttDato: string,
    stillingsProsent: string,
    orgnummer: string
) {
    const nyttArbeidsForholdArbeidsgiverOrganisasjon = {
        navArbeidsforholdId: "",
        ansettelsesperiode: {
            periode: {
                fom: "",
                tom: "",
            },
        },
        arbeidsavtaler: [
            {
                stillingsprosent: "",
            },
        ],
        arbeidsgiver: {
            type: "",
            organisasjonsnummer: "",
        },
    };

    nyttArbeidsForholdArbeidsgiverOrganisasjon.navArbeidsforholdId = id;
    nyttArbeidsForholdArbeidsgiverOrganisasjon.ansettelsesperiode.periode.fom = startDato;
    nyttArbeidsForholdArbeidsgiverOrganisasjon.ansettelsesperiode.periode.tom = sluttDato;
    nyttArbeidsForholdArbeidsgiverOrganisasjon.arbeidsavtaler[0].stillingsprosent = stillingsProsent;
    nyttArbeidsForholdArbeidsgiverOrganisasjon.arbeidsgiver.type = "Organisasjon";
    nyttArbeidsForholdArbeidsgiverOrganisasjon.arbeidsgiver.organisasjonsnummer = orgnummer;

    // @ts-ignore
    arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForholdArbeidsgiverOrganisasjon);
}

export function clearArbeidsforhold() {
    arbeid[ARBEIDSFORHOLD] = [];
}

export function settOrganisasjon(orgnummer: any, navn: any) {
    organisasjon = organisasjonJSON;
    const nyOrganisasjon = nyOrganisasjonJSON;
    nyOrganisasjon.organisasjonsnummer = orgnummer;
    // @ts-ignore
    nyOrganisasjon.navn.navnelinje1 = navn;

    // @ts-ignore
    organisasjon[ORGANISASJON] = nyOrganisasjon;
}

export function clearOrganisasjon() {
    // @ts-ignore
    organisasjon = null;
}

export function settEktefelleMedSammeBostedsadresse(
    ident: string,
    fornavn: string,
    mellomnavn: string,
    etternavn: string,
    foedselsdato: string
) {
    const ektefelle = ektefelleJSON;

    ektefelle.harSammeBosted = true;

    ektefelle.tilPerson.ident.ident = ident;
    ektefelle.tilPerson.personnavn.fornavn = fornavn;
    ektefelle.tilPerson.personnavn.mellomnavn = mellomnavn;
    ektefelle.tilPerson.personnavn.etternavn = etternavn;
    ektefelle.tilPerson.foedselsdato.foedselsdato = foedselsdato;

    // @ts-ignore
    familie.harFraRolleI.push(ektefelle);
    familie.sivilstand.sivilstand.value = "GIFT";
}

export function settEktefelleUtenSammeBostedsadresse(
    ident: string,
    fornavn: string,
    mellomnavn: string,
    etternavn: string,
    foedselsdato: string
) {
    const ektefelle = ektefelleJSON;

    ektefelle.harSammeBosted = false;

    ektefelle.tilPerson.ident.ident = ident;
    ektefelle.tilPerson.personnavn.fornavn = fornavn;
    ektefelle.tilPerson.personnavn.mellomnavn = mellomnavn;
    ektefelle.tilPerson.personnavn.etternavn = etternavn;
    ektefelle.tilPerson.foedselsdato.foedselsdato = foedselsdato;

    // @ts-ignore
    familie.harFraRolleI.push(ektefelle);
    familie.sivilstand.sivilstand.value = "GIFT";
}

export function settEktefelleMedKodeSeks(ident: any, fornavn: any, mellomnavn: any, etternavn: any, foedselsdato: any) {
    const ektefelle = ektefelleJSON;

    ektefelle.harSammeBosted = false;

    ektefelle.tilPerson.ident.ident = ident;
    ektefelle.tilPerson.personnavn.fornavn = fornavn;
    ektefelle.tilPerson.personnavn.mellomnavn = mellomnavn;
    ektefelle.tilPerson.personnavn.etternavn = etternavn;
    ektefelle.tilPerson.foedselsdato.foedselsdato = foedselsdato;
    ektefelle.tilPerson.diskresjonskode = {
        value: "SPSF",
        kodeRef: null,
        kodeverksRef: "http://nav.no/kodeverk/Kodeverk/Diskresjonskoder",
    };

    // @ts-ignore
    familie.harFraRolleI.push(ektefelle);
    familie.sivilstand.sivilstand.value = "GIFT";
}

export function settEktefelleMedKodeSyv(ident: any, fornavn: any, mellomnavn: any, etternavn: any, foedselsdato: any) {
    const ektefelle = ektefelleJSON;

    ektefelle.harSammeBosted = false;

    ektefelle.tilPerson.ident.ident = ident;
    ektefelle.tilPerson.personnavn.fornavn = fornavn;
    ektefelle.tilPerson.personnavn.mellomnavn = mellomnavn;
    ektefelle.tilPerson.personnavn.etternavn = etternavn;
    ektefelle.tilPerson.foedselsdato.foedselsdato = foedselsdato;
    ektefelle.tilPerson.diskresjonskode = {
        value: "SPFO",
        kodeRef: null,
        kodeverksRef: "http://nav.no/kodeverk/Kodeverk/Diskresjonskoder",
    };

    // @ts-ignore
    familie.harFraRolleI.push(ektefelle);
    familie.sivilstand.sivilstand.value = "GIFT";
}

export function settBarnSammeBostedsadresse(ident: string, fornavn: string, mellomnavn: string, etternavn: string) {
    let barnSammeBostedsadresse = {
        harSammeBosted: true,
        tilRolle: {
            value: "BARN",
            kodeRef: null,
            kodeverksRef: "http://nav.no/kodeverk/Kodeverk/Familierelasjoner",
        },
        tilPerson: {
            diskresjonskode: null,
            bankkonto: null,
            bostedsadresse: null,
            sivilstand: null,
            statsborgerskap: null,
            harFraRolleI: [],
            ident: {
                ident: "03061793877",
                type: {
                    value: "FNR",
                    kodeRef: null,
                    kodeverksRef: "http://nav.no/kodeverk/Kodeverk/Personidenter",
                },
            },
            kjoenn: null,
            personnavn: {
                etternavn: "Mockmann",
                fornavn: "Hydra",
                mellomnavn: "",
                sammensattNavn: null,
                endringstidspunkt: null,
                endretAv: null,
                endringstype: null,
            },
            personstatus: null,
            postadresse: null,
            doedsdato: null,
            foedselsdato: null,
        },
        endringstidspunkt: null,
        endretAv: null,
        endringstype: null,
    };

    barnSammeBostedsadresse.tilPerson.ident.ident = ident;
    barnSammeBostedsadresse.tilPerson.personnavn.fornavn = fornavn;
    barnSammeBostedsadresse.tilPerson.personnavn.mellomnavn = mellomnavn;
    barnSammeBostedsadresse.tilPerson.personnavn.etternavn = etternavn;

    // @ts-ignore
    familie.harFraRolleI.push(barnSammeBostedsadresse);
}

export function settBarnIkkeSammeBostedsadresse(ident: string, fornavn: string, mellomnavn: string, etternavn: string) {
    const barnIkkeSammeBostedsadresse = {
        harSammeBosted: false,
        tilRolle: {
            value: "BARN",
            kodeRef: null,
            kodeverksRef: "http://nav.no/kodeverk/Kodeverk/Familierelasjoner",
        },
        tilPerson: {
            diskresjonskode: null,
            bankkonto: null,
            bostedsadresse: null,
            sivilstand: null,
            statsborgerskap: null,
            harFraRolleI: [],
            ident: {
                ident: "03061694075",
                type: {
                    value: "FNR",
                    kodeRef: null,
                    kodeverksRef: "http://nav.no/kodeverk/Kodeverk/Personidenter",
                },
            },
            kjoenn: null,
            personnavn: {
                etternavn: "Mockmann",
                fornavn: "Zergling",
                mellomnavn: "",
                sammensattNavn: null,
                endringstidspunkt: null,
                endretAv: null,
                endringstype: null,
            },
            personstatus: null,
            postadresse: null,
            doedsdato: null,
            foedselsdato: null,
        },
        endringstidspunkt: null,
        endretAv: null,
        endringstype: null,
    };

    barnIkkeSammeBostedsadresse.tilPerson.ident.ident = ident;
    barnIkkeSammeBostedsadresse.tilPerson.personnavn.fornavn = fornavn;
    barnIkkeSammeBostedsadresse.tilPerson.personnavn.mellomnavn = mellomnavn;
    barnIkkeSammeBostedsadresse.tilPerson.personnavn.etternavn = etternavn;

    // @ts-ignore
    familie.harFraRolleI.push(barnIkkeSammeBostedsadresse);
}

export function settBarnMedDoedsdato(
    ident: string,
    fornavn: string,
    mellomnavn: string,
    etternavn: string,
    doedsdato: string
) {
    const barnMedDoedsdato = {
        harSammeBosted: null,
        tilRolle: {
            value: "BARN",
            kodeRef: null,
            kodeverksRef: "http://nav.no/kodeverk/Kodeverk/Familierelasjoner",
        },
        tilPerson: {
            diskresjonskode: null,
            bankkonto: null,
            bostedsadresse: null,
            sivilstand: null,
            statsborgerskap: null,
            harFraRolleI: [],
            ident: {
                ident: "01010591736",
                type: {
                    value: "FNR",
                    kodeRef: null,
                    kodeverksRef: "http://nav.no/kodeverk/Kodeverk/Personidenter",
                },
            },
            kjoenn: null,
            personnavn: {
                etternavn: "Mockmann",
                fornavn: "Roach",
                mellomnavn: "",
                sammensattNavn: null,
                endringstidspunkt: null,
                endretAv: null,
                endringstype: null,
            },
            personstatus: null,
            postadresse: null,
            doedsdato: {
                doedsdato: "",
                endringstidspunkt: null,
                endretAv: null,
                endringstype: null,
            },
            foedselsdato: null,
        },
        endringstidspunkt: null,
        endretAv: null,
        endringstype: null,
    };

    barnMedDoedsdato.tilPerson.ident.ident = ident;
    barnMedDoedsdato.tilPerson.personnavn.fornavn = fornavn;
    barnMedDoedsdato.tilPerson.personnavn.mellomnavn = mellomnavn;
    barnMedDoedsdato.tilPerson.personnavn.etternavn = etternavn;
    barnMedDoedsdato.tilPerson.doedsdato.doedsdato = doedsdato;

    // @ts-ignore
    familie.harFraRolleI.push(barnMedDoedsdato);
}

export function clearFamilieforhold() {
    familie.harFraRolleI = [];
}

export function leggTilNavUtbetaling(nyNavUtbetalingsListe: NyNavUtbetalingObject[]) {
    nyNavUtbetalingsListe.forEach((nyNavUtbetaling) => {
        const utbetaling = JSON.parse(JSON.stringify(enkelNavUtbetalingJSON)); // Vi kan forbedre med å sjekke om denne allerede finnes.
        utbetaling.utbetaltTil.aktoerId = nyNavUtbetaling.ident;
        utbetaling.posteringsdato = nyNavUtbetaling.posteringsdato;
        utbetaling.utbetalingsdato = nyNavUtbetaling.utbetalingsdato;
        utbetaling.forfallsdato = nyNavUtbetaling.forfallsdato;

        let ytelseSum = 0;
        nyNavUtbetaling.ytelsesListe.forEach((nyYtelse: NyNavYtelseObject) => {
            const ytelse = JSON.parse(JSON.stringify(enkelNavYtelseJSON));
            ytelse.ytelsestype.value = nyYtelse.ytelsestype;
            ytelse.ytelseskomponentListe[0].ytelseskomponenttype = nyYtelse.ytelseskomponenttype;
            ytelse.ytelseskomponentListe[0].ytelseskomponentbeloep = nyYtelse.ytelseskomponentbeloep;
            ytelse.ytelseskomponentersum = nyYtelse.ytelseskomponentbeloep;
            ytelse.ytelseNettobeloep = nyYtelse.ytelseskomponentbeloep;
            ytelseSum += nyYtelse.ytelseskomponentbeloep;
            ytelse.ytelsesperiode.fom = nyYtelse.periodeFom;
            ytelse.ytelsesperiode.tom = nyYtelse.periodeTom;
            utbetaling.ytelseListe.push(ytelse);
        });
        utbetaling.utbetalingNettobeloep = ytelseSum;

        navUtbetalinger.push(utbetaling);
    });
}

export function leggTilSkattetatenUtbetalinger(periodeOgUtbetaler: NyPeriodeOgUtbetaler[]) {
    skattetaten = periodeOgUtbetaler;
}

export function leggTilBostotteUtbetalinger(utbetalinger: any[]) {
    // @ts-ignore
    bostotteJSON.utbetalinger = utbetalinger;
}

export function leggTilBostotteSaker(saker: any[]) {
    // @ts-ignore
    bostotteJSON.saker = saker;
}

export function getAdresserPath() {
    return endpoints.adresser;
}

export function getAdresserJson() {
    return adresser;
}

export function getNorgPath() {
    return endpoints.norg;
}

export function getNorgJson() {
    return norg;
}

export function getTelefonPath() {
    return endpoints.telefon;
}

export function getTelefonJson() {
    return telefon;
}

export function getBrukerprofilPath() {
    return endpoints.brukerprofil;
}

export function getBrukerprofilJson() {
    return brukerprofil;
}

export function getArbeidPath() {
    return endpoints.arbeid;
}

export function getArbeidJson() {
    return arbeid;
}

export function getOrganisasjonPath() {
    return endpoints.organisasjon;
}

export function getOrganisasjonJson() {
    return organisasjon;
}

export function getFamiliePath() {
    return endpoints.familie;
}

export function getFamilieJson() {
    return familie;
}

export function getUtbetalingPath() {
    return endpoints.navUtbetaling;
}

export function getNavUtbetalingJson() {
    return navUtbetalinger;
}

export function getSkattetatenPath() {
    return endpoints.skattetaten;
}

export function getSkattetatenJson() {
    return {oppgaveInntektsmottaker: skattetaten};
}

export function getBostottePath() {
    return endpoints.bostotte;
}

export function getBostotteJson() {
    return bostotte;
}
