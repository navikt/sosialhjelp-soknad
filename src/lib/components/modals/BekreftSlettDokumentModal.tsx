import * as React from "react";
import {Button, Heading, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {TrashIcon} from "@navikt/aksel-icons";

export const BekreftSlettDokumentModal = ({open, onSelect}: {open: boolean; onSelect: (slett: boolean) => void}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "vedlegg.sletteModal"});

    // FIXME: Hardkodet norsk
    return (
        <Modal open={open} onClose={() => onSelect(false)} aria-label={t("tittel")}>
            <Modal.Header>
                <Heading level="1" size="large" spacing className={"flex"}>
                    <TrashIcon /> {t("tittel")}
                </Heading>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onSelect(true)}>
                    <div className={"flex gap-2"}>{t("slett")}</div>
                </Button>
                <Button variant="secondary" onClick={() => onSelect(false)}>
                    {t("avbryt")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
