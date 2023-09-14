import React from "react";
import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {ExpandIcon, TrashIcon} from "@navikt/aksel-icons";
import {FullskjermModal} from "./FullskjermModal";
import {isPdf} from "./LastOppFil";

interface ForhandsvisningModalProps {
    filePreviews: File[];
    showModal: boolean;
    onAccept: () => void;
    onClose: () => void;
    onDelete: (index: number) => void;
}

const FilePreview = ({file}: {file: File}) =>
    isPdf(file) ? (
        <iframe title={`File preview ${file.name}`} src={URL.createObjectURL(file)} className={"w-[70%] h-[70%]"} />
    ) : (
        <img
            src={URL.createObjectURL(file)}
            alt={`File preview ${file.name}`}
            className={"max-w-[70%] max-h-[70%] object-contain m-auto"}
        />
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

export const ForhandsvisningVedleggModal = ({
    filePreviews,
    showModal,
    onAccept,
    onClose,
    onDelete,
}: ForhandsvisningModalProps) => {
    const [fullskjerm, setFullskjerm] = React.useState<File | null>(null);

    return (
        <>
            <Modal open={showModal && !fullskjerm} onClose={onClose} className={"p-8 pt-2 space-y-4"}>
                <div className={"h-[80vh] max-w-[800px] max-h-[600px] relative max-sm:(w-[95%] h-auto)"}>
                    {filePreviews.map((filePreview, index) => (
                        <div className={"flex flex-col items-center w-full h-full overflow-auto my-4"} key={index}>
                            <FilePreviewButtons
                                onDelete={() => onDelete(index)}
                                onFullscreen={() => setFullskjerm(filePreview)}
                            />
                            <FilePreview file={filePreview} />
                        </div>
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
            <FullskjermModal filePreview={fullskjerm} onClose={() => setFullskjerm(null)} />
        </>
    );
};
