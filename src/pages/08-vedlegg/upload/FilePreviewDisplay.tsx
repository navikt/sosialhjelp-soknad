import {useResponsiveSize} from "./useResponsiveSize";
import React, {useState} from "react";
import {Document, Page} from "react-pdf";
import {PdfEncryptionError, PdfLoadError} from "./UploadError";
import {PageFlipperButtons} from "./PageFlipperButtons";

/**
 * Display a PDF file. Grows vertically to fit the container.
 *
 * @param file - The PDF file to display.
 * @throws {PdfEncryptionError} - If the PDF is encrypted.
 * @throws {PdfLoadError} - If the PDF fails to load.
 */
export const FilePreviewDisplay = ({file}: {file: Blob}) => {
    const {containerRef, height} = useResponsiveSize();

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    return (
        <div ref={containerRef} className={"relative inset-0 flex flex-col p-2 grow shrink overflow-clip"}>
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
                <PageFlipperButtons numPages={numPages} pageNumber={pageNumber} setPageNumber={setPageNumber} />
                <Page
                    height={(containerRef?.current?.getBoundingClientRect().height || 0) * 0.8}
                    pageNumber={pageNumber}
                />
            </Document>
        </div>
    );
};
/*
 */
