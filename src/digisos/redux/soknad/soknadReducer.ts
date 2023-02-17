import {ErSystemdataEndret, SoknadActionType, SoknadActionTypeKeys} from "./soknadActionTypes";
import {REST_STATUS, SoknadState} from "./soknadTypes";

export const defaultState: SoknadState = {
    // Visningsstate
    showServerFeil: false,
    showSendingFeiletPanel: false,
    showSideIkkeFunnet: false,
    visLasteOppVedleggModal: false,
    visNedetidPanel: false,

    // Opprettelse, innsending og ettersendelse
    startSoknadPending: false,
    startSoknadFeilet: false,
    sendSoknadPending: false,

    // Soknad state
    behandlingsId: undefined,
};

const reducer = (state: SoknadState = defaultState, action: SoknadActionType) => {
    switch (action.type) {
        case SoknadActionTypeKeys.OPPRETT_SOKNAD:
            return {
                ...state,
                restStatus: REST_STATUS.PENDING,
                startSoknadPending: true,
            };
        case SoknadActionTypeKeys.OPPRETT_SOKNAD_FEILET:
            return {
                ...state,
                restStatus: REST_STATUS.FEILET,
                startSoknadPending: false,
                startSoknadFeilet: true,
            };
        case SoknadActionTypeKeys.OPPRETT_SOKNAD_OK:
            return {
                ...state,
                restStatus: REST_STATUS.OK,
                erGjenopptattSoknad: false,
                skalSjekkeOmSystemdataErEndret: false,
                behandlingsId: action.behandlingsId,
            };
        case SoknadActionTypeKeys.SET_SOKNAD_PENDING:
            return {
                ...state,
                restStatus: REST_STATUS.PENDING,
            };
        case SoknadActionTypeKeys.HENT_SOKNAD_OK:
            return {
                ...state,
                restStatus: action.xsrfCookieReceived ? REST_STATUS.OK : REST_STATUS.XSRF,
                behandlingsId: action.behandlingsId,
                showLargeSpinner: false,
                showSideIkkeFunnet: false,
                showServerFeil: false,
            };
        case SoknadActionTypeKeys.UPDATE_BEHANDLINGSID_PA_STORE: {
            return {
                ...state,
                behandlingsId: action.behandlingsIdFraUrl,
            };
        }

        case SoknadActionTypeKeys.SHOW_SIDE_IKKE_FUNNET: {
            return {
                ...state,
                showSideIkkeFunnet: action.shouldShow,
                showLargeSpinner: false,
            };
        }
        case SoknadActionTypeKeys.SHOW_SERVER_FEIL: {
            return {
                ...state,
                showServerFeil: action.shouldShow,
                showLargeSpinner: false,
            };
        }
        case SoknadActionTypeKeys.START_SOKNAD_DONE:
            return {
                ...state,
                startSoknadPending: false,
            };
        case SoknadActionTypeKeys.SEND_SOKNAD:
            return {
                ...state,
                sendSoknadPending: true,
                showSendingFeiletPanel: false,
            };
        case SoknadActionTypeKeys.SEND_SOKNAD_KNAPP_PENDING:
            return {
                ...state,
                sendSoknadPending: true,
            };
        case SoknadActionTypeKeys.SEND_SOKNAD_OK:
            return {
                ...state,
                sendSoknadPending: false,
            };

        case SoknadActionTypeKeys.SET_ER_SYSTEMDATA_ENDRET: {
            return {
                ...state,
                erSystemdataEndret: action.erSystemdataEndret ? ErSystemdataEndret.YES : ErSystemdataEndret.NO,
                skalSjekkeOmSystemdataErEndret: false,
            };
        }
        case SoknadActionTypeKeys.HENT_SAMTYKKE:
            return {
                ...state,
                samtykkeRestStatus: REST_STATUS.PENDING,
            };
        case SoknadActionTypeKeys.HENT_SAMTYKKE_OK: {
            const {samtykker} = action;
            return {
                ...state,
                samtykker: samtykker,
                samtykkeRestStatus: REST_STATUS.OK,
            };
        }

        case SoknadActionTypeKeys.VIS_LASTE_OPP_VEDLEGG_MODAL: {
            return {
                ...state,
                visLasteOppVedleggModal: action.skalVises,
            };
        }

        case SoknadActionTypeKeys.VIS_NEDETID_PANEL: {
            return {
                ...state,
                visNedetidPanel: action.shouldShow,
            };
        }
        case SoknadActionTypeKeys.SHOW_SENDING_FEILET_PANEL: {
            return {
                ...state,
                showSendingFeiletPanel: action.shouldShow,
                sendSoknadPending: false,
            };
        }

        default:
            return state;
    }
};

export default reducer;
