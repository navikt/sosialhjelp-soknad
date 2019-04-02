import {Reducer} from "../reduxTypes";
import {
    Grupper,
    OkonomiskeOpplysningerAction,
    OkonomiskeOpplysningerActionTypeKeys,
    OkonomiskeOpplysningerModel
} from "./okonomiskeOpplysningerTypes";
import {RestStatus} from "../../types";
import {
    generateGrupperFromBackendData, updateOkonomiskOpplysning,
} from "./okonomiskeOpplysningerUtils";


export const initialOkonomiskeOpplysningerModel: OkonomiskeOpplysningerModel = {
    restStatus: RestStatus.NOT_ASKED,
    backendData: null,
    grupper: null
};

const OkonomiskeOpplysningerReducer: Reducer<OkonomiskeOpplysningerModel, OkonomiskeOpplysningerAction> = (
    state: OkonomiskeOpplysningerModel = initialOkonomiskeOpplysningerModel,
    action: OkonomiskeOpplysningerAction
) => {
    switch (action.type) {
        case OkonomiskeOpplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND: {
            return {
                ...state,
                restStatus: RestStatus.SUCCESS,
                backendData: action.backendData,
                grupper: generateGrupperFromBackendData(action.backendData)
            };
        }
        case OkonomiskeOpplysningerActionTypeKeys.OPPDATER_OKONOMISK_OPPLYSNING: {

            const grupperUpdated: Grupper = updateOkonomiskOpplysning(state.grupper, action.okonomiskOpplysning);
            debugger;
            return {
                ...state,
                restStatus: state.restStatus,
                grupper : grupperUpdated
            }
        }
        default:
            return state;
    }

};

export default OkonomiskeOpplysningerReducer;

