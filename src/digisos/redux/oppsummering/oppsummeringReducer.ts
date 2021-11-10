import {OppsummeringActionTypeKeys, OppsummeringActionTypes, NyOppsummeringBolk} from "./oppsummeringTypes";
import {REST_STATUS} from "../soknad/soknadTypes";

export interface OppsummeringState {
    nyOppsummering: NyOppsummeringBolk[];
    bekreftet?: boolean;
    visBekreftMangler?: boolean;
    restStatus: REST_STATUS;
    visBekreftInfo?: boolean;
}

const defaultState: OppsummeringState = {
    nyOppsummering: [],
    bekreftet: false,
    visBekreftMangler: false,
    restStatus: REST_STATUS.INITIALISERT,
};

const reducer = (state: OppsummeringState = defaultState, action: OppsummeringActionTypes): OppsummeringState => {
    switch (action.type) {
        case OppsummeringActionTypeKeys.FEILET:
            return {
                ...state,
                nyOppsummering: [],
                restStatus: REST_STATUS.SERVER_ERROR,
            };
        case OppsummeringActionTypeKeys.BEKREFT_OPPSUMMERING:
            return {
                ...state,
                bekreftet: !state.bekreftet,
                visBekreftMangler: false,
            };
        case OppsummeringActionTypeKeys.SET_VIS_BEKREFT_MANGLER:
            return {
                ...state,
                visBekreftMangler: action.visBekreftMangler,
            };
        case OppsummeringActionTypeKeys.HENT_NY_OPPSUMMERING:
            return {
                ...state,
                restStatus: REST_STATUS.PENDING,
            };
        case OppsummeringActionTypeKeys.SET_NY_OPPSUMMERING:
            return {
                ...state,
                nyOppsummering: action.response.steg,
                restStatus: REST_STATUS.OK,
            };
        default:
            return state;
    }
};

export default reducer;
