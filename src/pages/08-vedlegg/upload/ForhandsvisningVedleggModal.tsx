import React, {useState} from "react";
import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

import {pdfjs} from "react-pdf";
import cx from "classnames";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {FilePreviewButtons} from "./FilePreviewButtons";
import {FilePreviewDisplay} from "./FilePreviewDisplay";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

interface ForhandsvisningModalProps {
    file: Blob;
    onAccept: () => void;
    onClose: () => void;
    onDelete: () => void;
}

export const ForhandsvisningVedleggModal = ({file, onAccept, onClose, onDelete}: ForhandsvisningModalProps) => {
    const [isFullscreen, setFullscreen] = useState<boolean>(false);

    const {t} = useTranslation();

    return (
        <Modal open={true} onClose={onClose} closeOnBackdropClick={false}>
            <Modal.Body
                className={cx(
                    {
                        "h-[80vh] max-w-[800px] w-full": !isFullscreen,
                        "fixed inset-0 bg-white": isFullscreen,
                    },
                    "flex flex-col max-h-full"
                )}
            >
                <div className={"border-gray-200 border-8 bg-gray-200 grow flex flex-col"}>
                    <FilePreviewButtons onDelete={onDelete} isFullscreen={isFullscreen} setFullscreen={setFullscreen} />
                    <FilePreviewDisplay file={file} />
                </div>
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
