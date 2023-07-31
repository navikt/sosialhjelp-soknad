import React from "react";
import {Button, Modal} from "@navikt/ds-react";
import {ShrinkIcon} from "@navikt/aksel-icons";
import styled from "styled-components";

const FULLSCREEN_MODAL_STYLE = {
    content: {
        position: "fixed" as "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column" as "column",
    },
};

const FullScreenButtonContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 10px;
`;

interface FullscreenModalProps {
    filePreview: {file: File; isPDF: boolean};
    handleClose: () => void;
}

export const FullskjermModal = ({filePreview, handleClose}: FullscreenModalProps) => {
    return (
        <Modal open={true} onClose={handleClose} style={FULLSCREEN_MODAL_STYLE}>
            <FullScreenButtonContainer>
                <Button variant="secondary" onClick={handleClose}>
                    <ShrinkIcon />
                </Button>
            </FullScreenButtonContainer>
            <Modal.Content style={{width: "100%", height: "100%"}}>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "auto",
                    }}
                >
                    {filePreview.isPDF ? (
                        <iframe src={URL.createObjectURL(filePreview.file)} style={{width: "100%", height: "100%"}} />
                    ) : (
                        <img
                            src={URL.createObjectURL(filePreview.file)}
                            alt={`File preview`}
                            style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}
                        />
                    )}
                </div>
            </Modal.Content>
        </Modal>
    );
};
