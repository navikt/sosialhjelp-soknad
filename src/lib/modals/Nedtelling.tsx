import * as React from "react";

import {Button, Heading, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

const Nedtelling = ({
    onContinueClick,
    utloggingsUrl,
    open,
}: {
    onContinueClick: () => void;
    utloggingsUrl: string;
    open: boolean;
}) => {
    const {t} = useTranslation();

    return (
        <Modal open={open} onClose={() => {}} aria-label={t("timeout.overskrift")}>
            <Modal.Header closeButton={false}>
                <Heading size={"large"} level={"2"}>
                    {t("timeout.overskrift")}
                </Heading>
            </Modal.Header>
            <Modal.Body>{t("timeout.nedtelling")}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onContinueClick}>
                    {t("timeout.fortsett")}
                </Button>
                <Button variant="tertiary" as="a" href={utloggingsUrl} className="timeoutbox__loggutknapp">
                    {t("timeout.loggut")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Nedtelling;
