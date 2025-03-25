// When new backend has been deployed, this can be removed.
import {DokumentUpload, VedleggFrontendType} from "../../../generated/model";
import {useEffect, useMemo, useReducer, useState} from "react";
import {DocumentListReducer, initialDocumentListState} from "../../../sider/08-vedlegg/lib/DocumentListReducer";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import {isSoknadApiError} from "../../api/error/isSoknadApiError";
import {DigisosApiErrorMap} from "../../api/error/DigisosApiErrorMap";
import {REST_FEIL} from "../../api/error/restFeil";
import {useHentOkonomiskeOpplysninger} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {useDeleteDokument} from "../../../generated/opplastet-vedlegg-ressurs/opplastet-vedlegg-ressurs";
import {humanizeFilesize} from "../../../sider/08-vedlegg/lib/humanizeFilesize";
import {axiosInstance} from "../../api/axiosInstance";
import {logAmplitudeEvent} from "../../amplitude/Amplitude";
import {useContextSessionInfo} from "../../providers/useContextSessionInfo.ts";
import {useValgtKategoriContext} from "../../providers/KortKategorierContextProvider.tsx";

const TEN_MEGABYTE_COMPAT_FALLBACK = 10 * 1024 * 1024;

export const useVedlegg = (dokumentasjonType: VedleggFrontendType) => {
    const [error, setError] = useState<string | null>(null);
    const [maxUploadSize, setMaxUploadSize] = useState<number | null>(null);
    const [uploadPercent, setUploadPercent] = useState<number | null>(null);
    const [{documents}, dispatch] = useReducer(DocumentListReducer, initialDocumentListState(dokumentasjonType));
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();

    const handleApiError = (reason: any) =>
        setError(t(isSoknadApiError(reason) ? DigisosApiErrorMap[reason.error] : REST_FEIL.GENERELL_FEIL));

    const sessionInfo = useContextSessionInfo();
    const {data: dokumentasjon, isPending: isDokumentasjonPending} = useHentOkonomiskeOpplysninger(behandlingsId, {});
    const {mutate: mutateDelete, isPending: isDeletionPending} = useDeleteDokument();

    const isPending = isDokumentasjonPending || isDeletionPending || uploadPercent !== null;
    const {setValgtKategoriData} = useValgtKategoriContext();

    /**
     * When the data on the server has changed, we automatically update the client-side list.
     */
    useEffect(() => dispatch({type: "initialize", data: dokumentasjon?.okonomiskeOpplysninger}), [dokumentasjon]);

    /**
     * When component is mounted, we try to get the max upload size.
     * Note that this will generally be cached by react-request, so
     * this is not an expensive operation.
     *
     * Todo: Well, it shouldn't be - I should verify that this is cached.
     */
    useEffect(
        () => sessionInfo && setMaxUploadSize(sessionInfo.maxUploadSizeBytes ?? TEN_MEGABYTE_COMPAT_FALLBACK),
        [sessionInfo]
    );

    /**
     * Attempts to delete the dokument with the given uuid.
     * If successful, it removes it from the client-side list.
     *
     * @param dokumentId The dokumentId to delete
     */
    const deleteDocument = (dokumentId: string) => {
        mutateDelete(
            {behandlingsId, dokumentId},
            {
                onError: handleApiError,
                onSuccess: () => {
                    dispatch({type: "remove", dokumentId});
                    setValgtKategoriData({valgtKategorier: "annet|annet"});

                    logAmplitudeEvent("dokument slettet", {opplysningType: dokumentasjonType}).then();
                },
            }
        );
    };

    /**
     * Attempts to upload the given file.
     * If successful, it adds the dokument to the client-side list.
     * @param file The file to upload
     */
    const uploadDocument = async (file: File) => {
        setError(null);

        if (maxUploadSize != null && file.size > maxUploadSize) {
            setError(t(REST_FEIL.FOR_STOR, "", {maxUploadSize: humanizeFilesize(maxUploadSize)}));
            return Promise.reject(new Error("for stor"));
        }

        try {
            const data = new FormData();
            data.append("file", file);

            const dokument = await axiosInstance<DokumentUpload>({
                url: `/opplastetVedlegg/${behandlingsId}/${encodeURI(dokumentasjonType)}`,
                method: "POST",
                headers: {"Content-Type": "multipart/form-data"},
                data,
                onUploadProgress: ({loaded, total}) => {
                    const percentCompleted = Math.round((loaded * 100) / total!);
                    setUploadPercent(percentCompleted);
                },
            });

            setUploadPercent(null);
            dispatch({type: "insert", dokument});
            setValgtKategoriData({valgtKategorier: "annet|annet"});
            await logAmplitudeEvent("dokument lastet opp", {opplysningType: dokumentasjonType});
        } catch (e: any) {
            handleApiError(e);
        } finally {
            setUploadPercent(null);
        }
    };

    const allUploadedFiles = useMemo(() => {
        return (
            dokumentasjon?.okonomiskeOpplysninger
                ?.filter((opplysning) => opplysning.filer?.length)
                .flatMap(
                    (opplysning) =>
                        opplysning.filer?.map((fil) => ({
                            ...fil,
                            dokumentasjonType: opplysning.type,
                        })) ?? []
                ) ?? []
        );
    }, [dokumentasjon]);

    return {
        uploadDocument,
        deleteDocument,
        allUploadedFiles,
        maxUploadSize,
        currentUpload: uploadPercent == null ? null : {percent: uploadPercent},
        documents,
        error,
        isPending,
    };
};
