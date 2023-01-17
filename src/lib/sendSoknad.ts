import {AnyAction, Dispatch} from "redux";
import {fetchPost, getInnsynUrl, HttpStatus} from "../nav-soknad/utils/rest-utils";
import {SendSoknadResponse} from "../digisos/redux/soknad/soknadTypes";
import {
    sendSoknadOk,
    setSendSoknadServiceUnavailable,
    showSendingFeiletPanel,
    visMidlertidigDeaktivertPanel,
} from "../digisos/redux/soknad/soknadActions";
import {logWarning} from "../nav-soknad/utils/loggerUtils";
import {basePath} from "../configuration";

export type SoknadSendtTil = "SVARUT" | "FIKS_DIGISOS_API";

/**
 * Sender inn søknad og returnerer relevant status-side
 * @param behandlingsId
 * @param dispatch
 * @return URL til neste steg
 */
export const sendSoknad = async (behandlingsId: string, dispatch: Dispatch<AnyAction>) => {
    try {
        const response = await fetchPost<SendSoknadResponse>(
            `soknader/${behandlingsId}/actions/send`,
            JSON.stringify({behandlingsId}),
            true
        );

        dispatch(sendSoknadOk(behandlingsId));

        if (!response) return `${basePath}/skjema/${behandlingsId}/ettersendelse`;
        if (response.sendtTil === "FIKS_DIGISOS_API") return `${getInnsynUrl()}${response.id}/status`;
        if (response?.id) return `${basePath}/skjema/${response.id}/ettersendelse`;
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;

        logWarning("send soknad saga feilet: " + reason);

        if (reason.message === HttpStatus.SERVICE_UNAVAILABLE) {
            dispatch(visMidlertidigDeaktivertPanel(true));
            dispatch(setSendSoknadServiceUnavailable());
        } else {
            dispatch(showSendingFeiletPanel(true));
        }
    }
};
