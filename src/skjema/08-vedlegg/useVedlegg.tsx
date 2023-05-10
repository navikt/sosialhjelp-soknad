import {FilFrontend, VedleggFrontendVedleggStatus} from "../../generated/model";
import {ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";
import {REST_FEIL} from "../../digisos/redux/soknadsdata/soknadsdataTypes";
import {Opplysning} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import {useEffect, useReducer} from "react";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {useTranslation} from "react-i18next";
import {hentOkonomiskeOpplysninger} from "../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {logError, logInfo, logWarning} from "../../nav-soknad/utils/loggerUtils";
import {deleteVedlegg, saveVedlegg} from "../../generated/opplastet-vedlegg-ressurs/opplastet-vedlegg-ressurs";
import {logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import {AxiosError} from "axios";

type VedleggState = {
    status: VedleggFrontendVedleggStatus;
    loading: boolean;
    files: FilFrontend[];
    error?: string;
};

const initialVedleggState: VedleggState = {
    status: VedleggFrontendVedleggStatus.Ukjent,
    loading: true,
    files: [],
};

type VedleggAction =
    | {type: "deleteFile"; uuid: string}
    | {type: "addFile"; file: FilFrontend}
    | {type: "setError"; error: ValideringsFeilKode | REST_FEIL; variables?: object}
    | {type: "setLoading"; loading: boolean}
    | {type: "setFiles"; files: FilFrontend[]};

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

    const deleteFile = (uuid?: string) => {
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

    const upload = (file: File) => {
        dispatch({type: "setLoading", loading: true});
        saveVedlegg(behandlingsId, opplysning.type, {file})
            .then((file) => {
                dispatch({type: "addFile", file});

                logAmplitudeEvent("fil lastet opp", {opplysningType: opplysning.type});
            })
            .catch((reason) => {
                if (reason instanceof AxiosError && reason.response) {
                    const error = JSON.parse(reason.response.data)?.id;

                    if (error !== REST_FEIL.KRYPTERT_FIL && error !== REST_FEIL.SIGNERT_FIL) {
                        logInfo(`Last opp vedlegg feilet: ${reason.response.status} - error id: ${error}`);
                    }

                    switch (reason.code) {
                        case "404":
                            dispatch({type: "setError", error: ValideringsFeilKode.FIL_EKSISTERER_IKKE});
                            return;
                        case "413": // Request entity too large
                            // En liten sikkerhetssjekk her vi refaktorerer
                            if (!error) {
                                logError(
                                    "413-feil i upload, antakelse har vist seg feilaktig: at alle 413-feil gir JSON med 'id'"
                                );
                            }
                            dispatch({type: "setError", error});
                            return;
                        case "415": // Unsupported media type
                            dispatch({type: "setError", error: REST_FEIL.FEIL_FILTYPE});
                            return;
                        default:
                            dispatch({type: "setError", error});
                            return;
                    }
                }
            })
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
