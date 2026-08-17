import {FileUpload, VStack} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import React from "react";
import {useMediaQuery} from "usehooks-ts";
import {ALLOWED_FILE_TYPES, MAX_FILES, MAX_SIZE_MB} from "./uploadConstants.ts";
import {VedleggUploadTrigger} from "./VedleggUploadTrigger.tsx";
import {UploadedFileList} from "./UploadedFileList.tsx";
import InlineStatusMessage from "./InlineStatusMessage.tsx";
import useSlowProcessingWarning from "./useSlowProcessingWarning.ts";
import {DokumentasjonDtoType} from "../../../generated/new/model";
import useAlleredeLevert from "../../hooks/dokumentasjon/useAlleredeLevert.ts";
import {AlreadyUploadedCheckbox} from "../AlreadyUploadedCheckbox.tsx";
import {useVedleggUpload} from "./useVedleggUpload.ts";

export interface DokumenterUploadProps {
    className?: string;
    describedBy?: string;
    hideAlreadyUploaded?: boolean;
    kategori: DokumentasjonDtoType;
    soknadId: string;
    contextId: string;
    label: string;
    description?: React.ReactNode;
    fileListHeadingLevel: "2" | "3" | "4" | "5" | "6";
}

export const VedleggUpload = ({
    className,
    describedBy,
    hideAlreadyUploaded,
    kategori,
    soknadId,
    contextId,
    label,
    description,
    fileListHeadingLevel,
}: DokumenterUploadProps) => {
    const t = useTranslations("VedleggUpload");
    const isMobile = useMediaQuery("(max-width: 768px)");
    const {uploads, validations, filesAdded, folderDropError, onSelect, onRemove, hasPendingOrProcessing, converted} =
        useVedleggUpload({contextId, soknadId, kategori});
    const {updateAlleredeLevert, alleredeLevert} = useAlleredeLevert(kategori);
    const showSlowProcessingWarning = useSlowProcessingWarning(hasPendingOrProcessing);

    return (
        <FileUpload
            className={className}
            translations={{
                dropzone: {
                    buttonMultiple: t("button"),
                    or: t("eller"),
                    dragAndDropMultiple: t("dragAndDrop"),
                },
                item: {
                    uploading: t("uploading"),
                    deleteButtonTitle: t("delete"),
                },
            }}
        >
            <span className="sr-only" role="status">
                {filesAdded > 0 ? t("filLagtTil", {count: filesAdded}) : ""}
            </span>
            <VStack gap="space-24">
                {!isMobile && (
                    <FileUpload.Dropzone
                        label={label}
                        description={description}
                        accept={ALLOWED_FILE_TYPES}
                        disabled={alleredeLevert}
                        fileLimit={{max: MAX_FILES, current: uploads.length}}
                        maxSizeInBytes={MAX_SIZE_MB}
                        onSelect={onSelect}
                    />
                )}
                {isMobile && (
                    <VedleggUploadTrigger
                        label={label}
                        description={description}
                        describedBy={describedBy}
                        onSelect={onSelect}
                    />
                )}
                {folderDropError && (
                    <InlineStatusMessage variant="error" role="alert">
                        {t("mappeIkkeTillatt")}
                    </InlineStatusMessage>
                )}
                {uploads.length > 0 && (
                    <UploadedFileList
                        uploads={uploads}
                        validations={validations}
                        converted={converted}
                        showSlowProcessingWarning={showSlowProcessingWarning}
                        onRemove={onRemove}
                        headingLevel={fileListHeadingLevel}
                    />
                )}
                {!hideAlreadyUploaded && (
                    <AlreadyUploadedCheckbox
                        opplysningstype={kategori}
                        disabled={!!uploads.length || !!hasPendingOrProcessing}
                        alleredeLevert={alleredeLevert}
                        updateAlleredeLevert={updateAlleredeLevert}
                    />
                )}
            </VStack>
        </FileUpload>
    );
};
