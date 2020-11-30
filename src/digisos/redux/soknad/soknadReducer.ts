import {ErSystemdataEndret, SoknadActionType, SoknadActionTypeKeys} from "./soknadActionTypes";
import {REST_STATUS, SoknadState} from "./soknadTypes";

export const defaultState: SoknadState = {
    // Visningsstate
    showLargeSpinner: true,
    showServerFeil: false,
    sendSoknadServiceUnavailable: false,
    showSendingFeiletPanel: false,
    showFeilSide: false,
    showSideIkkeFunnet: false,
    visSamtykkeInfo: false,
    visLasteOppVedleggModal: false,
    visMidlertidigDeaktivertPanel: false,
    visIkkePakobletPanel: false,
    visNedetidPanel: false,

    // Authentication state
    linkVisited: false,
    harTilgang: false,
    sperrekode: undefined,
    nedetid: undefined,

    // Rest state
    restStatus: REST_STATUS.INITIALISERT,

    // Tilgang og fornavn
    tilgang: undefined,
    fornavn: undefined,

    // Opprettelse, innsending og ettersendelse
    startSoknadPending: false,
    startSoknadFeilet: false,
    sendSoknadPending: false,

    // Soknad state
    behandlingsId: undefined,
    valgtSoknadsmottaker: undefined,

    // Systemdata
    erSystemdataEndret: ErSystemdataEndret.NOT_ASKED,

    // Samtykker
    samtykker: [],

    // Avbryt
    avbrytDialog: {
        synlig: false,
        destinasjon: null,
    },
    avbrytSoknadSjekkAktiv: true,
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
        case SoknadActionTypeKeys.HENT_SOKNAD:
            return {
                ...state,
                restStatus: REST_STATUS.PENDING,
            };
        case SoknadActionTypeKeys.HENT_SOKNAD_OK:
            const {xsrfCookieReceived, behandlingsId} = action;
            return {
                ...state,
                restStatus: xsrfCookieReceived ? REST_STATUS.OK : REST_STATUS.XSRF,
                behandlingsId: behandlingsId,
                showLargeSpinner: false,
            };
        case SoknadActionTypeKeys.UPDATE_BEHANDLINGSID_PA_STORE: {
            return {
                ...state,
                behandlingsId: action.behandlingsIdFraUrl,
            };
        }

        case SoknadActionTypeKeys.SHOW_FEIL_SIDE: {
            return {
                ...state,
                showFeilSide: true,
                showLargeSpinner: false,
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

        case SoknadActionTypeKeys.START_SOKNAD_OK:
            return {
                ...state,
                startSoknadPending: false,
            };
        case SoknadActionTypeKeys.START_SOKNAD_SERVICE_UNAVAILABLE:
            return {
                ...state,
                startSoknadPending: false,
            };
        case SoknadActionTypeKeys.AVBRYT_SOKNAD:
            return {
                ...state,
                avbrytDialog: {
                    synlig: true,
                    destinasjon: action.destinasjon,
                },
            };
        case SoknadActionTypeKeys.FORTSETT_SOKNAD:
            return {
                ...state,
                avbrytDialog: {
                    synlig: false,
                    destinasjon: null,
                },
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

        case SoknadActionTypeKeys.SLETT_SOKNAD_OK:
            return {
                ...defaultState,
            };

        case SoknadActionTypeKeys.OPPDATER_SOKNADSMOTTAKER_STATUS:
            const {valgtSoknadsmottaker} = action;
            return {
                ...state,
                valgtSoknadsmottaker,
            };
        case SoknadActionTypeKeys.SET_ER_SYSTEMDATA_ENDRET: {
            return {
                ...state,
                erSystemdataEndret: action.erSystemdataEndret ? ErSystemdataEndret.YES : ErSystemdataEndret.NO,
                skalSjekkeOmSystemdataErEndret: false,
            };
        }

        case SoknadActionTypeKeys.HENT_SAMTYKKE_OK: {
            const {samtykker} = action;
            return {
                ...state,
                samtykker: samtykker,
            };
        }

        case SoknadActionTypeKeys.SHOW_LARGE_SPINNER: {
            return {
                ...state,
                showLargeSpinner: action.show,
            };
        }
        case SoknadActionTypeKeys.VIS_SAMTYKKE_INFO: {
            return {
                ...state,
                visSamtykkeInfo: action.skalVises,
            };
        }

        case SoknadActionTypeKeys.VIS_LASTE_OPP_VEDLEGG_MODAL: {
            return {
                ...state,
                visLasteOppVedleggModal: action.skalVises,
            };
        }

        case SoknadActionTypeKeys.LAGRE_TILGANG_OG_FORNAVN_PA_STORE: {
            const {tilgangResponse, fornavnResponse} = action;

            // FIXME: Dette burde gjøres annerledes.
            const AUTH_LINK_VISITED = "sosialhjelpSoknadAuthLinkVisited";
            // @ts-ignore
            window[AUTH_LINK_VISITED] = true;

            return {
                ...state,
                tilgang: tilgangResponse,
                fornavn: fornavnResponse.fornavn,
            };
        }

        case SoknadActionTypeKeys.LAGRE_NEDETID_PA_STORE: {
            const {nedetidResponse} = action;
            return {
                ...state,
                nedetid: nedetidResponse,
            };
        }
        case SoknadActionTypeKeys.VIS_MIDLERTIDIG_DEAKTIVERT_PANEL: {
            return {
                ...state,
                visMidlertidigDeaktivertPanel: action.shouldShow,
            };
        }
        case SoknadActionTypeKeys.VIS_IKKE_PAKOBLET_PANEL: {
            return {
                ...state,
                visIkkePakobletPanel: action.shouldShow,
            };
        }
        case SoknadActionTypeKeys.VIS_NEDETID_PANEL: {
            return {
                ...state,
                visNedetidPanel: action.shouldShow,
            };
        }
        case SoknadActionTypeKeys.SET_SEND_SOKNAD_SERVICE_UNAVAILABLE: {
            return {
                ...state,
                sendSoknadServiceUnavailable: true,
                sendSoknadPending: false,
            };
        }
        case SoknadActionTypeKeys.RESET_SEND_SOKNAD_SERVICE_UNAVAILABLE: {
            return {
                ...state,
                sendSoknadServiceUnavailable: false,
                visMidlertidigDeaktivertPanel: false,
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
