import {
    EttersendelseActionTypeKeys,
    EttersendelseActionTypes,
    EttersendelseFeilkode,
    EttersendelseState,
    EttersendelseVedleggBackend,
} from "./ettersendelseTypes";
import {REST_FEIL, REST_STATUS} from "../restTypes";
import {FilFrontend} from "../../../generated/model";

const initialState: EttersendelseState = {
    restStatus: REST_STATUS.INITIALISERT,
    opplastingStatus: REST_STATUS.INITIALISERT,
    ettersendStatus: REST_STATUS.INITIALISERT,
    opplastingVedleggType: null,
    data: [],
    brukerbehandlingId: null,
    innsendte: {
        originalSoknad: null,
        ettersendelser: null,
    },
    feilKode: "",
    feiletVedleggId: "",
    visSoknadAlleredeSendtPromt: false,
};

const reducer = (state: EttersendelseState = initialState, action: EttersendelseActionTypes): EttersendelseState => {
    switch (action.type) {
        case EttersendelseActionTypeKeys.NY_OK: {
            return {
                ...state,
                brukerbehandlingId: action.brukerbehandlingId,
            };
        }
        case EttersendelseActionTypeKeys.NY_FEILET: {
            return {
                ...state,
                brukerbehandlingId: action.brukerbehandlingId,
                feilKode: EttersendelseFeilkode.NY_ETTERSENDELSE_FEILET,
            };
        }
        case EttersendelseActionTypeKeys.LAST_OPP: {
            return {
                ...state,
                opplastingStatus: REST_STATUS.PENDING,
                opplastingVedleggType: action.opplysningType,
            };
        }
        case EttersendelseActionTypeKeys.LAST_OPP_FEILET: {
            return {
                ...state,
                feilKode: action.feilKode,
                opplastingStatus: REST_STATUS.FEILET,
                feiletVedleggId: action.vedleggId,
                opplastingVedleggType: null,
            };
        }
        case EttersendelseActionTypeKeys.LAST_OPP_OK: {
            return {
                ...state,
                opplastingStatus: REST_STATUS.OK,
            };
        }
        case EttersendelseActionTypeKeys.LES_ETTERSENDELSES_VEDLEGG_OK: {
            return {
                ...state,
                data: action.manglendeVedleggsListe,
            };
        }
        case EttersendelseActionTypeKeys.FIL_OPPLASTING_OK: {
            const dataUpdated = state.data.map((vedlegg) => {
                if (vedlegg.type === action.opplysningType) {
                    vedlegg.filer.push(action.fil);
                }
                return vedlegg;
            });

            return {
                ...state,
                data: dataUpdated,
                opplastingVedleggType: null,
            };
        }
        case EttersendelseActionTypeKeys.SLETT_VEDLEGG_OK: {
            const {filUuid, opplysningType} = action;

            const dataUpdated = state.data.map((vedlegg: EttersendelseVedleggBackend) => {
                if (vedlegg.type === opplysningType)
                    vedlegg.filer = vedlegg.filer.filter((fil: FilFrontend) => fil.uuid !== filUuid);

                return vedlegg;
            });

            const samletVedleggStorrelseForStor: boolean =
                state.feilKode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE;

            const opplastingStatusUpdated: REST_STATUS = samletVedleggStorrelseForStor
                ? (state.opplastingStatus = REST_STATUS.OK)
                : state.opplastingStatus;
            const feiletVedleggIdUpdated: string = samletVedleggStorrelseForStor
                ? (state.feiletVedleggId = "")
                : state.feiletVedleggId;
            const feilKodeUpdated: string = samletVedleggStorrelseForStor ? (state.feilKode = "") : state.feilKode;

            return {
                ...state,
                data: dataUpdated,
                feilKode: feilKodeUpdated,
                opplastingStatus: opplastingStatusUpdated,
                feiletVedleggId: feiletVedleggIdUpdated,
            };
        }
        case EttersendelseActionTypeKeys.ETTERSEND_PENDING: {
            return {
                ...state,
                ettersendStatus: REST_STATUS.PENDING,
            };
        }
        case EttersendelseActionTypeKeys.ETTERSEND_OK: {
            return {
                ...state,
                ettersendStatus: REST_STATUS.OK,
            };
        }
        case EttersendelseActionTypeKeys.LES_ETTERSENDELSER: {
            return {
                ...state,
                restStatus: REST_STATUS.PENDING,
            };
        }
        case EttersendelseActionTypeKeys.LES_ETTERSENDELSER_OK: {
            return {
                ...state,
                restStatus: REST_STATUS.OK,
                innsendte: action.ettersendelser,
            };
        }
        case EttersendelseActionTypeKeys.VIS_SOKNAD_ALLEREDE_SENDT_PROMPT: {
            return {
                ...state,
                visSoknadAlleredeSendtPromt: action.visPrompt,
            };
        }
        default:
            return state;
    }
};

export default reducer;
