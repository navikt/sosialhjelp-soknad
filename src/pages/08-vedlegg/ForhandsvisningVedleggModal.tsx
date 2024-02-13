import React, {useState} from "react";
import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {TrashIcon} from "@navikt/aksel-icons";
import {useTranslation} from "react-i18next";

import {Document, Page, pdfjs} from "react-pdf";
import {FullscreenEnter, FullscreenExit} from "@navikt/ds-icons";
import cx from "classnames";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {useResponsiveSize} from "./useResponsiveSize";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

interface ForhandsvisningModalProps {
    file: Blob;
    onAccept: () => void;
    onClose: () => void;
    onDelete: () => void;
}

export class PdfEncryptionError extends Error {}
export class PdfLoadError extends Error {}

/**
 * Display a PDF file. Grows vertically to fit the container.
 *
 * @param file - The PDF file to display.
 * @param pageNumber - The page number to display.
 * @param setNumPages - Callback when the number of pages is known.
 * @throws {PdfEncryptionError} - If the PDF is encrypted.
 * @throws {PdfLoadError} - If the PDF fails to load.
 */
const FilePreviewDisplay = ({
    file,
    pageNumber,
    setNumPages,
}: {
    file: Blob;
    pageNumber: number;
    setNumPages: (numPages: number) => void;
}) => {
    const BORDER_PIXELS = 2;
    const {containerRef, height} = useResponsiveSize(BORDER_PIXELS * 2);

    return (
        <div ref={containerRef} className={"grow flex-col flex overflow-clip items-center "}>
            <Document
                file={file}
                onLoadSuccess={({numPages}) => setNumPages(numPages)}
                onLoadError={(error) => {
                    if (error.name === "PasswordException") throw new PdfEncryptionError();
                    throw new PdfLoadError("PDF load error", {cause: error});
                }}
                onSourceError={(error) => {
                    throw new PdfLoadError("PDF source error", {cause: error});
                }}
                onPassword={(_) => {
                    // Throwing an error here will cause onLoadError to receive a PasswordException.
                    throw new Error();
                }}
            >
                <Page
                    height={height}
                    className={`w-fit border-black border-[${BORDER_PIXELS}px]`}
                    pageNumber={pageNumber}
                />
            </Document>
        </div>
    );
};

const FilePreviewButtons = ({
    onDelete,
    isFullscreen,
    setFullscreen,
}: {
    onDelete: () => void;
    isFullscreen: boolean;
    setFullscreen: (isFullscreen: boolean) => void;
}) => {
    const {t} = useTranslation();
    return (
        <div className={"w-fit ml-auto"}>
            <Button variant="tertiary" onClick={onDelete}>
                <div className={"flex items-center gap-2"}>
                    <TrashIcon /> {t("vedlegg.forhandsvisning.slett")}
                </div>
            </Button>
            {isFullscreen ? (
                <Button variant="tertiary" onClick={() => setFullscreen(false)}>
                    <div className={"flex items-center gap-2"}>
                        <FullscreenExit />
                        {t("vedlegg.forhandsvisning.minimer")}
                    </div>
                </Button>
            ) : (
                <Button variant="tertiary" onClick={() => setFullscreen(true)}>
                    <div className={"flex items-center gap-2"}>
                        <FullscreenEnter />
                        {t("vedlegg.forhandsvisning.fullskjerm")}
                    </div>
                </Button>
            )}
        </div>
    );
};

export const ForhandsvisningVedleggModal = ({file, onAccept, onClose, onDelete}: ForhandsvisningModalProps) => {
    const [isFullscreen, setFullscreen] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>();
    const {t} = useTranslation();

    return (
        <Modal open={true} onClose={onClose} closeOnBackdropClick={false}>
            <Modal.Body
                className={cx(
                    {"p-8 pt-2 h-[80vh] max-w-[800px]": !isFullscreen, "fixed inset-0 bg-white": isFullscreen},
                    "flex flex-col space-y-4"
                )}
            >
                <FilePreviewButtons onDelete={onDelete} isFullscreen={isFullscreen} setFullscreen={setFullscreen} />
                <FilePreviewDisplay file={file} pageNumber={pageNumber} setNumPages={setNumPages} />
                <p>
                    Page {pageNumber} of {numPages}
                </p>
                <BodyShort>{t("vedlegg.forhandsvisning.info")}</BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onAccept}>
                    {t("vedlegg.forhandsvisning.opplast")}
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    {t("vedlegg.forhandsvisning.avbryt")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
