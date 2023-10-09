import * as React from "react";
import Nedtelling from "./Nedtelling";
import LoggetUt from "./LoggetUt";
import {now} from "../../utils";
import useInterval from "../../../lib/hooks/useInterval";
import {Modal} from "@navikt/ds-react";
import styled from "styled-components";
import {logoutURL} from "../../../lib/config";

const ONE_MINUTE_IN_MS = 60 * 1000;

interface Props {
    sessionDurationInMinutes: number;
    showWarningerAfterMinutes: number;
}

const beregnUtloggingsTidspunkt = (sessionDurationInMinutes: number): number => {
    const millisekunderTilUtlogging = sessionDurationInMinutes * ONE_MINUTE_IN_MS;
    return now() + millisekunderTilUtlogging;
};

const beregnVisAdvarseTidspunkt = (showWarningerAfterMinutes: number): number => {
    const millisekunderTilAdvarsel = showWarningerAfterMinutes * ONE_MINUTE_IN_MS;
    return now() + millisekunderTilAdvarsel;
};

const ModalWithoutCloseButton = styled(Modal)`
    .navds-modal__button {
        display: none;
    }
`;

const TimeoutBox = (props: Props) => {
    const [showWarning, setShowWarning] = React.useState(false);
    const [showLoggedOut, setShowLoggedOut] = React.useState(false);
    const [logoutTime, setLogoutTime] = React.useState(beregnUtloggingsTidspunkt(props.sessionDurationInMinutes));
    const [showWarningTime, setShowWarningTime] = React.useState(
        beregnVisAdvarseTidspunkt(props.showWarningerAfterMinutes)
    );

    useInterval(() => {
        const tidIgjenAvSesjon = logoutTime - now();
        const tidIgjenForAdvarsel = showWarningTime - now();
        setShowWarning(tidIgjenForAdvarsel < 0 && tidIgjenAvSesjon > 0);
        setShowLoggedOut(tidIgjenAvSesjon < 0);
    }, ONE_MINUTE_IN_MS);

    const onLoginAgainClick = () => {
        window.location.reload();
    };

    const onContinueClick = () => {
        setShowWarning(false);
        setShowLoggedOut(false);
        setLogoutTime(beregnUtloggingsTidspunkt(props.sessionDurationInMinutes));
        setShowWarningTime(beregnVisAdvarseTidspunkt(props.showWarningerAfterMinutes));
    };

    return (
        <ModalWithoutCloseButton open={showWarning || showLoggedOut} onClose={() => null}>
            <Modal.Body>
                <div className="timeoutbox">
                    {showWarning && (
                        <Nedtelling
                            onContinueClick={() => {
                                onContinueClick();
                            }}
                            utloggingsUrl={logoutURL}
                        />
                    )}
                    {showLoggedOut && (
                        <LoggetUt
                            onLoginAgainClick={() => {
                                onLoginAgainClick();
                            }}
                        />
                    )}
                </div>
            </Modal.Body>
        </ModalWithoutCloseButton>
    );
};

export default TimeoutBox;
