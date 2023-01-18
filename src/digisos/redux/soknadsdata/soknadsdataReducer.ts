import {initialKontonummerState, Kontonummer} from "../../skjema/personopplysninger/bankinfo/KontonummerType";
import {Begrunnelse, initialBegrunnelseState} from "../../skjema/begrunnelse/begrunnelseTypes";
import {initialTelefonnummerState, Telefonnummer} from "../../skjema/personopplysninger/telefon/telefonTypes";
import {BosituasjonData, initialBosituasjonState} from "../../skjema/bosituasjon/bosituasjonTypes";
import {Familie, initialFamilieStatus, Sivilstatus} from "../../skjema/familie/sivilstatus/FamilieTypes";
import {initialUtdanningState, Utdanning} from "../../skjema/arbeidUtdanning/utdanning/utdanningTypes";
import {Arbeid, initialArbeidState} from "../../skjema/arbeidUtdanning/arbeid/arbeidTypes";
import {setPath} from "./soknadsdataActions";
import {Bostotte, initialBostotteState} from "../../skjema/inntektFormue/bostotte/bostotteTypes";
import {initialUtbetalingerState, Utbetalinger} from "../../skjema/inntektFormue/utbetalinger/utbetalingerTypes";
import {initialVerdierState, Verdier} from "../../skjema/inntektFormue/verdier/VerdierTypes";
import {initialFormueState, Formue} from "../../skjema/inntektFormue/formue/FormueTypes";
import {initialBoutgifterState, Boutgifter} from "../../skjema/utgifterGjeld/boutgifter/BoutgifterTypes";
import {initialBarneutgifterState, Barneutgifter} from "../../skjema/utgifterGjeld/barneutgifter/BarneutgifterTypes";
import {AdresseKategori, Adresser, initialAdresserState} from "../../skjema/personopplysninger/adresse/AdresseTypes";
import {BasisPersonalia, initialBasisPersonalia} from "../../skjema/personopplysninger/personalia/BasisPersonaliaTypes";
import {Barnebidrag, ForsorgerPlikt} from "../../skjema/familie/forsorgerplikt/ForsorgerPliktTypes";
import {
    initialSkattbarInntektInfoState,
    SkattbarInntekt,
} from "../../skjema/inntektFormue/skattbarInntekt/inntektTypes";
import {Systeminntekter, initialSysteminntekter} from "../../skjema/inntektFormue/navytelser/navYtelserTypes";
import {Studielan, initialStudielanState} from "../../skjema/inntektFormue/studielan/StudielanTypes";
import {REST_STATUS} from "../soknad/soknadTypes";
import {NavEnhetFrontend} from "../../../generated/model";

export enum SoknadsdataActionTypeKeys {
    OPPDATER_SOKNADSDATA = "soknadsdata/OPPDATER",
    OPPDATER_SOKNADSDATA_STI = "soknadsdata/OPPDATER_STI",
    SETT_REST_STATUS = "soknadsdata/SETT_REST_STATUS",
    START_REST_KALL = "soknadsdata/START_REST_KALL",
    STOPP_REST_KALL = "soknadsdata/STOPP_REST_KALL",
}

/*
 * Sti for REST endepunkter og redux state datastruktur:
 * Eksempel: Kontonummer hentes fra REST endepunktet "http://..../123/personalia/kontonummer"
 * og legges på redux state state.soknadsdata.personalia.kontonummer
 */
export enum SoknadsSti {
    OPPDATER_SAMTYKKE = "oppdaterSamtykker",
    HENT_SAMTYKKER = "hentSamtykker",
    ARBEID = "arbeid",
    BANKINFORMASJON = "personalia/kontonummer",
    BEGRUNNELSE = "begrunnelse",
    BOSITUASJON = "bosituasjon",
    UTDANNING = "utdanning",
    TELEFONNUMMER = "personalia/telefonnummer",
    BOSTOTTE = "inntekt/bostotte",
    BOSTOTTE_SAMTYKKE = "inntekt/bostotte/samtykke",
    STUDIELAN = "inntekt/studielan",
    UTBETALINGER = "inntekt/utbetalinger",
    VERDIER = "inntekt/verdier",
    FORMUE = "inntekt/formue",
    BOUTGIFTER = "utgifter/boutgifter",
    BARNEUTGIFTER = "utgifter/barneutgifter",
    ADRESSER = "personalia/adresser",
    NAV_ENHETER = "personalia/navEnheter",
    VALGT_NAV_ENHET = "personalia/navEnhet",
    SIVILSTATUS = "familie/sivilstatus",
    BASIS_PERSONALIA = "personalia/basisPersonalia",
    FORSORGERPLIKT = "familie/forsorgerplikt",
    INNTEKT_SYSTEMDATA = "inntekt/systemdata",
    SKATTBARINNTEKT = "inntekt/skattbarinntektogforskuddstrekk",
    SKATTBARINNTEKT_SAMTYKKE = "inntekt/skattbarinntektogforskuddstrekk/samtykke",
}

export interface Inntekt {
    skattbarinntektogforskuddstrekk: SkattbarInntektInfo;
    bostotte: Bostotte;
    studielan: Studielan;
    utbetalinger: Utbetalinger;
    formue: Formue;
    verdier: Verdier;
    systemdata: Systeminntekter;
}

export interface SkattbarInntektInfo {
    inntektFraSkatteetaten: SkattbarInntekt[];
    inntektFraSkatteetatenFeilet: boolean;
    samtykke: boolean;
    samtykkeTidspunkt?: Date;
}

export const initialInntektState: Inntekt = {
    skattbarinntektogforskuddstrekk: initialSkattbarInntektInfoState,
    bostotte: initialBostotteState,
    studielan: initialStudielanState,
    utbetalinger: initialUtbetalingerState,
    formue: initialFormueState,
    verdier: initialVerdierState,
    systemdata: initialSysteminntekter,
};

export interface Personalia {
    kontonummer: Kontonummer;
    telefonnummer: Telefonnummer;
    adresser: Adresser;
    navEnheter: NavEnhetFrontend[];
    navEnhet: null | NavEnhetFrontend;
    basisPersonalia: BasisPersonalia;
}

export interface Utgifter {
    boutgifter: Boutgifter;
    barneutgifter: Barneutgifter;
}

export const initialPersonaliaState: Personalia = {
    kontonummer: initialKontonummerState,
    telefonnummer: initialTelefonnummerState,
    adresser: initialAdresserState,
    navEnheter: [],
    navEnhet: null,
    basisPersonalia: initialBasisPersonalia,
};

export const initialUtgifterState: Utgifter = {
    boutgifter: initialBoutgifterState,
    barneutgifter: initialBarneutgifterState,
};

export interface Soknadsdata {
    arbeid: Arbeid;
    begrunnelse: Begrunnelse;
    bosituasjon: BosituasjonData;
    familie: Familie;
    utdanning: Utdanning;
    personalia: Personalia;
    inntekt: Inntekt;
    utgifter: Utgifter;
    restStatus: any;
}

export interface SoknadsdataActionVerdi {
    arbeid: Arbeid;
    bosituasjon: BosituasjonData;
    begrunnelse: Begrunnelse;
    familie: Familie;
    utdanning: Utdanning;
    personalia: Personalia;
    inntekt: Inntekt;
    utgifter: Utgifter;
}

export interface AdresseValg {
    valg: AdresseKategori;
}

export type SoknadsdataType =
    | Arbeid
    | Begrunnelse
    | BosituasjonData
    | Familie
    | Utdanning
    | Kontonummer
    | Telefonnummer
    | Personalia
    | Sivilstatus
    | ForsorgerPlikt
    | Barnebidrag
    | Bostotte
    | Studielan
    | Formue
    | Verdier
    | Utgifter
    | Adresser
    | AdresseValg
    | NavEnhetFrontend[]
    | NavEnhetFrontend
    | Utbetalinger
    | Barneutgifter
    | Boutgifter
    | SkattbarInntektInfo;

interface SoknadsdataActionType {
    type: SoknadsdataActionTypeKeys;
    verdi?: SoknadsdataActionVerdi | SoknadsdataType | null;
    sti: string;
    restStatus?: string;
}

const initialSoknadsdataRestStatus = {
    personalia: {
        telefonnummer: REST_STATUS.INITIALISERT,
        kontonummer: REST_STATUS.INITIALISERT,
        basisPersonalia: REST_STATUS.INITIALISERT,
        adresser: REST_STATUS.INITIALISERT,
        navEnheter: REST_STATUS.INITIALISERT,
        valgtNavEnhet: REST_STATUS.INITIALISERT,
    },
    familie: {
        sivilstatus: REST_STATUS.INITIALISERT,
        forsorgerplikt: REST_STATUS.INITIALISERT,
    },
    inntekt: {
        bostotte: REST_STATUS.INITIALISERT,
        samtykke: REST_STATUS.INITIALISERT,
        studielan: REST_STATUS.INITIALISERT,
        utbetalinger: REST_STATUS.INITIALISERT,
        verdier: REST_STATUS.INITIALISERT,
    },
};

export const initialSoknadsdataState: Soknadsdata = {
    arbeid: initialArbeidState,
    begrunnelse: initialBegrunnelseState,
    bosituasjon: initialBosituasjonState,
    familie: initialFamilieStatus,
    utdanning: initialUtdanningState,
    personalia: initialPersonaliaState,
    inntekt: initialInntektState,
    utgifter: initialUtgifterState,
    restStatus: initialSoknadsdataRestStatus,
};

const reducer = (state: Soknadsdata = initialSoknadsdataState, action: SoknadsdataActionType): any => {
    switch (action.type) {
        case SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA_STI:
            return {...setPath(state, action.sti, action.verdi)};
        case SoknadsdataActionTypeKeys.SETT_REST_STATUS:
            return {...setPath(state, "restStatus/" + action.sti, action.restStatus)};
        default:
            return state;
    }
};

export const settRestStatus = (sti: string, restStatus: REST_STATUS): SoknadsdataActionType => {
    return {
        type: SoknadsdataActionTypeKeys.SETT_REST_STATUS,
        sti,
        restStatus,
    };
};

export const oppdaterSoknadsdataSti = (sti: string, verdi: SoknadsdataType | null): SoknadsdataActionType => {
    return {
        type: SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA_STI,
        sti,
        verdi,
    };
};

export default reducer;
