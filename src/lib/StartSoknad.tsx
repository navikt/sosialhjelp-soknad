import {Dispatch} from "redux";
import {opprettSoknad} from "../generated/soknad-ressurs/soknad-ressurs";
import {
    opprettSoknadFeilet,
    opprettSoknadOk,
    setShowServerError,
    showDowntimeError,
    startSoknadDone,
} from "../digisos/redux/soknad/soknadActions";
import {HttpStatus} from "../nav-soknad/utils/rest-utils";
import {logWarning} from "../nav-soknad/utils/loggerUtils";

export const startSoknad = async (dispatch: Dispatch) => {
    try {
        const soknad = await opprettSoknad();
        dispatch(opprettSoknadOk(soknad.brukerBehandlingId));
        dispatch(startSoknadDone());
        return soknad.brukerBehandlingId;
    } catch (reason: any) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;
        logWarning("opprettSoknad: " + reason);

        if (reason.message === HttpStatus.SERVICE_UNAVAILABLE) {
            dispatch(showDowntimeError(true));
        } else {
            dispatch(setShowServerError(true));
            dispatch(opprettSoknadFeilet());
        }
        dispatch(startSoknadDone());
    }
};
