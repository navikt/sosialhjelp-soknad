import {SoknadActionType, SoknadActionTypeKeys} from "./soknadActionTypes";
import {logError} from "../../../nav-soknad/utils/loggerUtils";

export const visLasteOppVedleggModal = (skalVises: boolean): SoknadActionType => {
    return {
        type: SoknadActionTypeKeys.VIS_LASTE_OPP_VEDLEGG_MODAL,
        skalVises,
    };
};

export function setShowServerError(shouldShow: boolean): SoknadActionType {
    if (shouldShow) logError("setShowServerError(true)");
    return {
        type: SoknadActionTypeKeys.SHOW_SERVER_FEIL,
        shouldShow: shouldShow,
    };
}
