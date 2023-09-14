import React from "react";
import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {ExpandIcon, TrashIcon} from "@navikt/aksel-icons";
import {FilePreviewFullscreen} from "./FilePreviewFullscreen";
import {isPdf} from "./LastOppFil";

interface ForhandsvisningModalProps {
    filePreviews: File[];
    showModal: boolean;
    onAccept: () => void;
    onClose: () => void;
    onDelete: (index: number) => void;
}

const FilePreviewDisplay = ({file}: {file: File}) =>
    isPdf(file) ? (
        <iframe title={`File preview ${file.name}`} src={URL.createObjectURL(file)} className={"h-full w-full"} />
    ) : (
        <img alt={`File preview ${file.name}`} src={URL.createObjectURL(file)} className={"m-auto object-contain"} />
    );

// 24/23 px-tallene er satt slik for å matche høyden til X-knappen i Modal-komponenten
const FilePreviewButtons = ({onDelete, onFullscreen}: {onDelete: () => void; onFullscreen: () => void}) => (
    <div className={"ml-auto text-[24px] leading-[23px] mt-0.5 pr-4"}>
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

const FilePreview = ({filePreview, onDelete}: {filePreview: File; onDelete: () => void}) => {
    const [fullskjerm, setFullskjerm] = React.useState<boolean>(false);

    return (
        <div className={"flex flex-col items-center w-full h-full overflow-auto my-4"}>
            <FilePreviewButtons onDelete={onDelete} onFullscreen={() => setFullskjerm(true)} />
            <FilePreviewDisplay file={filePreview} />
            <FilePreviewFullscreen show={fullskjerm} file={filePreview} onClose={() => setFullskjerm(false)} />
        </div>
    );
};

export const ForhandsvisningVedleggModal = ({
    filePreviews,
    showModal,
    onAccept,
    onClose,
    onDelete,
}: ForhandsvisningModalProps) => (
    <Modal open={showModal} onClose={onClose} className={"p-8 pt-2 space-y-4"}>
        <div className={"h-[80vh] max-w-[800px] max-h-[600px] relative max-sm:(w-[95%] h-auto)"}>
            {filePreviews.map((filePreview, index) => (
                <FilePreview filePreview={filePreview} onDelete={() => onDelete(index)} key={index} />
            ))}
        </div>
        <BodyShort>Sørg for at dokumentene er leselige og viser riktig informasjon</BodyShort>
        <Button variant="primary" className="!mr-4" onClick={onAccept}>
            Last opp fil
        </Button>
        <Button variant="secondary" onClick={onClose}>
            Avbryt
        </Button>
    </Modal>
);
