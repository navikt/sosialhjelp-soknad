import {Samtykke, SoknadActionType, SoknadActionTypeKeys, VisNedetidPanel} from "./soknadActionTypes";
import {logError} from "../../../nav-soknad/utils/loggerUtils";

export function opprettSoknadOk(behandlingsId: string): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.OPPRETT_SOKNAD_OK,
        behandlingsId,
    };
}

// This function only sets the soknad REST status to Pending
export function setSoknadPending(behandlingsId: string): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.SET_SOKNAD_PENDING,
        behandlingsId,
    };
}

// This function sets xsrfCookieReceived and behandlingsId
export function hentSoknadOk(xsrfCookieReceived: boolean, behandlingsId: string): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.HENT_SOKNAD_OK,
        xsrfCookieReceived,
        behandlingsId,
    };
}

export function sendSoknadOk(behandlingsId: string): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.SEND_SOKNAD_OK,
        behandlingsId,
    };
}

export const setErSystemdataEndret = (erSystemdataEndret: boolean): SoknadActionType => {
    return {
        type: SoknadActionTypeKeys.SET_ER_SYSTEMDATA_ENDRET,
        erSystemdataEndret,
    };
};

export function hentSamtykkerOk(samtykker: Samtykke[]): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.HENT_SAMTYKKE_OK,
        samtykker,
    };
}

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

export function showSendingFeiletPanel(shouldShow: boolean): SoknadActionType {
    return {
        type: SoknadActionTypeKeys.SHOW_SENDING_FEILET_PANEL,
        shouldShow: shouldShow,
    };
}

export function setShowPageNotFound(shouldShow: boolean): SoknadActionType {
    if (shouldShow) logError("setShowPageNotFound(true)");

    return {
        type: SoknadActionTypeKeys.SHOW_SIDE_IKKE_FUNNET,
        shouldShow,
    };
}

export const showDowntimeError = (shouldShow: boolean): VisNedetidPanel => {
    return {
        type: SoknadActionTypeKeys.VIS_NEDETID_PANEL,
        shouldShow,
    };
};
