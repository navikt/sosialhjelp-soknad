import {UploadIcon} from "@navikt/aksel-icons";
import * as R from "remeda";
import {Button, FileObject, FileUpload, Heading, Label, VStack} from "@navikt/ds-react";
import {logger} from "@navikt/next-logger";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {Upload} from "tus-js-client";
import {useMediaQuery} from "usehooks-ts";
import digisosConfig from "../../../../lib/config.ts";
import FileUploadItem from "./FileUploadItem.tsx";
import InlineStatusMessage from "./InlineStatusMessage.tsx";
import useSlowProcessingWarning from "./useSlowProcessingWarning.ts";
import {useDokumentasjonTekster} from "../../../../lib/hooks/dokumentasjon/useDokumentasjonTekster.ts";
import {DokumentasjonDtoType} from "../../../../generated/new/model";
import useAlleredeLevert from "../../../../lib/hooks/dokumentasjon/useAlleredeLevert.ts";
import {AlreadyUploadedCheckbox} from "../AlreadyUploadedCheckbox.tsx";
import {useDocumentContext} from "./DocumentContext.tsx";
import {UploadStatus} from "./openEventChannel.ts";

const MAX_FILES = 10;
const MAX_SIZE_MB = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES =
    // Word Processing
    ".doc,.docx,.docm,.dot,.dotm,.dotx,.odt,.fodt,.ott,.rtf,.txt,.wps,.wpd,.pages,.abw,.zabw,.lwp,.mw,.mcw,.hwp,.sxw,.stw,.sgl,.vor,.602,.bib,.xml,.cwk,.psw,.uof," +
    // Spreadsheets
    ".xls,.xlsx,.xlsm,.xlsb,.xlt,.xltm,.xltx,.xlw,.ods,.fods,.ots,.csv,.numbers,.123,.wk1,.wks,.wb2,.dbf,.dif,.slk,.sxc,.stc,.uos,.pxl,.sdc," +
    // Presentations
    ".ppt,.pptx,.pptm,.pot,.potm,.potx,.pps,.odp,.fodp,.otp,.key,.sxi,.sti,.uop,.sdd,.sdp,.fopd," +
    // Graphics & Drawing
    ".odg,.fodg,.otg,.vsd,.vsdx,.vsdm,.vdx,.cdr,.svg,.svm,.wmf,.emf,.cgm,.dxf,.std,.sxd,.pub,.wpg,.sda,.odd,.met,.cmx,.eps," +
    // Images
    ".jpg,.jpeg,.png,.bmp,.gif,.tif,.tiff,.pbm,.pgm,.ppm,.xbm,.xpm,.pcx,.pcd,.pct,.psd,.tga,.ras,.pwp," +
    // Web & Other
    ".html,.htm,.xhtml,.epub,.pdf,.pdb,.ltx,.mml,.smf,.sxm,.sxg,.oth,.odm,.swf";

interface Props {
    className?: string;
    describedBy?: string;
    hideAlreadyUploaded?: boolean;
    kategori: DokumentasjonDtoType;
    soknadId: string;
    contextId: string;
}

const uploadFile = (file: File, contextId: string, soknadId: string, kategori: string): string => {
    const correlationId = crypto.randomUUID();
    const upload = new Upload(file, {
        endpoint: `${digisosConfig.uploadBaseURL}/tus/files`,
        retryDelays: [0, 1000, 3000, 5000],
        metadata: {
            filename: file.name,
            contextId,
            navEksternRefId: soknadId,
            kategori,
            correlationId,
        },
        uploadSize: file.size,
        onError: (error: unknown) => logger.error(`Upload failed: ${error}`),
    });
    upload.start();
    return correlationId;
};

export const isFolder = (f: FileObject) => f.file.size === 0 && f.file.type === "";

export const NewDokumenter = ({className, describedBy, hideAlreadyUploaded, kategori, soknadId, contextId}: Props) => {
    const t = useTranslations("NewDokumenter");
    const isMobile = useMediaQuery("(max-width: 768px)");
    const {uploads, validations, dispatch} = useDocumentContext();
    const [filesAdded, setFilesAdded] = useState(0);
    const {dokumentBeskrivelse} = useDokumentasjonTekster(kategori);
    const [folderDropError, setFolderDropError] = useState(false);
    const hasPendingOrProcessing = uploads.some((u) => u.status === "PENDING" || u.status === "PROCESSING");
    const {updateAlleredeLevert, alleredeLevert} = useAlleredeLevert(kategori);
    const showSlowProcessingWarning = useSlowProcessingWarning(hasPendingOrProcessing);

    const _onSelect = (files: FileObject[]) => {
        const [folders, valid] = R.partition(files, (f) => isFolder(f));

        setFolderDropError(folders.length > 0);

        if (valid.length === 0) return;
        setFilesAdded(valid.length);
        setTimeout(() => setFilesAdded(0), 500);

        dispatch({
            type: "ADD_UPLOADS",
            uploads: valid.map((f) => {
                const correlationId = uploadFile(f.file, contextId, soknadId, kategori);
                return {
                    id: correlationId,
                    correlationId,
                    originalFilename: f.file.name,
                    size: f.file.size,
                    status: "PENDING" as UploadStatus,
                };
            }),
        });
    };

    const converted = uploads.some(
        (upload) => !!upload.finalFilename && upload.finalFilename !== upload.originalFilename
    );

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
                        label={dokumentBeskrivelse}
                        accept={ALLOWED_FILE_TYPES}
                        disabled={alleredeLevert}
                        fileLimit={{max: MAX_FILES, current: uploads.length}}
                        maxSizeInBytes={MAX_SIZE_MB}
                        onSelect={_onSelect}
                    />
                )}
                {isMobile && (
                    <>
                        <VStack gap="space-8" align="start">
                            <Label>{dokumentBeskrivelse}</Label>
                            <FileUpload.Trigger
                                accept={ALLOWED_FILE_TYPES}
                                maxSizeInBytes={MAX_SIZE_MB}
                                onSelect={_onSelect}
                            >
                                <Button
                                    aria-describedby={describedBy}
                                    variant="secondary"
                                    icon={<UploadIcon aria-hidden />}
                                >
                                    {t("button")}
                                </Button>
                            </FileUpload.Trigger>
                        </VStack>
                    </>
                )}
                {folderDropError && (
                    <InlineStatusMessage variant="error" role="alert">
                        {t("mappeIkkeTillatt")}
                    </InlineStatusMessage>
                )}

                {uploads.length > 0 && (
                    <VStack gap="space-8">
                        <Heading size="xsmall" level="3">
                            {t("valgteFiler", {antall_filer: uploads.length})}
                        </Heading>
                        {converted && (
                            <InlineStatusMessage variant="info" role="status">
                                {t("konvertert")}
                            </InlineStatusMessage>
                        )}
                        {showSlowProcessingWarning && (
                            <InlineStatusMessage variant="info" role="status">
                                {t("processingWarning")}
                            </InlineStatusMessage>
                        )}
                        {validations.length > 0 && (
                            <>
                                {validations.map((error) => (
                                    <InlineStatusMessage key={error} variant="error" role="alert">
                                        {t(`submissionError.${error}`)}
                                    </InlineStatusMessage>
                                ))}
                            </>
                        )}
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
                                    showCancelButton={
                                        showSlowProcessingWarning &&
                                        (upload.status === "PENDING" || upload.status === "PROCESSING")
                                    }
                                    onTerminate={
                                        upload.correlationId
                                            ? () =>
                                                  dispatch({
                                                      type: "REMOVE_UPLOAD",
                                                      correlationId: upload.correlationId!,
                                                  })
                                            : undefined
                                    }
                                />
                            ))}
                        </VStack>
                    </VStack>
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
