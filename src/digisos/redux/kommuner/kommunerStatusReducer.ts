import {KommunerStatusAction, KommunerStatusActionTypeKeys, KommuneInfoState} from "./kommunerStatusTypes";
import {REST_STATUS} from "../soknad/soknadTypes";

const initialState: KommuneInfoState = {
    kommunerRestStatus: REST_STATUS.INITIALISERT,
    tilgjengelighet: [],
    restStatusKommuneNummerInfo: REST_STATUS.INITIALISERT,
    kommuneNummerInformasjon: []
};

export default (
    state: KommuneInfoState = initialState,
    action: KommunerStatusAction
) => {
    switch (action.type) {
        case KommunerStatusActionTypeKeys.LAGRE_KOMMUNER_STATUS_PA_STORE: {
            return {...state, kommunerRestStatus: REST_STATUS.OK, tilgjengelighet: action.data};
        }
        case KommunerStatusActionTypeKeys.LAGRE_KOMMUNE_NUMMER_INFO_PA_STORE: {
            return {
                ...state,
                restStatusKommuneNummerInfo: REST_STATUS.OK,
                kommuneNummerInformasjon: action.kommuneNummerInfo
            }
        }
        default:
            return state;
    }
};
