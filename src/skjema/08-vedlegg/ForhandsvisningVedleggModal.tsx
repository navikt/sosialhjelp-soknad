import React from "react";
import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {ExpandIcon, TrashIcon} from "@navikt/aksel-icons";
import {FullskjermModal} from "./FullskjermModal";

const filePreviewContainerStyle = "flex flex-col items-center justify-center w-full h-full overflow-auto my-4";

const modalContentWrapperStyle = "h-[80vh] max-w-[800px] max-h-[600px] relative max-sm:(w-[95%] h-auto)";

type PreviewFile = {file: File; isPDF: boolean};

interface ForhandsvisningModalProps {
    filePreviews: PreviewFile[];
    showModal: boolean;
    handleAccept: () => void;
    handleClose: () => void;
    handleDelete: (index: number) => void;
}

const FilePreview = ({file: {isPDF, file}}: {file: PreviewFile}) =>
    isPDF ? (
        <iframe title={`File preview ${file.name}`} src={URL.createObjectURL(file)} className={"w-[70%] h-[70%]"} />
    ) : (
        <img
            src={URL.createObjectURL(file)}
            alt={`File preview ${file.name}`}
            className={"max-w-[70%] max-h-[70%] object-contain"}
        />
    );

const FilePreviewButtons = ({onDelete, onFullscreen}: {onDelete: () => void; onFullscreen: () => void}) => (
    <div className={"ml-auto"}>
        <Button variant="tertiary" onClick={onDelete}>
            <div className={"flex items-center gap-2"}>
                <TrashIcon /> Slett
            </div>
        </Button>
        <Button variant="tertiary" onClick={onFullscreen}>
            <span className={"flex items-center gap-2"}>
                <ExpandIcon /> Fullskjerm
            </span>
        </Button>
    </div>
);

export const ForhandsvisningVedleggModal = ({
    filePreviews,
    showModal,
    handleAccept,
    handleClose,
    handleDelete,
}: ForhandsvisningModalProps) => {
    const [fullskjerm, setFullskjerm] = React.useState<{file: File; isPDF: boolean} | null>(null);

    const handleFullScreen = (filePreview: {file: File; isPDF: boolean}) => {
        setFullskjerm(filePreview);
    };

    const handleExitFullScreen = () => {
        setFullskjerm(null);
    };

    return (
        <>
            <Modal open={showModal && !fullskjerm} onClose={handleClose} className={"p-8 space-y-4"}>
                <div className={modalContentWrapperStyle}>
                    {filePreviews.map((filePreview, index) => (
                        <div className={filePreviewContainerStyle} key={index}>
                            <FilePreviewButtons
                                onDelete={() => handleDelete(index)}
                                onFullscreen={() => handleFullScreen(filePreview)}
                            />
                            <FilePreview file={filePreview} />
                        </div>
                    ))}
                </div>
                <BodyShort>Sørg for at dokumentene er leselige og viser riktig informasjon</BodyShort>
                <Button variant="primary" className="!mr-4" onClick={handleAccept}>
                    Last opp fil
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Avbryt
                </Button>
            </Modal>
            {fullskjerm && <FullskjermModal filePreview={fullskjerm} handleClose={handleExitFullScreen} />}
        </>
    );
};
