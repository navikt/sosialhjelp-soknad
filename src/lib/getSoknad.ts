import {Dispatch} from "redux";
import {hentSoknad, hentSoknadOk, setShowPageNotFound} from "../digisos/redux/soknad/soknadActions";
import {fetchToJson, HttpStatus} from "../nav-soknad/utils/rest-utils";
import {logWarning} from "../nav-soknad/utils/loggerUtils";

/**
 * Sets a new behandlingsId, sets Soknad to pending, obtains the XSRF cookie for the application
 *
 * @param {string} behandlingsId
 * @param {Dispatch} dispatch
 */
export const getSoknad = async (behandlingsId: string, dispatch: Dispatch) => {
    try {
        dispatch(hentSoknad(behandlingsId));
        const xsrfCookieIsOk = await fetchToJson<boolean>(`soknader/${behandlingsId}/xsrfCookie`);
        dispatch(hentSoknadOk(xsrfCookieIsOk, behandlingsId ?? ""));
    } catch (reason) {
        if (reason.message !== HttpStatus.UNAUTHORIZED) logWarning("hent soknad feilet: " + reason);
        dispatch(setShowPageNotFound(true));
    }
};
