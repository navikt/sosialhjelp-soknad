import React from "react";
import {BodyLong, Modal, Heading} from "@navikt/ds-react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const StyledModal = styled(Modal)`
    padding: 2rem 1rem;
    max-width: 600px;
`;

export const OpplastingAvVedleggModal = ({open, onClose}: {open: boolean; onClose: () => void}) => {
    const {t} = useTranslation("skjema");

    return (
        <StyledModal open={open} onClose={onClose}>
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
        </StyledModal>
    );
};
