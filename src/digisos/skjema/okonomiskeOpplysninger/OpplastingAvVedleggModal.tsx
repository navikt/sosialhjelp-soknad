import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import {visLasteOppVedleggModal} from "../../redux/soknad/soknadActions";
import {BodyLong, Modal, Heading} from "@navikt/ds-react";
import styled from "styled-components";
import {mobile} from "../../../nav-soknad/styles/variables";
import {useTranslation} from "react-i18next";

const StyledModal = styled(Modal)`
    padding: 2rem 1rem;
    max-width: 600px;

    @media ${mobile} {
        padding: 2rem 0rem 0rem 0rem;
    }
`;

export const OpplastingAvVedleggModal = () => {
    const modalSynlig = useSelector((state: State) => state.soknad.visLasteOppVedleggModal);
    const {t} = useTranslation("skjema");

    const dispatch = useDispatch();

    return (
        <StyledModal
            open={modalSynlig}
            onClose={() => {
                dispatch(visLasteOppVedleggModal(false));
            }}
        >
            <Modal.Content>
                <Heading level="1" size="medium" spacing>
                    {t("opplysninger.informasjon.modal.overskrift")}
                </Heading>

                <Heading level="2" size="small" spacing>
                    {t("opplysninger.informasjon.modal.bolk1.tittel")}
                </Heading>
                <BodyLong spacing>{t("opplysninger.informasjon.modal.bolk1.avsnitt1")}</BodyLong>
                <BodyLong spacing>{t("opplysninger.informasjon.modal.bolk1.avsnitt2")}</BodyLong>
                <BodyLong spacing>{t("opplysninger.informasjon.modal.bolk1.avsnitt3")}</BodyLong>

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
                <ul>
                    <li>{t("opplysninger.informasjon.modal.bolk4.avsnitt2")}</li>
                    <li>{t("opplysninger.informasjon.modal.bolk4.avsnitt3")}</li>
                    <li>{t("opplysninger.informasjon.modal.bolk4.avsnitt4")}</li>
                </ul>
            </Modal.Content>
        </StyledModal>
    );
};
