import React, {forwardRef, Ref} from "react";
import {BodyLong, Modal, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

interface Props {
    onClose: () => void;
}

const OpplastingAvVedleggModal = ({onClose}: Props, ref: Ref<HTMLDialogElement>) => {
    const {t} = useTranslation("skjema");
    return (
        <Modal
            className={"max-w-[600px] py-8 px-4"}
            ref={ref}
            closeOnBackdropClick
            onClose={onClose}
            aria-label={t("opplysninger.informasjon.modal.overskrift")}
        >
            <Modal.Header>
                <Heading level="1" size="medium" spacing>
                    {t("opplysninger.informasjon.modal.overskrift")}
                </Heading>
            </Modal.Header>
            <Modal.Body>
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

export default forwardRef(OpplastingAvVedleggModal);
