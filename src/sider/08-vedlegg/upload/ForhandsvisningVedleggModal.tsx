import React, {useState} from "react";
import {BodyShort, Button, Heading, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

import {pdfjs} from "react-pdf";
import cx from "classnames";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {FilePreviewButtons} from "./FilePreviewButtons";
import {FilePreviewDisplay} from "./FilePreviewDisplay";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

interface ForhandsvisningModalProps {
    file: File;
    header: string | undefined;
    onAccept: () => void;
    onClose: () => void;
}

export const ForhandsvisningVedleggModal = ({header, file, onAccept, onClose}: ForhandsvisningModalProps) => {
    const [isFullscreen, setFullscreen] = useState<boolean>(false);
    const {t} = useTranslation();

    return (
        <Modal
            open={true}
            onClose={onClose}
            closeOnBackdropClick={false}
            className={"bg-white"}
            aria-label={header ?? ""}
        >
            <Modal.Header>
                <Heading level={"2"} size={"medium"}>
                    {header}
                </Heading>
            </Modal.Header>
            <Modal.Body className={cx({"fixed inset-0 w-full p-0!": isFullscreen}, "flex flex-col items-center")}>
                <div
                    className={cx(
                        {
                            "w-full min-h-full gap-4 pb-4": isFullscreen,
                            "p-2 bg-surface-neutral-subtle rounded-md w-fit": !isFullscreen,
                        },
                        "grow flex flex-col"
                    )}
                >
                    {file.type === "application/pdf" ? (
                        <>
                            <FilePreviewButtons isFullscreen={isFullscreen} setFullscreen={setFullscreen} />
                            <FilePreviewDisplay file={file} width={isFullscreen ? window.innerWidth - 200 : 600} />
                        </>
                    ) : (
                        <>
                            <FilePreviewButtons isFullscreen={isFullscreen} setFullscreen={setFullscreen} />
                            <img className={"w-full"} src={URL.createObjectURL(file)} alt={"preview"} />
                        </>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer className={"block! space-y-4"}>
                <BodyShort>{t("vedlegg.forhandsvisning.info")}</BodyShort>
                <div className={"w-fit space-x-4"}>
                    <Button variant="primary" onClick={onAccept}>
                        {t("vedlegg.forhandsvisning.opplast")}
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        {t("vedlegg.forhandsvisning.avbryt")}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
