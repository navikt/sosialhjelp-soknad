import {OppsummeringActionTypeKeys, OppsummeringActionTypes} from "./oppsummeringTypes";
import {REST_STATUS} from "../soknadsdata/soknadsdataTypes";

export interface OppsummeringState {
    bekreftet?: boolean;
    visBekreftMangler?: boolean;
    restStatus: REST_STATUS;
    visBekreftInfo?: boolean;
}

const defaultState: OppsummeringState = {
    bekreftet: false,
    visBekreftMangler: false,
    restStatus: REST_STATUS.INITIALISERT,
};

const reducer = (state: OppsummeringState = defaultState, action: OppsummeringActionTypes): OppsummeringState => {
    switch (action.type) {
        case OppsummeringActionTypeKeys.FEILET:
            return {
                ...state,
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
        case OppsummeringActionTypeKeys.SET_NY_OPPSUMMERING:
            return {
                ...state,
                restStatus: REST_STATUS.OK,
            };
        default:
            return state;
    }
};

export default reducer;
