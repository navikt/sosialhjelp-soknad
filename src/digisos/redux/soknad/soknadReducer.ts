import {SoknadActionType, SoknadActionTypeKeys} from "./soknadActionTypes";
import {SoknadState} from "./soknadTypes";

export const defaultState: SoknadState = {
    // Visningsstate
    showServerFeil: false,
    visLasteOppVedleggModal: false,
};

const reducer = (state: SoknadState = defaultState, action: SoknadActionType) => {
    switch (action.type) {
        case SoknadActionTypeKeys.VIS_LASTE_OPP_VEDLEGG_MODAL: {
            return {
                ...state,
                visLasteOppVedleggModal: action.skalVises,
            };
        }

        default:
            return state;
    }
};

export default reducer;
