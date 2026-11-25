import {UploadIcon} from "@navikt/aksel-icons";
import {BodyShort, Button, FileObject, FileUpload, Label, VStack} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import React, {useId} from "react";
import {ALLOWED_FILE_TYPES, MAX_SIZE_MB} from "./uploadConstants.ts";

interface VedleggUploadTriggerProps {
    label: string;
    description?: React.ReactNode;
    describedBy?: string;
    onSelect: (files: FileObject[]) => void;
}

export const VedleggUploadTrigger = ({label, description, describedBy, onSelect}: VedleggUploadTriggerProps) => {
    const t = useTranslations("VedleggUploadTrigger");
    const labelId = useId();
    const descriptionId = useId();

    const mobileDescribedBy =
        [labelId, description ? descriptionId : undefined, describedBy].filter(Boolean).join(" ") || undefined;

    return (
        <VStack gap="space-8" align="start">
            <Label id={labelId}>{label}</Label>
            {description && (
                <BodyShort as="div" id={descriptionId} textColor="subtle">
                    {description}
                </BodyShort>
            )}
            <FileUpload.Trigger accept={ALLOWED_FILE_TYPES} maxSizeInBytes={MAX_SIZE_MB} onSelect={onSelect}>
                <Button aria-describedby={mobileDescribedBy} variant="secondary" icon={<UploadIcon aria-hidden />}>
                    {t("button")}
                </Button>
            </FileUpload.Trigger>
        </VStack>
    );
};
