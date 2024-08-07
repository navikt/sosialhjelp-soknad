import React, {useState} from "react";
import {Document, Page} from "react-pdf";
import {PdfEncryptionError, PdfLoadError} from "./UploadError";
import {PageFlipperButtons} from "./PageFlipperButtons";

/**
 * Display a PDF file. Grows vertically to fit the container.
 *
 * @param file - The PDF file to display.
 * @param width - The width of the displayed PDF in pixels.
 * @throws {PdfEncryptionError} - If the PDF is encrypted.
 * @throws {PdfLoadError} - If the PDF fails to load.
 */
export const FilePreviewDisplay = ({file, width}: {file: Blob; width: number}) => {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    return (
        <div className={"relative inset-0 flex flex-col w-fit mx-auto grow shrink"}>
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
                <Page width={width} pageNumber={pageNumber} />
            </Document>
        </div>
    );
};
/*height={(containerRef?.current?.getBoundingClientRect().height || 0) * 0.95}
 */
