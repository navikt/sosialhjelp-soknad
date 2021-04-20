import React from "react";
import NavFrontendModal from "nav-frontend-modal";
import {Element, Normaltekst, Systemtittel} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import styled from "styled-components";

const ModalContent = styled.div`
    padding: 2rem;
`;

const StyledSystemtittel = styled(Systemtittel)`
    margin-bottom: 1rem;
`;

const Paragraph = styled(Normaltekst)`
    margin-bottom: 1rem;
`;

const DineSoknaderKnapp = styled(Knapp)`
    transform: translateY(-2px);
    @media screen and (min-width: 680px) {
        margin-left: 2rem;
    }
    @media screen and (max-width: 679px) {
        margin-top: 1rem;
    }
`;

const ButtonRow = styled.div`
    display: flex;
    @media screen and (min-width: 680px) {
        flex-direction: row;
    }
    @media screen and (max-width: 679px) {
        flex-direction: column;
    }
`;

export const SoknadUnderBehandlingModal = (props: {
    isOpen: boolean;
    onRequestClose: (value: boolean) => void;
    onPrimaryButtonClick: () => void;
}) => {
    return (
        <NavFrontendModal contentLabel="" isOpen={props.isOpen} onRequestClose={() => props.onRequestClose(false)}>
            <ModalContent>
                <StyledSystemtittel>Du har allerede søknader under behandling</StyledSystemtittel>
                <Paragraph>
                    Ønsker du å starte en ny søknad, eller legge ved ny informasjon på eksisterende søknad?
                </Paragraph>
                <Paragraph>
                    Hvis du ikke skal sende en helt ny søknad, får du raskere svar ved å ettersende eller sende en
                    beskjed til veilederen din på telefon
                </Paragraph>
                <Element>Ettersende vedlegg</Element>
                <Paragraph>
                    Du kan ettersende vedlegg ved å velge en søknad under{" "}
                    <Lenke href="https://www.nav.no/sosialhjelp/innsyn">dine søknader</Lenke> og laste opp dokumentasjon
                </Paragraph>
                <Element>Send beskjed til veileder på telefon</Element>
                <Paragraph>Du kan gi en beskjed til veilederen din på tlf 5555 ...</Paragraph>

                <ButtonRow>
                    <Hovedknapp onClick={() => props.onPrimaryButtonClick()}>Ny søknad</Hovedknapp>
                    <DineSoknaderKnapp onClick={() => window.location.assign("https://www.nav.no/sosialhjelp/innsyn")}>
                        Dine søknader
                    </DineSoknaderKnapp>
                </ButtonRow>
            </ModalContent>
        </NavFrontendModal>
    );
};
