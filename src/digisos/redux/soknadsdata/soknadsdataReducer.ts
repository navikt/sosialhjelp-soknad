import {BosituasjonData, initialBosituasjonState} from "../../../skjema/05-bosituasjon/bosituasjonTypes";
import {Familie, initialFamilieStatus, Sivilstatus} from "../../../skjema/04-familie/sivilstatus/FamilieTypes";
import {initialUtdanningState, Utdanning} from "../../../skjema/03-arbeidUtdanning/utdanning/utdanningTypes";
import {setPath} from "./soknadsdataActions";
import {Bostotte, initialBostotteState} from "../../../skjema/06-inntektFormue/bostotte/bostotteTypes";
import {initialUtbetalingerState, Utbetalinger} from "../../../skjema/06-inntektFormue/utbetalinger/utbetalingerTypes";
import {initialVerdierState, Verdier} from "../../../skjema/06-inntektFormue/verdier/VerdierTypes";
import {initialFormueState, Formue} from "../../../skjema/06-inntektFormue/formue/FormueTypes";
import {initialBoutgifterState} from "../../../skjema/07-utgifterGjeld/boutgifter/BoutgifterTypes";
import {
    initialBarneutgifterState,
    Barneutgifter,
} from "../../../skjema/07-utgifterGjeld/barneutgifter/BarneutgifterTypes";
import {Barnebidrag, ForsorgerPlikt} from "../../../skjema/04-familie/forsorgerplikt/ForsorgerPliktTypes";
import {
    initialSkattbarInntektInfoState,
    SkattbarInntekt,
} from "../../../skjema/06-inntektFormue/skattbarInntekt/inntektTypes";
import {Systeminntekter, initialSysteminntekter} from "../../../skjema/06-inntektFormue/navytelser/navYtelserTypes";
import {Studielan, initialStudielanState} from "../../../skjema/06-inntektFormue/studielan/StudielanTypes";
import {REST_STATUS} from "./soknadsdataTypes";
import {BoutgifterFrontend} from "../../../generated/model";

export enum SoknadsdataActionTypeKeys {
    OPPDATER_SOKNADSDATA_STI = "soknadsdata/OPPDATER_STI",
    SETT_REST_STATUS = "soknadsdata/SETT_REST_STATUS",
}

/*
 * Sti for REST endepunkter og redux state datastruktur:
 * Eksempel: Kontonummer hentes fra REST endepunktet "http://..../123/personalia/kontonummer"
 * og legges på redux state state.soknadsdata.personalia.kontonummer
 */
export enum SoknadsSti {
    OPPDATER_SAMTYKKE = "oppdaterSamtykker",
    ARBEID = "arbeid",
    BOSITUASJON = "bosituasjon",
    UTDANNING = "utdanning",
    BOSTOTTE = "inntekt/bostotte",
    BOSTOTTE_SAMTYKKE = "inntekt/bostotte/samtykke",
    STUDIELAN = "inntekt/studielan",
    UTBETALINGER = "inntekt/utbetalinger",
    VERDIER = "inntekt/verdier",
    FORMUE = "inntekt/formue",
    BOUTGIFTER = "utgifter/boutgifter",
    BARNEUTGIFTER = "utgifter/barneutgifter",
    SIVILSTATUS = "familie/sivilstatus",
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

export interface Utgifter {
    boutgifter: BoutgifterFrontend;
    barneutgifter: Barneutgifter;
}

export const initialUtgifterState: Utgifter = {
    boutgifter: initialBoutgifterState,
    barneutgifter: initialBarneutgifterState,
};

export interface Soknadsdata {
    bosituasjon: BosituasjonData;
    familie: Familie;
    utdanning: Utdanning;
    inntekt: Inntekt;
    utgifter: Utgifter;
    restStatus: any;
}

export interface SoknadsdataActionVerdi {
    bosituasjon: BosituasjonData;
    familie: Familie;
    utdanning: Utdanning;
    inntekt: Inntekt;
    utgifter: Utgifter;
}

export type SoknadsdataType =
    | Familie
    | Utdanning
    | Sivilstatus
    | ForsorgerPlikt
    | Barnebidrag
    | Bostotte
    | Studielan
    | Formue
    | Verdier
    | Utgifter
    | Utbetalinger
    | Barneutgifter
    | BoutgifterFrontend
    | SkattbarInntektInfo;

interface SoknadsdataActionType {
    type: SoknadsdataActionTypeKeys;
    verdi?: SoknadsdataActionVerdi | SoknadsdataType | null;
    sti: string;
    restStatus?: string;
}

const initialSoknadsdataRestStatus = {
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
    bosituasjon: initialBosituasjonState,
    familie: initialFamilieStatus,
    utdanning: initialUtdanningState,
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

export const settRestStatus = (sti: string, restStatus: REST_STATUS): SoknadsdataActionType => ({
    type: SoknadsdataActionTypeKeys.SETT_REST_STATUS,
    sti,
    restStatus,
});

export const oppdaterSoknadsdataSti = (sti: string, verdi: SoknadsdataType | null): SoknadsdataActionType => ({
    type: SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA_STI,
    sti,
    verdi,
});

export default reducer;
