import {Reducer} from "../reduxTypes";
import {
    OkonomiskeOpplysningerAction,
    OkonomiskeOpplysningerActionTypeKeys,
    OkonomiskeOpplysningerModel, Opplysning,
    VedleggStatus
} from "./opplysningerTypes";
import {RestStatus} from "../../types";
import {
    getOpplysningByOpplysningType,
    getSortertListeAvOpplysninger,
    updateSortertOpplysning,
} from "./okonomiskeOpplysningerUtils";


export const initialOkonomiskeOpplysningerModel: OkonomiskeOpplysningerModel = {
    restStatus: RestStatus.NOT_ASKED,
    backendData: null,
    opplysningerSortert: []
};

const OkonomiskeOpplysningerReducer: Reducer<OkonomiskeOpplysningerModel, OkonomiskeOpplysningerAction> = (
    state: OkonomiskeOpplysningerModel = initialOkonomiskeOpplysningerModel,
    action: OkonomiskeOpplysningerAction
) => {
    switch (action.type) {
        case OkonomiskeOpplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND: {
            const sortert = getSortertListeAvOpplysninger(action.backendData);

            return {
                ...state,
                restStatus: RestStatus.SUCCESS,
                backendData: action.backendData,
                opplysningerSortert: sortert
            };
        }
        case OkonomiskeOpplysningerActionTypeKeys.OPPDATER_OKONOMISK_OPPLYSNING: {
            const opplysningerSortertUpdated = updateSortertOpplysning(state.opplysningerSortert, action.okonomiskOpplysning);

            return {
                ...state,
                restStatus: state.restStatus,
                opplysningerSortert : opplysningerSortertUpdated
            };
        }
        case OkonomiskeOpplysningerActionTypeKeys.SETT_PENDING_PA_FIL_OPPLASTING: {
            const { opplysningType } = action;
            const opplysning = getOpplysningByOpplysningType(state.opplysningerSortert, opplysningType);
            const opplysningUpdated = {...opplysning };
            opplysningUpdated.pendingLasterOppFil = true;
            const opplysningerSortertUpdated: Opplysning[] = updateSortertOpplysning(state.opplysningerSortert, opplysningUpdated);

            return {
                ...state,
                opplysningerSortert: opplysningerSortertUpdated
            };
        }
        case OkonomiskeOpplysningerActionTypeKeys.SETT_FERDIG_PA_FIL_OPPLASTING: {
            const { opplysningType } = action;
            const opplysning = getOpplysningByOpplysningType(state.opplysningerSortert, opplysningType);
            const opplysningUpdated = {...opplysning };
            opplysningUpdated.pendingLasterOppFil = false;
            const opplysningerSortertUpdated: Opplysning[] = updateSortertOpplysning(state.opplysningerSortert, opplysningUpdated);

            return {
                ...state,
                opplysningerSortert: opplysningerSortertUpdated
            };
        }
        case OkonomiskeOpplysningerActionTypeKeys.SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP: {
            const { opplysningType } = action;
            const opplysning = getOpplysningByOpplysningType(state.opplysningerSortert, opplysningType);
            const opplysningUpdated = {...opplysning};
            if (opplysningUpdated.vedleggStatus !== VedleggStatus.VEDLEGGALLEREDESEND){
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

export default OkonomiskeOpplysningerReducer;

