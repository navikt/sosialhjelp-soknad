import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import {visLasteOppVedleggModal} from "../../redux/soknad/soknadActions";
import {FormattedMessage} from "react-intl";
import {BodyLong, Modal, Title} from "@navikt/ds-react";
import styled from "styled-components";
import {mobile} from "../../../nav-soknad/styles/variables";

const StyledModal = styled(Modal)`
    padding: 3rem 2rem;
    max-width: 600px;

    @media ${mobile} {
        padding: 3rem 1rem 1rem 1rem;
    }
`;

export const OpplastingAvVedleggModal = () => {
    const modalSynlig = useSelector((state: State) => state.soknad.visLasteOppVedleggModal);

    const dispatch = useDispatch();

    return (
        <StyledModal
            open={modalSynlig}
            onClose={() => {
                dispatch(visLasteOppVedleggModal(false));
            }}
        >
            <Title level="1" size="m" spacing>
                <FormattedMessage id="opplysninger.informasjon.modal.overskrift" />
            </Title>

            <Title level="2" size="s" spacing>
                <FormattedMessage id="opplysninger.informasjon.modal.bolk1.tittel" />
            </Title>
            <BodyLong spacing>
                <FormattedMessage id="opplysninger.informasjon.modal.bolk1.avsnitt1" />
            </BodyLong>
            <BodyLong spacing>
                <FormattedMessage id="opplysninger.informasjon.modal.bolk1.avsnitt2" />
            </BodyLong>
            <BodyLong spacing>
                <FormattedMessage id="opplysninger.informasjon.modal.bolk1.avsnitt3" />
            </BodyLong>

            <Title level="2" size="s" spacing>
                <FormattedMessage id="opplysninger.informasjon.modal.bolk2.tittel" />
            </Title>
            <BodyLong spacing>
                <FormattedMessage id="opplysninger.informasjon.modal.bolk2.avsnitt1" />
            </BodyLong>

            <Title level="2" size="s" spacing>
                <FormattedMessage id="opplysninger.informasjon.modal.bolk3.tittel" />
            </Title>
            <BodyLong spacing>
                <FormattedMessage id="opplysninger.informasjon.modal.bolk3.avsnitt1" />
            </BodyLong>
            <Title level="2" size="s" spacing>
                <FormattedMessage id="opplysninger.informasjon.modal.bolk4.tittel" />
            </Title>
            <BodyLong spacing>
                <FormattedMessage id="opplysninger.informasjon.modal.bolk4.avsnitt1" />
            </BodyLong>
            <ul>
                <li>
                    <FormattedMessage id="opplysninger.informasjon.modal.bolk4.avsnitt2" />
                </li>
                <li>
                    <FormattedMessage id="opplysninger.informasjon.modal.bolk4.avsnitt3" />
                </li>
                <li>
                    <FormattedMessage id="opplysninger.informasjon.modal.bolk4.avsnitt4" />
                </li>
            </ul>
        </StyledModal>
    );
};
