import {AnyAction, Dispatch} from "redux";
import {getInnsynUrl, HttpStatus} from "../nav-soknad/utils/rest-utils";
import {
    sendSoknadOk,
    setSendSoknadServiceUnavailable,
    showSendingFeiletPanel,
    visMidlertidigDeaktivertPanel,
} from "../digisos/redux/soknad/soknadActions";
import {logWarning} from "../nav-soknad/utils/loggerUtils";
import {basePath} from "../configuration";
import {sendSoknad as sendSoknadAction} from "../generated/soknad-actions/soknad-actions";
import {SendTilUrlFrontendSendtTil} from "../generated/model";

export type SoknadSendtTil = "SVARUT" | "FIKS_DIGISOS_API";

/**
 * Sender inn søknad og returnerer relevant status-side
 * @param behandlingsId
 * @param dispatch
 * @return URL til neste steg
 */
export const sendSoknad = async (behandlingsId: string, dispatch: Dispatch<AnyAction>) => {
    try {
        const response = await sendSoknadAction(behandlingsId);

        const {id, sendtTil} = response;

        dispatch(sendSoknadOk(id));

        const redirectUrl: Record<SendTilUrlFrontendSendtTil, string> = {
            FIKS_DIGISOS_API: `${getInnsynUrl()}${response.id}/status`,
            SVARUT: `${basePath}/skjema/${response.id}/ettersendelse`,
        };

        return redirectUrl[sendtTil];
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;

        logWarning("Send søknad feilet: " + reason);

        if (reason.message === HttpStatus.SERVICE_UNAVAILABLE) {
            dispatch(visMidlertidigDeaktivertPanel(true));
            dispatch(setSendSoknadServiceUnavailable());
        } else {
            dispatch(showSendingFeiletPanel(true));
        }
    }
};
