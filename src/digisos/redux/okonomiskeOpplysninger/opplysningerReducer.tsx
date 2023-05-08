import {OpplysningerAction, opplysningerActionTypeKeys, OpplysningerModel} from "./opplysningerTypes";
import {getOpplysningByType, getSortertListeAvOpplysninger, updateSortertOpplysning} from "./opplysningerUtils";
import {REST_STATUS} from "../soknadsdata/soknadsdataTypes";
import {VedleggFrontendType, VedleggFrontendVedleggStatus} from "../../../generated/model";

export const initialOpplysningerModel: OpplysningerModel = {
    restStatus: REST_STATUS.INITIALISERT,
    backendData: null,
    opplysningerSortert: [],
    enFilLastesOpp: false,
};

function settFilOpplastingStatus(
    opplysningType: VedleggFrontendType,
    state: OpplysningerModel,
    enFilLastesOpp: boolean
) {
    const opplysning = getOpplysningByType(state.opplysningerSortert, opplysningType);

    if (!opplysning) return state;

    const opplysningUpdated = {
        ...opplysning,
        pendingLasterOppFil: enFilLastesOpp,
    };

    const opplysningerSortertUpdated = updateSortertOpplysning(state.opplysningerSortert, opplysningUpdated);

    return {
        ...state,
        opplysningerSortert: opplysningerSortertUpdated,
        enFilLastesOpp,
    };
}

export const opplysningerReducer = (
    state: OpplysningerModel = initialOpplysningerModel,
    action: OpplysningerAction
) => {
    switch (action.type) {
        case opplysningerActionTypeKeys.GOT_DATA_FROM_BACKEND: {
            const sortert = getSortertListeAvOpplysninger(action.backendData);

            return {
                ...state,
                restStatus: REST_STATUS.OK,
                backendData: action.backendData,
                opplysningerSortert: sortert,
            };
        }
        case opplysningerActionTypeKeys.OPPDATER_OPPLYSNING: {
            const opplysningerSortertUpdated = updateSortertOpplysning(state.opplysningerSortert, action.opplysning);

            return {
                ...state,
                restStatus: state.restStatus,
                opplysningerSortert: opplysningerSortertUpdated,
            };
        }

        case opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_PENDING:
            return settFilOpplastingStatus(action.opplysningType, state, true);

        case opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_FERDIG:
            return settFilOpplastingStatus(action.opplysningType, state, false);

        case opplysningerActionTypeKeys.SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP: {
            const {opplysningType} = action;
            const opplysning = getOpplysningByType(state.opplysningerSortert, opplysningType);
            if (!opplysning) return state;

            const opplysningerSortertUpdated = updateSortertOpplysning(state.opplysningerSortert, {
                ...opplysning,
                vedleggStatus:
                    opplysning.vedleggStatus !== VedleggFrontendVedleggStatus.VedleggAlleredeSendt
                        ? VedleggFrontendVedleggStatus.VedleggKreves
                        : VedleggFrontendVedleggStatus.VedleggAlleredeSendt,
            });

            return {
                ...state,
                opplysningerSortert: opplysningerSortertUpdated,
            };
        }
        default:
            return state;
    }
};
