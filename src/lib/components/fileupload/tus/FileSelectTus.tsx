"use client";

import {useTranslation} from "react-i18next";
import {BodyShort, FileObject, FileUpload, Heading, InlineMessage, VStack, Button} from "@navikt/ds-react";
import {UploadIcon} from "@navikt/aksel-icons";
import {ReactNode, useState} from "react";
import {useMediaQuery} from "usehooks-ts";
import {getTusUploader} from "./tusUploader";
import {DocumentState} from "./types";
import {allowedFileTypes, maxFileCount, maxFileSize} from "./consts";
import FileUploadItemTus from "./FileUploadItemTus";
import {useSoknadId} from "../../../hooks/common/useSoknadId";

interface Props {
    contextId: string;
    label?: string;
    description?: string | ReactNode;
    docState: DocumentState;
}

const FileSelectTus = ({contextId, label, description, docState}: Props) => {
    const {t} = useTranslation("skjema");
    const soknadId = useSoknadId();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const hasPendingOrProcessing = docState.uploads?.some((u) => u.status === "PENDING" || u.status === "PROCESSING");

    const [folderDropError, setFolderDropError] = useState(false);

    const onSelect = (files: FileObject[]) => {
        // Filter out folders (files with no type and size 0)
        const folders = files.filter((f) => f.file.type === "" && f.file.size === 0);
        const valid = files.filter((f) => !(f.file.type === "" && f.file.size === 0));

        setFolderDropError(folders.length > 0);

        if (valid.length === 0) return;

        const uploads = valid.map((file: FileObject) =>
            getTusUploader({
                contextId,
                file,
                soknadId,
            })
        );
        uploads.forEach((upload) => upload.start());
    };

    const converted = docState.uploads?.some(
        (upload) => !!upload.finalFilename && upload.finalFilename !== upload.originalFilename
    );

    return (
        <FileUpload
            translations={{
                dropzone: {
                    buttonMultiple: t("tusUpload.selectFiles"),
                    or: t("tusUpload.or"),
                    dragAndDropMultiple: t("tusUpload.dragAndDrop"),
                },
                item: {
                    uploading: t("tusUpload.uploading"),
                    deleteButtonTitle: t("vedlegg.slett"),
                },
            }}
        >
            <VStack gap="6">
                {!isMobile ? (
                    <FileUpload.Dropzone
                        label={label ?? t("tusUpload.title")}
                        description={description}
                        onSelect={onSelect}
                        accept={allowedFileTypes}
                        maxSizeInBytes={maxFileSize}
                        fileLimit={{max: maxFileCount, current: docState.uploads?.length ?? 0}}
                        multiple
                    />
                ) : (
                    <VStack gap="4">
                        {label && (
                            <Heading level="4" size="small">
                                {label}
                            </Heading>
                        )}
                        {description && <BodyShort>{description}</BodyShort>}
                        <FileUpload.Trigger
                            accept={allowedFileTypes}
                            maxSizeInBytes={maxFileSize}
                            multiple
                            onSelect={onSelect}
                        >
                            <Button variant="secondary" icon={<UploadIcon aria-hidden />} className="self-start">
                                {t("tusUpload.selectFiles")}
                            </Button>
                        </FileUpload.Trigger>
                    </VStack>
                )}

                {folderDropError && (
                    <InlineMessage role="alert" status="error">
                        {t("tusUpload.folderNotAllowed")}
                    </InlineMessage>
                )}

                {!!docState.uploads?.length && (
                    <VStack gap="2">
                        <Heading size="xsmall" level="4">
                            {t("tusUpload.uploadedFiles", {count: docState.uploads.length})}
                        </Heading>
                        {converted && (
                            <InlineMessage status="info" role="alert">
                                {t("tusUpload.converted")}
                            </InlineMessage>
                        )}
                        {hasPendingOrProcessing && (
                            <InlineMessage status="info" role="alert">
                                {t("tusUpload.processing")}
                            </InlineMessage>
                        )}
                        {(docState.validations?.length ?? 0) > 0 && (
                            <>
                                {docState.validations?.map((error) => (
                                    <InlineMessage key={`${error}`} status="error" role="alert">
                                        {/* @ts-expect-error fuck you */}
                                        {t(`tusUpload.submissionError.${error}`)}
                                    </InlineMessage>
                                ))}
                            </>
                        )}
                        <VStack as="ul" gap="2">
                            {docState.uploads?.map((upload) => (
                                <FileUploadItemTus
                                    key={upload.id}
                                    url={upload.url ? `/sosialhjelp/soknad/api/upload-api${upload.url}` : undefined}
                                    uploadId={upload.id}
                                    convertedFilename={upload.finalFilename}
                                    originalFilename={upload.originalFilename}
                                    validations={upload.validations}
                                    status={upload.status}
                                    size={upload.size}
                                />
                            ))}
                        </VStack>
                    </VStack>
                )}
            </VStack>
        </FileUpload>
    );
};

export default FileSelectTus;
