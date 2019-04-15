import {Reducer} from "../reduxTypes";
import {
    Grupper,
    OkonomiskeOpplysningerAction,
    OkonomiskeOpplysningerActionTypeKeys,
    OkonomiskeOpplysningerModel,
    VedleggStatus
} from "./okonomiskeOpplysningerTypes";
import {RestStatus} from "../../types";
import {
    generateGrupperFromBackendData,
    getOpplysningByOpplysningTypeAndGruppe, getSortertListeAvMaybeOpplysning,
    updateOkonomiskOpplysning,
} from "./okonomiskeOpplysningerUtils";


export const initialOkonomiskeOpplysningerModel: OkonomiskeOpplysningerModel = {
    restStatus: RestStatus.NOT_ASKED,
    backendData: null,
    grupper: null,
    opplysningerSortert: []
};

const OkonomiskeOpplysningerReducer: Reducer<OkonomiskeOpplysningerModel, OkonomiskeOpplysningerAction> = (
    state: OkonomiskeOpplysningerModel = initialOkonomiskeOpplysningerModel,
    action: OkonomiskeOpplysningerAction
) => {
    switch (action.type) {
        case OkonomiskeOpplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND: {

            const sortert = getSortertListeAvMaybeOpplysning(action.backendData);

            return {
                ...state,
                restStatus: RestStatus.SUCCESS,
                backendData: action.backendData,
                grupper: generateGrupperFromBackendData(action.backendData),
                opplysningerSortert: sortert
            };
        }
        case OkonomiskeOpplysningerActionTypeKeys.OPPDATER_OKONOMISK_OPPLYSNING: {

            const grupperUpdated: Grupper = updateOkonomiskOpplysning(state.grupper, action.okonomiskOpplysning);

            return {
                ...state,
                restStatus: state.restStatus,
                grupper : grupperUpdated
            }
        }



        case OkonomiskeOpplysningerActionTypeKeys.SETT_PENDING_PA_FIL_OPPLASTING: {
            const { opplysningType, opplysningGruppe } = action;

            const opplysning = getOpplysningByOpplysningTypeAndGruppe(state, opplysningType, opplysningGruppe);

            const opplysningUpdated = {...opplysning };
            opplysningUpdated.pendingLasterOppFil = true;
            const grupperUpdated: Grupper = updateOkonomiskOpplysning(state.grupper, opplysningUpdated);

            return {
                ...state,
                grupper: grupperUpdated
            }
        }
        case OkonomiskeOpplysningerActionTypeKeys.SETT_FERDIG_PA_FIL_OPPLASTING: {
            const { opplysningType, opplysningGruppe } = action;

            const opplysning = getOpplysningByOpplysningTypeAndGruppe(state, opplysningType, opplysningGruppe);

            const opplysningUpdated = {...opplysning };
            opplysningUpdated.pendingLasterOppFil = false;
            const grupperUpdated: Grupper = updateOkonomiskOpplysning(state.grupper, opplysningUpdated);

            return {
                ...state,
                grupper: grupperUpdated
            }
        }



        case OkonomiskeOpplysningerActionTypeKeys.SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP: {
            const { opplysningType, opplysningGruppe } = action;
            const opplysning = getOpplysningByOpplysningTypeAndGruppe(state, opplysningType, opplysningGruppe);
            const opplysningUpdated = {...opplysning};
            if (opplysningUpdated.vedleggStatus !== VedleggStatus.VEDLEGGALLEREDESEND){
                opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGGALLEREDESEND;
            } else {
                opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGG_KREVES;
            }
            const grupperUpdated: Grupper = updateOkonomiskOpplysning(state.grupper, opplysningUpdated);
            return {
                ...state,
                grupper: grupperUpdated
            }
        }


        default:
            return state;
    }

};

export default OkonomiskeOpplysningerReducer;

