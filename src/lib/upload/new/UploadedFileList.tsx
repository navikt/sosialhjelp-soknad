import {Heading, VStack} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import React from "react";
import digisosConfig from "../../config.ts";
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
}

const createUrl = (upload: UploadState) => {
    if (!upload.url) {
        return undefined;
    }
    if (upload.url.startsWith("http")) {
        return upload.url;
    }
    return `${digisosConfig.uploadBaseURL}/${upload.url}`;
};

export const UploadedFileList = ({
    uploads,
    validations,
    converted,
    showSlowProcessingWarning,
    headingLevel,
    onRemove,
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
                        url={createUrl(upload)}
                        uploadId={upload.id}
                        convertedFilename={upload.finalFilename}
                        originalFilename={upload.originalFilename}
                        validations={upload.validations}
                        status={upload.status}
                        size={upload.size}
                        showCancelButton={
                            showSlowProcessingWarning && (upload.status === "PENDING" || upload.status === "PROCESSING")
                        }
                        onTerminate={upload.correlationId ? () => onRemove(upload.correlationId!) : undefined}
                    />
                ))}
            </VStack>
        </VStack>
    );
};
