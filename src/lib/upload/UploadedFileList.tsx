import {Heading, VStack} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import React from "react";
import digisosConfig from "../config.ts";
import FileUploadItem from "./FileUploadItem.tsx";
import {UploadStatusMessages} from "./UploadStatusMessages.tsx";
import {UploadState, ValidationCode} from "./openEventChannel.ts";

interface UploadedFileListProps {
    uploads: UploadState[];
    validations: ValidationCode[];
    converted: boolean;
    showSlowProcessingWarning: boolean;
    headingLevel: "2" | "3" | "4" | "5" | "6";
    onRemove: (correlationId: string) => void;
    /** Sync-modus: sletter via sync-API. Kaster ved feil. */
    onDelete?: (upload: UploadState) => Promise<void>;
    onRetry?: (correlationId: string) => void;
}

export const UploadedFileList = ({
    uploads,
    validations,
    converted,
    showSlowProcessingWarning,
    headingLevel,
    onRemove,
    onDelete,
    onRetry,
}: UploadedFileListProps) => {
    const t = useTranslations("UploadedFileList");

    return (
        <VStack gap="space-8">
            <Heading size="xsmall" level={headingLevel}>
                {t("valgteFiler", {antall_filer: uploads.length})}
            </Heading>
            <UploadStatusMessages
                converted={converted}
                showSlowProcessingWarning={showSlowProcessingWarning}
                validations={validations}
            />
            <VStack as="ul" gap="space-8">
                {uploads.map((upload) => (
                    <FileUploadItem
                        key={upload.id}
                        url={upload.url ? `${digisosConfig.uploadBaseURL}/${upload.url}` : undefined}
                        uploadId={upload.id}
                        convertedFilename={upload.finalFilename}
                        originalFilename={upload.originalFilename}
                        validations={upload.validations}
                        status={upload.status}
                        size={upload.size}
                        isConverted={upload.converted}
                        showCancelButton={
                            showSlowProcessingWarning && (upload.status === "PENDING" || upload.status === "PROCESSING")
                        }
                        onDelete={onDelete && upload.correlationId ? () => onDelete(upload) : undefined}
                        onRetry={onRetry && upload.correlationId ? () => onRetry(upload.correlationId!) : undefined}
                        onTerminate={upload.correlationId ? () => onRemove(upload.correlationId!) : undefined}
                    />
                ))}
            </VStack>
        </VStack>
    );
};
