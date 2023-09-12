import React from "react";
import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {ExpandIcon, TrashIcon} from "@navikt/aksel-icons";
import styled from "styled-components";
import {FullskjermModal} from "./FullskjermModal";

const FilePreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: auto;
    margin: 1rem 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    flex-wrap: wrap;
`;

const ButtonWrapper = styled.div`
    margin: 5px;
`;

const ModalContentWrapper = styled.div`
    width: 80%;
    height: 80vh;
    max-width: 800px;
    max-height: 600px;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    @media (max-width: 600px) {
        width: 95%;
        height: auto;
    }
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

const InformationText = styled.div`
    text-align: left;
    margin: 1rem 2rem;
`;

const ButtonRow = styled.div`
    text-align: left;
    margin: 2rem;
    display: flex;
    justify-content: left;
    gap: 1rem;
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
                <ModalContentWrapper>
                    {filePreviews.map((filePreview, index) => (
                        <FilePreviewContainer key={index}>
                            <ButtonContainer>
                                <ButtonWrapper>
                                    <Button variant="tertiary" onClick={() => handleDelete(index)}>
                                        <DeleteButtonContent>
                                            <TrashIcon />
                                            <span>Slett</span>
                                        </DeleteButtonContent>
                                    </Button>
                                </ButtonWrapper>
                                <ButtonWrapper>
                                    <Button variant="tertiary" onClick={() => handleFullScreen(filePreview)}>
                                        <FullScreenButtonContent>
                                            <ExpandIcon />
                                            <span>Fullskjerm</span>
                                        </FullScreenButtonContent>
                                    </Button>
                                </ButtonWrapper>
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
                </ModalContentWrapper>
                <InformationText>
                    <BodyShort>Sørg for at dokumentene er leselige og viser riktig informasjon</BodyShort>
                </InformationText>
                <ButtonRow>
                    <Button variant="primary" onClick={handleAccept}>
                        Last opp fil
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Avbryt
                    </Button>
                </ButtonRow>
            </Modal>
            {fullskjerm && <FullskjermModal filePreview={fullskjerm} handleClose={handleExitFullScreen} />}
        </>
    );
};
