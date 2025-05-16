import * as React from "react";
import {Button, Heading, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

export const BekreftSlettDokumentModal = ({open, onSelect}: {open: boolean; onSelect: (slett: boolean) => void}) => {
    const {t} = useTranslation("skjema");

    // FIXME: Hardkodet norsk
    return (
        <Modal open={open} onClose={() => onSelect(false)} aria-label={t("vedlegg.sletteModal.tittel")}>
            <Modal.Header>
                <Heading level="1" size="large" spacing className={"flex"}>
                    {t("vedlegg.sletteModal.tittel")}
                </Heading>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onSelect(true)}>
                    <div className={"flex gap-2"}>{t("vedlegg.sletteModal.slett")}</div>
                </Button>
                <Button variant="secondary" onClick={() => onSelect(false)}>
                    {t("vedlegg.sletteModal.avbryt")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
