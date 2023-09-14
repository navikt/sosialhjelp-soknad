import React from "react";
import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {ExpandIcon, TrashIcon} from "@navikt/aksel-icons";
import {FilePreviewFullscreen} from "./FilePreviewFullscreen";
import {isPdf} from "./LastOppFil";
Modal.setAppElement("#root");

interface ForhandsvisningModalProps {
    filePreviews: File[];
    showModal: boolean;
    onAccept: () => void;
    onClose: () => void;
    onDelete: (index: number) => void;
}

const FilePreviewDisplay = ({file}: {file: File}) =>
    isPdf(file) ? (
        <iframe title={`File preview ${file.name}`} src={URL.createObjectURL(file)} className={"h-[100%] w-full"} />
    ) : (
        <img alt={`File preview ${file.name}`} src={URL.createObjectURL(file)} className={"h-fit mx-auto"} />
    );

// 24/23 px-tallene er satt slik for å matche høyden til X-knappen i Modal-komponenten
const FilePreviewButtons = ({onDelete, onFullscreen}: {onDelete: () => void; onFullscreen: () => void}) => (
    <div className={"w-fit ml-auto"}>
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

const FilePreview = ({file, onDelete}: {file: File; onDelete: () => void}) => {
    const [fullscreen, setFullscreen] = React.useState<boolean>(false);

    return (
        <div className={"flex flex-col h-full grow my-4"}>
            <FilePreviewButtons onDelete={onDelete} onFullscreen={() => setFullscreen(true)} />
            <FilePreviewDisplay file={file} />
            <FilePreviewFullscreen show={fullscreen} file={file} onClose={() => setFullscreen(false)} />
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
    <Modal
        open={showModal}
        onClose={onClose}
        className={"p-8 pt-2 h-[80vh] max-w-[800px] max-h-[600px] max-sm:(w-[95%] h-auto)"}
    >
        <Modal.Content className={"flex flex-col space-y-4 h-full"}>
            <div className={"grow w-full mx-auto"}>
                {filePreviews.map((filePreview, index) => (
                    <FilePreview file={filePreview} onDelete={() => onDelete(index)} key={index} />
                ))}
            </div>
            <BodyShort>Sørg for at dokumentene er leselige og viser riktig informasjon</BodyShort>
            <div className={"flex gap-4"}>
                <Button variant="primary" onClick={onAccept}>
                    Last opp fil
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </div>
        </Modal.Content>
    </Modal>
);
