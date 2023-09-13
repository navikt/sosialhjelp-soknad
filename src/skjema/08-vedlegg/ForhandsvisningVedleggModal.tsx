import React from "react";
import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {ExpandIcon, TrashIcon} from "@navikt/aksel-icons";
import {FullskjermModal} from "./FullskjermModal";

const filePreviewContainerStyle = "flex flex-col items-center justify-center w-full h-full overflow-auto my-4";

const buttonContainerStyle = "flex justify-end items-center w-full mb-2 flex-wrap";

const buttonWrapperStyle = "m-1";

const modalContentWrapperStyle =
    "w-[80%] h-[80vh] max-w-[800px] max-h-[600px] " +
    "pt-[50px] flex flex-col justify-center items-center relative" +
    "max-sm:(w-[95%] h-auto)";

const fullscreenButtonStyle = "flex items-center gap-2";

const deleteButtonStyle = "flex items-center gap-2";

const informationTextStyle = "text-left mx-8 my-4";

const buttonRowStyle = "text-left m-8 flex justify-left gap-4";

interface ForhandsvisningModalProps {
    filePreviews: Array<{file: File; isPDF: boolean}>;
    showModal: boolean;
    handleAccept: () => void;
    handleClose: () => void;
    handleDelete: (index: number) => void;
}

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
            <Modal open={showModal && !fullskjerm} onClose={handleClose}>
                <div className={modalContentWrapperStyle}>
                    {filePreviews.map((filePreview, index) => (
                        <div className={filePreviewContainerStyle} key={index}>
                            <div className={buttonContainerStyle}>
                                <div className={buttonWrapperStyle}>
                                    <Button variant="tertiary" onClick={() => handleDelete(index)}>
                                        <div className={deleteButtonStyle}>
                                            <TrashIcon />
                                            <span>Slett</span>
                                        </div>
                                    </Button>
                                </div>
                                <div className={buttonWrapperStyle}>
                                    <Button variant="tertiary" onClick={() => handleFullScreen(filePreview)}>
                                        <div className={fullscreenButtonStyle}>
                                            <ExpandIcon />
                                            <span>Fullskjerm</span>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                            {filePreview.isPDF ? (
                                <iframe
                                    title={`File preview ${index}`}
                                    src={URL.createObjectURL(filePreview.file)}
                                    style={{width: "70%", height: "70%"}}
                                />
                            ) : (
                                <img
                                    src={URL.createObjectURL(filePreview.file)}
                                    alt={`File preview ${index}`}
                                    style={{maxWidth: "70%", maxHeight: "70%", objectFit: "contain"}}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className={informationTextStyle}>
                    <BodyShort>Sørg for at dokumentene er leselige og viser riktig informasjon</BodyShort>
                </div>
                <div className={buttonRowStyle}>
                    <Button variant="primary" onClick={handleAccept}>
                        Last opp fil
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Avbryt
                    </Button>
                </div>
            </Modal>
            {fullskjerm && <FullskjermModal filePreview={fullskjerm} handleClose={handleExitFullScreen} />}
        </>
    );
};
