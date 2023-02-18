import {
    OpplysningerAction,
    opplysningerActionTypeKeys,
    OpplysningerModel,
    Opplysning,
    VedleggStatus,
} from "./opplysningerTypes";
import {
    getOpplysningByOpplysningType,
    getSortertListeAvOpplysninger,
    updateSortertOpplysning,
} from "./opplysningerUtils";
import {REST_STATUS} from "../soknadsdata/soknadsdataTypes";

export const initialOpplysningerModel: OpplysningerModel = {
    restStatus: REST_STATUS.INITIALISERT,
    backendData: null,
    opplysningerSortert: [],
    enFilLastesOpp: false,
};

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
        case opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_PENDING: {
            const {opplysningType} = action;
            const opplysning: Opplysning | undefined = getOpplysningByOpplysningType(
                state.opplysningerSortert,
                opplysningType
            );
            if (opplysning) {
                const opplysningUpdated: Opplysning = {...opplysning};
                opplysningUpdated.pendingLasterOppFil = true;
                const opplysningerSortertUpdated: Opplysning[] = updateSortertOpplysning(
                    state.opplysningerSortert,
                    opplysningUpdated
                );

                return {
                    ...state,
                    opplysningerSortert: opplysningerSortertUpdated,
                    enFilLastesOpp: true,
                };
            } else {
                return state;
            }
        }
        case opplysningerActionTypeKeys.SETT_FIL_OPPLASTING_FERDIG: {
            const {opplysningType} = action;
            const opplysning: Opplysning | undefined = getOpplysningByOpplysningType(
                state.opplysningerSortert,
                opplysningType
            );
            if (opplysning) {
                const opplysningUpdated = {...opplysning};
                opplysningUpdated.pendingLasterOppFil = false;
                const opplysningerSortertUpdated: Opplysning[] = updateSortertOpplysning(
                    state.opplysningerSortert,
                    opplysningUpdated
                );

                return {
                    ...state,
                    opplysningerSortert: opplysningerSortertUpdated,
                    enFilLastesOpp: false,
                };
            } else {
                return state;
            }
        }
        case opplysningerActionTypeKeys.SETT_OPPLYSNINGS_FIL_ALLEREDE_LASTET_OPP: {
            const {opplysningType} = action;
            const opplysning: Opplysning | undefined = getOpplysningByOpplysningType(
                state.opplysningerSortert,
                opplysningType
            );
            if (opplysning) {
                const opplysningUpdated = {...opplysning};
                if (opplysningUpdated.vedleggStatus !== VedleggStatus.VEDLEGGALLEREDESEND) {
                    opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGGALLEREDESEND;
                } else {
                    opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGG_KREVES;
                }
                const opplysningerSortertUpdated: Opplysning[] = updateSortertOpplysning(
                    state.opplysningerSortert,
                    opplysningUpdated
                );

                return {
                    ...state,
                    opplysningerSortert: opplysningerSortertUpdated,
                };
            } else {
                return state;
            }
        }
        default:
            return state;
    }
};
