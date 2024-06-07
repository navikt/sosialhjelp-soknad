import React from "react";
import {BodyLong, Modal, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

export const OpplastingAvVedleggModal = ({open, onClose}: {open: boolean; onClose: () => void}) => {
    const {t} = useTranslation("skjema");

    return (
        <Modal
            className={"max-w-[600px] py-8 px-4"}
            open={open}
            onClose={onClose}
            aria-label={t("opplysninger.informasjon.modal.overskrift")}
        >
            <Modal.Body>
                <Heading level="1" size="medium" spacing>
                    {t("opplysninger.informasjon.modal.overskrift")}
                </Heading>

                <Heading level="2" size="small" spacing>
                    {t("opplysninger.informasjon.modal.bolk1.tittel")}
                </Heading>
                <BodyLong spacing>{t("opplysninger.informasjon.modal.bolk1.avsnitt1")}</BodyLong>
       
                <Heading level="2" size="small" spacing>
                    {t("opplysninger.informasjon.modal.bolk2.tittel")}
                </Heading>
                <BodyLong spacing>{t("opplysninger.informasjon.modal.bolk2.avsnitt1")}</BodyLong>

                <Heading level="2" size="small" spacing>
                    {t("opplysninger.informasjon.modal.bolk3.tittel")}
                </Heading>
                <BodyLong spacing>{t("opplysninger.informasjon.modal.bolk3.avsnitt1")}</BodyLong>
                <Heading level="2" size="small" spacing>
                    {t("opplysninger.informasjon.modal.bolk4.tittel")}
                </Heading>
                <BodyLong spacing>{t("opplysninger.informasjon.modal.bolk4.avsnitt1")}</BodyLong>
            </Modal.Body>
        </Modal>
    );
};
