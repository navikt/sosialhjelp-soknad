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
import useDocumentState from "./useDocumentState.ts";
import useSlowProcessingWarning from "./useSlowProcessingWarning.ts";

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
    describedBy: string;
    contextId: string;
    soknadId: string;
    kategori: string;
}

const uploadFile = (file: File, contextId: string, soknadId: string, kategori: string) => {
    const upload = new Upload(file, {
        endpoint: `${digisosConfig.uploadBaseURL}/tus/files`,
        retryDelays: [0, 1000, 3000, 5000],
        metadata: {
            filename: file.name,
            contextId,
            navEksternRefId: soknadId,
            kategori,
        },
        uploadSize: file.size,
        onError: (error: unknown) => logger.error(`Upload failed: ${error}`),
    });
    upload.start();
};

export const isFolder = (f: FileObject) => f.file.size === 0 && f.file.type === "";

export const NewDokumenter = ({describedBy, contextId, soknadId, kategori}: Props) => {
    const t = useTranslations("NewDokumenter");
    const isMobile = useMediaQuery("(max-width: 768px)");
    const {documentState} = useDocumentState(contextId);
    const [filesAdded, setFilesAdded] = useState(0);
    const [folderDropError, setFolderDropError] = useState(false);
    const hasPendingOrProcessing = documentState?.uploads?.some(
        (u) => u.status === "PENDING" || u.status === "PROCESSING"
    );
    const showSlowProcessingWarning = useSlowProcessingWarning(hasPendingOrProcessing);
    const _onSelect = (files: FileObject[]) => {
        const [folders, valid] = R.partition(files, (f) => isFolder(f));

        setFolderDropError(folders.length > 0);

        if (valid.length === 0) return;
        setFilesAdded(valid.length);
        setTimeout(() => setFilesAdded(0), 500);
        valid.forEach((file: FileObject) => uploadFile(file.file, contextId, soknadId, kategori));
    };
    const converted = documentState?.uploads?.some(
        (upload) => !!upload.finalFilename && upload.finalFilename !== upload.originalFilename
    );

    return (
        <FileUpload
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
                        label={t("label")}
                        accept={ALLOWED_FILE_TYPES}
                        fileLimit={{max: MAX_FILES, current: documentState?.uploads?.length ?? 0}}
                        maxSizeInBytes={MAX_SIZE_MB}
                        onSelect={_onSelect}
                    />
                )}
                {isMobile && (
                    <>
                        <VStack gap="space-16" align="start">
                            <Label>{t("label")}</Label>
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

                {(documentState?.uploads?.length ?? 0) > 0 && (
                    <VStack gap="space-8">
                        <Heading size="xsmall" level="3">
                            {t("valgteFiler", {antall_filer: documentState?.uploads?.length ?? 0})}
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
                        {(documentState?.validations?.length ?? 0) > 0 && (
                            <>
                                {documentState?.validations?.map((error) => (
                                    <InlineStatusMessage key={error} variant="error" role="alert">
                                        {t(`submissionError.${error}`)}
                                    </InlineStatusMessage>
                                ))}
                            </>
                        )}
                        <VStack as="ul" gap="space-8">
                            {documentState?.uploads?.map((upload) => (
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
                                />
                            ))}
                        </VStack>
                    </VStack>
                )}
            </VStack>
        </FileUpload>
    );
};
