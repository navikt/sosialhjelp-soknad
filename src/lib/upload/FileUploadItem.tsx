import {InformationSquareFillIcon, TrashIcon, XMarkIcon} from "@navikt/aksel-icons";
import {BodyShort, Button, FileUpload, HStack, Loader} from "@navikt/ds-react";
import {useMutation} from "@tanstack/react-query";
import {useTranslations} from "next-intl";
import {Upload} from "tus-js-client";
import {digisosConfig} from "../config.ts";
import {UploadStatus, ValidationCode} from "./openEventChannel.ts";

interface Props {
    originalFilename: string;
    convertedFilename?: string;
    uploadId: string;
    validations?: ValidationCode[];
    url?: string;
    isConverted: boolean;
    status: UploadStatus;
    size?: number;
    showCancelButton?: boolean;
    onTerminate?: () => void;
    deleteDisabled?: boolean;
    /** Sync-modus: erstatter tus-terminate. Kaster ved feil, og raden beholdes. */
    onDelete?: () => Promise<void>;
    onRetry?: () => void;
}

const SeOverDescription = () => {
    const t = useTranslations("FileUploadItem");
    return (
        <HStack align="center" gap="space-8" className="text-ax-text-info-subtle">
            <InformationSquareFillIcon aria-hidden />
            <BodyShort>{t("seOver")}</BodyShort>
        </HStack>
    );
};

const FileUploadItem = ({
    convertedFilename,
    originalFilename,
    uploadId,
    validations,
    url,
    status,
    size,
    showCancelButton,
    onTerminate,
    isConverted,
    onDelete,
    onRetry,
}: Props) => {
    const t = useTranslations("FileUploadItem");
    const {mutate, isPending} = useMutation({
        mutationFn: () => Upload.terminate(`${digisosConfig.uploadBaseURL}/tus/files/${uploadId}`, {}),
        onSettled: () => onTerminate?.(),
        retry: false,
    });
    const {
        mutate: mutateDelete,
        isPending: isDeleting,
        isError: deleteFailed,
    } = useMutation({mutationFn: async () => onDelete?.(), retry: false});
    const syncDelete = onDelete !== undefined;
    const isUploading =
        !url &&
        !validations &&
        status !== "FAILED" &&
        status !== "RETRYABLE_FAILED" &&
        status !== "COMPLETE" &&
        !showCancelButton;
    const uploadStatus = isUploading ? "uploading" : "idle";
    return (
        <FileUpload.Item
            file={{name: convertedFilename ?? originalFilename ?? "", size}}
            as="li"
            status={uploadStatus}
            button={
                <HStack align="center" gap="space-4" flexShrink="0">
                    {showCancelButton && <Loader />}
                    {status === "RETRYABLE_FAILED" && onRetry && (
                        <Button variant="secondary" size="small" onClick={onRetry}>
                            {t("provIgjen")}
                        </Button>
                    )}
                    <Button
                        variant="tertiary"
                        data-color="neutral"
                        icon={showCancelButton ? <XMarkIcon title={t("cancel")} /> : <TrashIcon title={t("slett")} />}
                        onClick={() => (syncDelete ? mutateDelete() : mutate())}
                        loading={syncDelete ? isDeleting : isPending}
                    />
                </HStack>
            }
            onFileClick={url ? () => window.open(url, "_blank", "noopener,noreferrer") : undefined}
            /* @ts-expect-error Funker fint med ReactNode */
            description={isConverted ? <SeOverDescription /> : showCancelButton ? t("lasterOpp") : undefined}
            error={
                deleteFailed
                    ? t("deleteFailed")
                    : validations?.length
                      ? t(`validation.${validations[0]}`)
                      : status === "RETRYABLE_FAILED"
                        ? t("retryableFailed")
                        : status === "FAILED"
                          ? t("uploadFailed")
                          : undefined
            }
        />
    );
};

export default FileUploadItem;
