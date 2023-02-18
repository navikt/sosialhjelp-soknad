import {Dispatch} from "redux";
import {getInnsynUrl} from "../nav-soknad/utils/rest-utils";
import {logWarning} from "../nav-soknad/utils/loggerUtils";
import {basePath} from "../configuration";
import {sendSoknad as sendSoknadAction} from "../generated/soknad-actions/soknad-actions";
import {SendTilUrlFrontendSendtTil} from "../generated/model";

/**
 * Sender inn søknad og returnerer relevant status-side
 * @param behandlingsId
 * @param dispatch
 * @return URL til neste steg
 */
const sendSoknad = async (behandlingsId: string, dispatch: Dispatch) => {
    try {
        const response = await sendSoknadAction(behandlingsId);

        const {id, sendtTil} = response;

        const redirectUrl: Record<SendTilUrlFrontendSendtTil, string> = {
            FIKS_DIGISOS_API: `${getInnsynUrl()}${id}/status`,
            SVARUT: `${basePath}/skjema/${id}/ettersendelse`,
        };

        return redirectUrl[sendtTil];
    } catch (reason) {
        logWarning("Send søknad feilet: " + reason);
        throw reason;
    }
};
