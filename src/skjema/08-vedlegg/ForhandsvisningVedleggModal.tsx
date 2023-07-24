import React from "react";
import {Button, Modal} from "@navikt/ds-react";
import {ExpandIcon, ShrinkIcon} from "@navikt/aksel-icons";
import styled, {CSSProperties} from "styled-components";

type Position = "absolute" | "relative" | "fixed";

// Define your styles as constants
const DEFAULT_MODAL_STYLE = {
    content: {
        position: "fixed" as Position,
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "80%",
        maxHeight: "80%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column" as CSSProperties["flexDirection"],
        justifyContent: "space-between",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
};

const FULLSCREEN_MODAL_STYLE = {
    content: {
        position: "fixed" as Position,
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column" as CSSProperties["flexDirection"],
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
};

const FullScreenButtonContainer = styled.div`
    position: absolute;
    top: 20px;
    right: 10px;
`;

const ButtonRow = styled.div`
    text-align: center;
    margin: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

interface ForhandsvisningModalProps {
    filePreviews: Array<{file: File; isPDF: boolean}>;
    showModal: boolean;
    fullScreenMode: boolean;
    handleFullScreen: () => void;
    handleAccept: () => void;
    handleClose: () => void;
}

export const ForhandsvisningVedleggModal = ({
    filePreviews,
    showModal,
    fullScreenMode,
    handleFullScreen,
    handleAccept,
    handleClose,
}: ForhandsvisningModalProps) => {
    return (
        <Modal
            open={showModal}
            onClose={handleClose}
            style={fullScreenMode ? FULLSCREEN_MODAL_STYLE : DEFAULT_MODAL_STYLE}
        >
            <FullScreenButtonContainer>
                <Button variant="secondary" onClick={handleFullScreen}>
                    {fullScreenMode ? <ShrinkIcon /> : <ExpandIcon />}
                </Button>
            </FullScreenButtonContainer>
            <Modal.Content style={{width: "90vw", height: "80vh"}}>
                {filePreviews.map((filePreview, index) => (
                    <div key={index} style={{width: "100%", height: "100%", overflow: "auto"}}>
                        {filePreview.isPDF ? (
                            <iframe
                                src={URL.createObjectURL(filePreview.file)}
                                style={{width: "100%", height: "100%"}}
                            />
                        ) : (
                            <img
                                src={URL.createObjectURL(filePreview.file)}
                                alt={`File preview ${index}`}
                                style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}
                            />
                        )}
                    </div>
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
    );
};
