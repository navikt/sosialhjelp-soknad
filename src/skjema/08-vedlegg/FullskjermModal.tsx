import {Button, Modal} from "@navikt/ds-react";
import {ShrinkIcon} from "@navikt/aksel-icons";
import {PreviewFile} from "./ForhandsvisningVedleggModal.js";

interface FullscreenModalProps {
    filePreview: PreviewFile | null;
    onClose: () => void;
}

const FullskjermPreview = ({filePreview}: {filePreview: PreviewFile | null}) => {
    if (!filePreview) return null;

    return (
        <div className={"w-full h-full flex content-center items-center overflow-auto p-4 lg:p-12 xl:p-48"}>
            {filePreview?.isPDF ? (
                <iframe
                    src={URL.createObjectURL(filePreview.file)}
                    title="Forhåndsvisning av fil"
                    className={"w-full h-full"}
                />
            ) : (
                <img
                    src={URL.createObjectURL(filePreview.file)}
                    alt={`File preview`}
                    className={"max-w-full max-h-full m-auto object-contain"}
                />
            )}
        </div>
    );
};

export const FullskjermModal = ({filePreview, onClose}: FullscreenModalProps) => (
    <Modal open={!!filePreview} onClose={onClose}>
        <Modal.Content className={"fixed inset-0"}>
            <div className={"w-fit ml-auto"}>
                <Button variant="tertiary" onClick={onClose}>
                    <span className={"flex items-center gap-2 text-white hover:text-gray-900"}>
                        <ShrinkIcon /> Fullskjerm
                    </span>
                </Button>
            </div>
            <FullskjermPreview filePreview={filePreview} />
        </Modal.Content>
    </Modal>
);
