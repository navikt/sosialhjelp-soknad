import {Reducer} from "../reduxTypes";
import {
    opplysningerAction,
    opplysningerActionTypeKeys,
    OpplysningerModel, Opplysning,
    VedleggStatus
} from "./opplysningerTypes";
import {RestStatus} from "../../types";
import {
    getOpplysningByOpplysningType,
    getSortertListeAvOpplysninger,
    updateSortertOpplysning,
} from "./opplysningerUtils";


export const initialOpplysningerModel: OpplysningerModel = {
    restStatus: RestStatus.NOT_ASKED,
    backendData: null,
    opplysningerSortert: []
};

const OpplysningerReducer: Reducer<OpplysningerModel, opplysningerAction> = (
    state: OpplysningerModel = initialOpplysningerModel,
    action: opplysningerAction
) => {
    switch (action.type) {
        case opplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND: {
            const sortert = getSortertListeAvOpplysninger(action.backendData);

            return {
                ...state,
                restStatus: RestStatus.SUCCESS,
                backendData: action.backendData,
                opplysningerSortert: sortert
            };
        }
        case opplysningerActionTypeKeys.OPPDATER_OPPLYSNING: {
            const opplysningerSortertUpdated = updateSortertOpplysning(state.opplysningerSortert, action.opplysning);

            return {
                ...state,
                restStatus: state.restStatus,
                opplysningerSortert: opplysningerSortertUpdated
            };
        }
        case opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_PENDING: {
            const {opplysningType} = action;
            const opplysning = getOpplysningByOpplysningType(state.opplysningerSortert, opplysningType);
            const opplysningUpdated = {...opplysning};
            opplysningUpdated.pendingLasterOppFil = true;
            const opplysningerSortertUpdated: Opplysning[] = updateSortertOpplysning(state.opplysningerSortert, opplysningUpdated);

            return {
                ...state,
                opplysningerSortert: opplysningerSortertUpdated
            };
        }
        case opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_FERDIG: {
            const {opplysningType} = action;
            const opplysning = getOpplysningByOpplysningType(state.opplysningerSortert, opplysningType);
            const opplysningUpdated = {...opplysning};
            opplysningUpdated.pendingLasterOppFil = false;
            const opplysningerSortertUpdated: Opplysning[] = updateSortertOpplysning(state.opplysningerSortert, opplysningUpdated);

            return {
                ...state,
                opplysningerSortert: opplysningerSortertUpdated
            };
        }
        case opplysningerActionTypeKeys.SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP: {
            const {opplysningType} = action;
            const opplysning = getOpplysningByOpplysningType(state.opplysningerSortert, opplysningType);
            const opplysningUpdated = {...opplysning};
            if (opplysningUpdated.vedleggStatus !== VedleggStatus.VEDLEGGALLEREDESEND) {
                opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGGALLEREDESEND;
            } else {
                opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGG_KREVES;
            }
            const opplysningerSortertUpdated: Opplysning[] = updateSortertOpplysning(state.opplysningerSortert, opplysningUpdated);

            return {
                ...state,
                opplysningerSortert: opplysningerSortertUpdated
            };
        }
        default:
            return state;
    }
};

export default OpplysningerReducer;
