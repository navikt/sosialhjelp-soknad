import {FilFrontend, VedleggFrontendVedleggStatus} from "../../../generated/model";
import {useEffect, useReducer} from "react";
import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import {hentOkonomiskeOpplysninger} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {logError, logInfo, logWarning} from "../../../lib/utils/loggerUtils";
import {deleteVedlegg, saveVedlegg} from "../../../generated/opplastet-vedlegg-ressurs/opplastet-vedlegg-ressurs";
import {logAmplitudeEvent} from "../../../lib/utils/amplitude";
import {AxiosError} from "axios";
import {Opplysning} from "../../../lib/opplysninger";
import {ValideringsFeilKode} from "../../../lib/redux/validering/valideringActionTypes";
import {REST_FEIL} from "../../../lib/redux/restTypes";

type VedleggState = {
    status: VedleggFrontendVedleggStatus;
    loading: boolean;
    files: FilFrontend[];
    error?: string;
};

const initialVedleggState: VedleggState = {
    status: VedleggFrontendVedleggStatus.VedleggKreves,
    loading: true,
    files: [],
};

type VedleggAction =
    | {type: "deleteFile"; uuid: string}
    | {type: "addFile"; file: FilFrontend}
    | {type: "setError"; error: ValideringsFeilKode | REST_FEIL; variables?: object}
    | {type: "setLoading"; loading: boolean}
    | {type: "setFiles"; files: FilFrontend[]}
    | {type: "resetError"};

const VedleggReducer = (state: VedleggState, action: VedleggAction) => {
    switch (action.type) {
        case "setFiles":
            return {
                ...state,
                files: action.files,
                status: action.files.length ? state.status : VedleggFrontendVedleggStatus.VedleggKreves,
            };
        case "deleteFile":
            const files = state.files.filter((file) => file.uuid !== action.uuid);
            const newState = {
                ...state,
                files,
                status: files.length ? state.status : VedleggFrontendVedleggStatus.VedleggKreves,
            };

            if (state.error === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR) newState.error = undefined;

            return newState;
        case "setLoading":
            return {...state, loading: action.loading};
        case "addFile":
            return {
                ...state,
                files: [...state.files, action.file],
            };
        case "setError":
            return {
                ...state,
                error: action.error,
            };
        case "resetError":
            return {
                ...state,
                error: undefined,
            };
        default:
            return state;
    }
};

export const useVedlegg = (opplysning: Opplysning) => {
    const [state, dispatch] = useReducer(VedleggReducer, initialVedleggState);
    const {files, loading} = state;
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();
    const error = state.error ? t(state.error) : null;

    useEffect(() => {
        hentOkonomiskeOpplysninger(behandlingsId)
            .then((f) => {
                const opplysninger = f.okonomiskeOpplysninger?.find((o) => o.type === opplysning.type)?.filer ?? [];
                dispatch({type: "setFiles", files: opplysninger});
            })
            .finally(() => dispatch({type: "setLoading", loading: false}));
    }, [behandlingsId, opplysning.type]);

    const deleteFile = async (uuid?: string) => {
        if (!uuid) {
            logWarning("deleteFile kalt med nullish UUID!");
            return;
        }

        dispatch({type: "setLoading", loading: true});

        deleteVedlegg(behandlingsId, uuid)
            .then(() => {
                dispatch({type: "deleteFile", uuid});
            })
            .catch((reason) => {
                logWarning("Slett vedlegg feilet: " + reason);
                window.location.href = "/sosialhjelp/soknad/feil?reason=slettVedlegg";
            })
            .finally(() => dispatch({type: "setLoading", loading: false}));
    };

    const handleError = (reason: any) => {
        if (!(reason instanceof AxiosError) || !reason.response) return;

        let errorId = extractErrorIdFromResponse(reason.response);

        if (errorId && errorId !== REST_FEIL.KRYPTERT_FIL && errorId !== REST_FEIL.SIGNERT_FIL) {
            logInfo(`Last opp vedlegg feilet: ${reason.response.status} - error id: ${errorId}`);
        }

        if (errorId === "duplikat_fil") {
            dispatch({type: "setError", error: REST_FEIL.DUPLIKAT_FIL});
            return;
        }

        if (errorId === "konvertering_til_pdf_error") {
            dispatch({type: "setError", error: REST_FEIL.KONVERTERING_FEILET});
            return;
        }

        if (errorId === "opplasting.feilmelding.pdf.kryptert") {
            dispatch({type: "setError", error: REST_FEIL.KRYPTERT_FIL});
            return;
        }

        switch (reason.code) {
            case "404":
                dispatch({type: "setError", error: ValideringsFeilKode.FIL_EKSISTERER_IKKE});
                break;
            case "413":
                if (!errorId) {
                    logError("413-feil i upload, antakelse har vist seg feilaktig: at alle 413-feil gir JSON med 'id'");
                }
                dispatch({type: "setError", error: REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR});
                break;
            case "415":
            default:
                dispatch({type: "setError", error: REST_FEIL.FEIL_FILTYPE});
                break;
        }
    };

    const extractErrorIdFromResponse = (response: any): string | undefined => {
        if (typeof response.data === "string") {
            try {
                return JSON.parse(response.data)?.id;
            } catch (error) {
                logWarning("Error parsing the error response: " + error);
            }
        } else if (typeof response.data === "object" && response.data.id) {
            return response.data.id;
        }
    };

    const upload = async (file: Blob) => {
        dispatch({type: "resetError"});
        dispatch({type: "setLoading", loading: true});

        saveVedlegg(behandlingsId, opplysning.type, {file})
            .then((resultFile) => {
                dispatch({
                    type: "addFile",
                    file: resultFile,
                });
                logAmplitudeEvent("fil lastet opp", {opplysningType: opplysning.type});
            })
            .catch(handleError)
            .finally(() => {
                dispatch({type: "setLoading", loading: false});
            });
    };

    return {
        upload,
        deleteFile,
        files,
        error,
        loading,
    };
};
