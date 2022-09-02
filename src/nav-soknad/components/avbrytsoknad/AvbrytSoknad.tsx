import * as React from "react";
import {fortsettSoknad, showServerFeil} from "../../../digisos/redux/soknad/soknadActions";
import {FormattedMessage} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {getContextPathForStaticContent} from "../../../configuration";
import {State} from "../../../digisos/redux/reducers";
import {fetchDelete, HttpStatus} from "../../utils/rest-utils";
import {logWarning} from "../../utils/loggerUtils";
import {Alert, BodyShort, Button, Modal, Heading} from "@navikt/ds-react";
import {useEffect} from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import {mobile} from "../../styles/variables";

const StyledModal = styled(Modal)`
    max-width: 40rem;
    margin: 0 auto;
    overflow: visible;
`;

const ModalContent = styled(Modal.Content)`
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
    background: var(--navds-semantic-color-feedback-warning-icon);
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
    margin-top: var(--navds-spacing-3);
    display: flex;
    gap: 1rem;
`;

const getMinSideUrl = () => {
    return `${process.env.REACT_APP_MIN_SIDE_URL}`;
};

export const AvbrytSoknad = () => {
    const {behandlingsId, avbrytDialog, nedetid} = useSelector((state: State) => state.soknad);

    const minSideUrl = getMinSideUrl();

    const dispatch = useDispatch();

    useEffect(() => {
        ReactModal.setAppElement("#root");
    }, []);

    const onAvbryt = () => {
        if (behandlingsId) {
            fetchDelete(`soknader/${behandlingsId}`)
                .then(() => (window.location.href = minSideUrl))
                .catch((reason) => {
                    if (reason.message === HttpStatus.UNAUTHORIZED) {
                        return;
                    }
                    logWarning("slett soknad saga feilet: " + reason);
                    dispatch(showServerFeil(true));
                });
        }
    };

    const onFortsett = () => {
        dispatch(fortsettSoknad());
    };

    const onFortsettSenere = () => {
        window.location.href = minSideUrl;
    };

    return (
        <StyledModal open={avbrytDialog.synlig || false} onClose={() => onFortsett()}>
            <ModalContent>
                <InfoIkon>
                    <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_ark.svg`} alt={""} />
                </InfoIkon>
                <Heading level="1" size="large" spacing>
                    <FormattedMessage id={"avbryt.overskrift"} />
                </Heading>
                <BodyShort spacing>
                    <FormattedMessage id={"avbryt.forklaring"} />
                </BodyShort>
                {nedetid?.isPlanlagtNedetid && (
                    <Alert variant="info">
                        <FormattedMessage
                            id="nedetid.alertstripe.avbryt"
                            values={{
                                nedetidstart: nedetid?.nedetidStart,
                                nedetidslutt: nedetid?.nedetidSlutt,
                            }}
                        />
                    </Alert>
                )}

                <ButtonRow>
                    <Button variant="primary" onClick={() => onFortsettSenere()}>
                        <FormattedMessage id={"avbryt.fortsettsenere"} />
                    </Button>
                    <Button variant="primary" onClick={() => onAvbryt()}>
                        <FormattedMessage id={"avbryt.slett"} />
                    </Button>
                </ButtonRow>
            </ModalContent>
        </StyledModal>
    );
};
