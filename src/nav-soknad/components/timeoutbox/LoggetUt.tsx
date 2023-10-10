import * as React from "react";

import {Button, Heading, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

interface LoggetUtProps {
    onLoginAgainClick: () => void;
    open: boolean;
}

const LoggetUt = ({onLoginAgainClick, open}: LoggetUtProps) => {
    const {t} = useTranslation();

    return (
        <Modal open={open}>
            <Modal.Header closeButton={false}>
                <Heading size={"large"} level={"2"}>
                    {t("timeout.overskrift")}
                </Heading>
            </Modal.Header>
            <Modal.Body>{t("timeout.utlopt")}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onLoginAgainClick}>
                    {t("timeout.logginn")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoggetUt;
