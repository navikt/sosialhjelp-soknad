import {REST_STATUS} from "../../types/restTypes";
import {FilActionTypeKeys, FilActionTypes, FilState} from "./filTypes";

const initialState: FilState = {
    opplastingStatus: REST_STATUS.OK,
    feilKode: null,
    opplysningtype: null
};

export const filReducer = (
    state: FilState = initialState,
    action: FilActionTypes
): FilState => {
    switch (action.type) {
        case FilActionTypeKeys.LAST_OPP: {
            return {
                ...state,
                opplastingStatus: REST_STATUS.PENDING,
                feilKode: null,
            };
        }
        case FilActionTypeKeys.LAST_OPP_FEILET: {
            return {
                ...state,
                opplastingStatus: REST_STATUS.FEILET,
                feilKode: action.feilKode,
                opplysningtype: action.opplysningType
            };
        }
        default:
            return state;
    }
};
