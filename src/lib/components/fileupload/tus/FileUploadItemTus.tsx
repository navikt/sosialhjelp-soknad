"use client";

import {useTranslation} from "react-i18next";
import {useMutation} from "@tanstack/react-query";
import {FileUpload} from "@navikt/ds-react/FileUpload";
import {Upload} from "tus-js-client";
import {Button} from "@navikt/ds-react";
import {TrashIcon} from "@navikt/aksel-icons";
import {UploadStatus, ValidationCode} from "./types";

const UPLOAD_API_BASE = "/sosialhjelp/soknad/api/upload-api";

interface Props {
    originalFilename: string;
    convertedFilename?: string;
    uploadId: string;
    validations?: ValidationCode[];
    url?: string;
    status: UploadStatus;
    size?: number;
}

const FileUploadItemTus = ({convertedFilename, originalFilename, uploadId, validations, url, status, size}: Props) => {
    const {t} = useTranslation("skjema");
    const {mutate, isPending} = useMutation({
        mutationFn: () => Upload.terminate(`${UPLOAD_API_BASE}/tus/files/${uploadId}`, {}),
        retry: false,
    });

    const isUploading = !url && !validations && status !== "FAILED" && status !== "COMPLETE";
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
                    icon={<TrashIcon title={t("vedlegg.slett")} />}
                    onClick={() => mutate()}
                    loading={isPending}
                />
            }
            onFileClick={url ? () => window.open(url, "_blank", "noopener,noreferrer") : undefined}
            error={
                validations?.length
                    ? t(`tusUpload.validation.${validations[0]}`)
                    : status === "FAILED"
                      ? t("tusUpload.uploadFailed")
                      : undefined
            }
        />
    );
};

export default FileUploadItemTus;
