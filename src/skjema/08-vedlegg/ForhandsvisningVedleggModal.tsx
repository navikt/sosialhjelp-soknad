import React from "react";
import {Button, Modal} from "@navikt/ds-react";
import {ExpandIcon, TrashIcon} from "@navikt/aksel-icons";
import styled from "styled-components";
import {FullskjermModal} from "./FullskjermModal";

const ButtonContainer = styled.div`
    position: absolute;
    right: 20px;
    top: 10px;
    z-index: 1;
`;

const FullScreenButtonContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const DeleteButtonContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ButtonRow = styled.div`
    text-align: center;
    margin: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

const FilePreviewContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: auto;
`;

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
    const [fullScreenFile, setFullScreenFile] = React.useState<{file: File; isPDF: boolean} | null>(null);

    const handleFullScreen = (filePreview: {file: File; isPDF: boolean}) => {
        setFullScreenFile(filePreview);
    };

    const handleExitFullScreen = () => {
        setFullScreenFile(null);
    };

    return (
        <React.Fragment>
            <Modal open={showModal && !fullScreenFile} onClose={handleClose}>
                <Modal.Content
                    style={{
                        width: "40vw",
                        height: "80vh",
                        paddingTop: "50px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {filePreviews.map((filePreview, index) => (
                        <FilePreviewContainer key={index}>
                            <ButtonContainer>
                                <Button variant="tertiary" onClick={() => handleDelete(index)}>
                                    <DeleteButtonContent>
                                        <TrashIcon />
                                        <span>Slett</span>
                                    </DeleteButtonContent>
                                </Button>
                                <Button variant="tertiary" onClick={() => handleFullScreen(filePreview)}>
                                    <FullScreenButtonContent>
                                        <ExpandIcon />
                                        <span>Fullskjerm</span>
                                    </FullScreenButtonContent>
                                </Button>
                            </ButtonContainer>
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
                        </FilePreviewContainer>
                    ))}
                </Modal.Content>
                <ButtonRow>
                    <Button variant="primary" onClick={handleAccept}>
                        Last opp fil
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Avbryt
                    </Button>
                </ButtonRow>
            </Modal>

            {fullScreenFile && <FullskjermModal filePreview={fullScreenFile} handleClose={handleExitFullScreen} />}
        </React.Fragment>
    );
};
