import {InformationSquareFillIcon, TrashIcon} from "@navikt/aksel-icons";
import {BodyShort, Button, FileUpload, HStack} from "@navikt/ds-react";
import {useMutation} from "@tanstack/react-query";
import {useTranslations} from "next-intl";
import {Upload} from "tus-js-client";
import {digisosConfig} from "../../../../lib/config";
import {UploadStatus, ValidationCode} from "./openEventChannel";

interface Props {
    originalFilename: string;
    convertedFilename?: string;
    uploadId: string;
    validations?: ValidationCode[];
    url?: string;
    status: UploadStatus;
    size?: number;
    showCancelButton?: boolean;
    onTerminate?: () => void;
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
}: Props) => {
    const t = useTranslations("FileUploadItem");
    const {mutate, isPending} = useMutation({
        mutationFn: () => Upload.terminate(`${digisosConfig.uploadBaseURL}/tus/files/${uploadId}`, {}),
        onSuccess: () => onTerminate?.(),
        retry: false,
    });
    const isConverted = !!convertedFilename && convertedFilename !== originalFilename;
    const isUploading = !url && !validations && status !== "FAILED" && status !== "COMPLETE" && !showCancelButton;
    const uploadStatus = isUploading ? "uploading" : "idle";
    return (
        <FileUpload.Item
            file={{name: convertedFilename ?? originalFilename, size}}
            as="li"
            status={uploadStatus}
            button={
                <Button
                    variant="tertiary"
                    data-color="neutral"
                    icon={<TrashIcon title={t("slett")} />}
                    onClick={() => mutate()}
                    loading={isPending}
                />
            }
            onFileClick={url ? () => window.open(url, "_blank", "noopener,noreferrer") : undefined}
            /* @ts-expect-error Funker fint med ReactNode */
            description={isConverted ? <SeOverDescription /> : undefined}
            error={
                validations?.length
                    ? t(`validation.${validations[0]}`)
                    : status === "FAILED"
                      ? t("uploadFailed")
                      : undefined
            }
        />
    );
};

export default FileUploadItem;
