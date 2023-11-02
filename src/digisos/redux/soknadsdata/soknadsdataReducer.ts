import {BosituasjonData, initialBosituasjonState} from "../../../skjema/05-bosituasjon/bosituasjonTypes";
import {initialUtdanningState, Utdanning} from "../../../skjema/03-arbeidUtdanning/utdanning/utdanningTypes";
import {setPath} from "./soknadsdataActions";
import {initialBoutgifterState} from "../../../skjema/07-utgifterGjeld/boutgifter/BoutgifterTypes";
import {
    initialBarneutgifterState,
    Barneutgifter,
} from "../../../skjema/07-utgifterGjeld/barneutgifter/BarneutgifterTypes";
import {Studielan, initialStudielanState} from "../../../skjema/06-inntektFormue/studielan/StudielanTypes";
import {REST_STATUS} from "./soknadsdataTypes";
import {BoutgifterFrontend, SivilstatusFrontend, UtbetalingerFrontend, VerdierFrontend} from "../../../generated/model";

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
    BOUTGIFTER = "utgifter/boutgifter",
    BARNEUTGIFTER = "utgifter/barneutgifter",
}

export interface Inntekt {
    studielan: Studielan;
}

export const initialInntektState: Inntekt = {
    studielan: initialStudielanState,
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
    utdanning: Utdanning;
    inntekt: Inntekt;
    utgifter: Utgifter;
    restStatus: any;
}

export interface SoknadsdataActionVerdi {
    bosituasjon: BosituasjonData;
    utdanning: Utdanning;
    inntekt: Inntekt;
    utgifter: Utgifter;
}

export type SoknadsdataType =
    | Utdanning
    | SivilstatusFrontend
    | Studielan
    | VerdierFrontend
    | Utgifter
    | UtbetalingerFrontend
    | Barneutgifter
    | BoutgifterFrontend;

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
