import * as React from "react";
import {basePath} from "../../configuration";
import {BodyShort, Button, Modal, Heading} from "@navikt/ds-react";
import styled from "styled-components";
import {mobile} from "../../nav-soknad/styles/variables";
import {NedetidPanel} from "../../components/common/NedetidPanel";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../hooks/useBehandlingsId";
import {logError} from "../../nav-soknad/utils/loggerUtils";
import {useSlettSoknad} from "../../generated/soknad-ressurs/soknad-ressurs";
import {minSideURL} from "../config";

const StyledModal = styled(Modal)`
    max-width: 40rem;
    margin: 0 auto;
    overflow: visible;
`;

const ModalContent = styled(Modal.Body)`
    padding: 2rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${mobile} {
        padding: 0;
    }
`;

const InfoIkon = styled.div`
    position: absolute;
    left: 50%;
    top: 0;
    z-index: 1;
    transform: translate(-50%, -50%);
    background: var(--a-icon-warning);
    border-radius: 100%;
    height: 5rem;
    width: 5rem;

    @media ${mobile} {
        display: none;
    }

    img {
        z-index: 2;
        display: block;
        position: absolute;
        height: 3.125rem;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const ButtonRow = styled.div`
    margin-top: var(--a-spacing-3);
    display: flex;
    gap: 1rem;
`;

export const AvbrytSoknadModal = ({open, onClose}: {open: boolean; onClose: () => void}) => {
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();
    const {mutate, isLoading, isError} = useSlettSoknad();

    const onAvbryt = async () => {
        try {
            await mutate({behandlingsId});
            window.location.href = minSideURL;
        } catch (e) {
            logError(`Feil ved sletting: ${e}`);
        }
    };

    return (
        <StyledModal open={open} onClose={onClose}>
            <ModalContent>
                <InfoIkon>
                    <img src={`${basePath}/statisk/bilder/ikon_ark.svg`} alt={""} />
                </InfoIkon>
                <Heading level="1" size="large" spacing>
                    {t("avbryt.overskrift")}
                </Heading>
                <BodyShort spacing>{t("avbryt.forklaring")}</BodyShort>
                <NedetidPanel varselType={"infoside"} />
                <ButtonRow>
                    <Button
                        variant="primary"
                        onClick={() => {
                            window.location.href = "/sosialhjelp/soknad/informasjon?reason=soknadDeleteModal";
                        }}
                    >
                        {t("avbryt.fortsettsenere")}
                    </Button>
                    <Button variant="primary" disabled={isLoading} onClick={() => onAvbryt()}>
                        {t("avbryt.slett")}
                    </Button>
                    {isError && "Beklager, en feil oppstod ved sletting."}
                </ButtonRow>
            </ModalContent>
        </StyledModal>
    );
};
