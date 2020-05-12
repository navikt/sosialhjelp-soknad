import {FilActionTypeKeys, FilActionTypes, FilState} from "./filTypes";
import {REST_FEIL, REST_STATUS} from "../soknad/soknadTypes";

const initialState: FilState = {
    opplastingStatus: REST_STATUS.OK,
    feilKode: null,
    opplysningtype: null,
};

export const filReducer = (state: FilState = initialState, action: FilActionTypes): FilState => {
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
                opplastingStatus: REST_STATUS.LAST_OPP_FIL_FEILET,
                feilKode: action.feilKode,
                opplysningtype: action.opplysningType,
            };
        }
        case FilActionTypeKeys.START_SLETT_FIL: {
            const samletVedleggStorrelseForStor: boolean =
                state.feilKode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR;
            const feilKodeUpdated: REST_FEIL | null = samletVedleggStorrelseForStor ? null : state.feilKode;
            const opplastingStatusUpdated: REST_STATUS = samletVedleggStorrelseForStor
                ? REST_STATUS.OK
                : state.opplastingStatus;
            return {
                ...state,
                feilKode: feilKodeUpdated,
                opplastingStatus: opplastingStatusUpdated,
            };
        }
        default:
            return state;
    }
};
