import React from "react";
import NavFrontendModal from "nav-frontend-modal";
import {Element, Normaltekst, Systemtittel} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import {Hovedknapp} from "nav-frontend-knapper";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {State} from "../redux/reducers";
import {logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";

const ModalContent = styled.div`
    padding: 2rem;
`;

const StyledSystemtittel = styled(Systemtittel)`
    margin-bottom: 1rem !important;
`;

const Paragraph = styled(Normaltekst)`
    margin-bottom: 1rem !important;
`;

const DineSoknaderKnapp = styled.a`
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
    const antallNyligInnsendteSoknader: number =
        useSelector((state: State) => state.soknad.harNyligInnsendteSoknader?.antallNyligInnsendte) ?? 0;

    const innsynUrl = "https://www.nav.no/sosialhjelp/innsyn";

    const onInnsynClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        logAmplitudeEvent("gå til dine saker", {antallNyligInnsendteSoknader});
        window.location.assign(innsynUrl);
    };

    return (
        <NavFrontendModal
            contentLabel="Du har nylig sendt inn en søknad"
            isOpen={props.isOpen}
            onRequestClose={() => props.onRequestClose(false)}
        >
            <ModalContent>
                <StyledSystemtittel>Du har nylig sendt inn en søknad</StyledSystemtittel>
                <Paragraph>
                    Vi ser at du nylig har sendt inn en søknad. Ønsker du å sende en ny søknad, eller legge ved
                    opplysninger til en eksisterende søknad?
                </Paragraph>
                <Paragraph>
                    Hvis du ikke ønsker å sende en ny søknad, får du raskere svar ved å sende opplysninger digitalt
                    eller gi opplysninger til veilederen din på telefon.
                </Paragraph>
                <Element>Sende opplysninger</Element>
                <Paragraph>
                    Du kan sende opplysninger ved å velge en søknad under <Lenke href={innsynUrl}>dine søknader</Lenke>{" "}
                    og laste opp dokumentasjon som veileder ber om, eller annet du tenker er viktig for
                    saksbehandlingen.
                </Paragraph>
                <Element>Gi opplysninger til veileder på telefon</Element>
                <Paragraph>Du kan gi en beskjed til veilederen din på tlf 55 55 33 33</Paragraph>

                <ButtonRow>
                    <Hovedknapp onClick={() => props.onPrimaryButtonClick()}>Ny søknad</Hovedknapp>
                    <DineSoknaderKnapp className="knapp" href={innsynUrl} onClick={(event) => onInnsynClick(event)}>
                        Dine søknader
                    </DineSoknaderKnapp>
                </ButtonRow>
            </ModalContent>
        </NavFrontendModal>
    );
};
