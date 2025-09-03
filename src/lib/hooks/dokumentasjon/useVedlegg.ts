// When new backend has been deployed, this can be removed.
import {useEffect, useMemo, useReducer, useState} from "react";
import {DocumentListReducer, initialDocumentListState} from "../../../sider/08-vedlegg/lib/DocumentListReducer";
import {useSoknadId} from "../common/useSoknadId.ts";
import {useTranslation} from "react-i18next";
import {isSoknadApiError} from "../../api/error/isSoknadApiError";
import {DigisosApiErrorMap} from "../../api/error/DigisosApiErrorMap";
import {REST_FEIL} from "../../api/error/restFeil";
import {humanizeFilesize} from "../../../sider/08-vedlegg/lib/humanizeFilesize";
import {useContextSessionInfo} from "../../providers/useContextSessionInfo.ts";
import {DokumentasjonDtoType} from "../../../generated/new/model";
import {saveDokument, useDeleteDokument} from "../../../generated/new/dokument-controller/dokument-controller.ts";
import {useValgtKategoriContext} from "../../providers/KortKategorierContextProvider.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {useGetForventetDokumentasjon} from "../../../generated/new/dokumentasjon-controller/dokumentasjon-controller.ts";

const TEN_MEGABYTE_COMPAT_FALLBACK = 10 * 1024 * 1024;

export const useVedlegg = (dokumentasjonType: DokumentasjonDtoType) => {
    const [error, setError] = useState<string | null>(null);
    const [maxUploadSize, setMaxUploadSize] = useState<number | null>(null);
    const [uploadPercent, setUploadPercent] = useState<number | null>(null);
    const [{documents}, dispatch] = useReducer(DocumentListReducer, initialDocumentListState(dokumentasjonType));
    const soknadId = useSoknadId();
    const {t} = useTranslation();

    const handleApiError = (reason: any) =>
        setError(t(isSoknadApiError(reason) ? DigisosApiErrorMap[reason.error] : REST_FEIL.GENERELL_FEIL));

    const sessionInfo = useContextSessionInfo();
    const {data: dokumentasjon, isPending: isDokumentasjonPending} = useGetForventetDokumentasjon(soknadId);
    const {mutate: mutateDelete, isPending: isDeletionPending} = useDeleteDokument();

    const isPending = isDokumentasjonPending || isDeletionPending || uploadPercent !== null;
    const {setValgtKategoriData} = useValgtKategoriContext();

    const queryClient = useQueryClient();
    queryClient.invalidateQueries();

    /**
     * When the data on the server has changed, we automatically update the client-side list.
     */
    useEffect(() => dispatch({type: "initialize", data: dokumentasjon?.dokumentasjon}), [dokumentasjon]);

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
    const deleteDocument = async (dokumentId: string) => {
        mutateDelete(
            {soknadId, dokumentId},
            {
                onError: handleApiError,
                onSuccess: () => {
                    dispatch({type: "remove", dokumentId});
                    setValgtKategoriData({valgtKategorier: "UTGIFTER_ANDRE_UTGIFTER"});

                    //brukes for å tvinge en refretch av dokumentasjon fra backend slik at ting blir rendret
                    queryClient.invalidateQueries();
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

            const dokument = await saveDokument(
                soknadId,
                dokumentasjonType,
                {file},
                {
                    onUploadProgress: ({loaded, total}) => {
                        const percentCompleted = Math.round((loaded * 100) / total!);
                        setUploadPercent(percentCompleted);
                    },
                }
            );

            setUploadPercent(null);
            dispatch({type: "insert", dokument});
            setValgtKategoriData({valgtKategorier: "UTGIFTER_ANDRE_UTGIFTER"});

            //brukes for å tvinge en refretch av dokumentasjon fra backend slik at ting blir rendret
            await queryClient.invalidateQueries();
        } catch (e: any) {
            handleApiError(e);
        } finally {
            setUploadPercent(null);
        }
    };

    const allUploadedFiles = useMemo(() => {
        return (
            dokumentasjon?.dokumentasjon
                ?.filter((opplysning) => opplysning.dokumenter?.length)
                .flatMap(
                    (opplysning) =>
                        opplysning.dokumenter?.map((fil) => ({
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
