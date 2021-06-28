import * as React from "react";
import {useIntl} from "react-intl";
import NavFrontendModal from "nav-frontend-modal";

import Nedtelling from "./Nedtelling";
import LoggetUt from "./LoggetUt";
import {now} from "../../utils";
import useInterval from "../../hooks/useInterval";

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

const TimeoutBox = (props: Props) => {
    const [showWarning, setShowWarning] = React.useState(false);
    const [showLoggedOut, setShowLoggedOut] = React.useState(false);
    const [logoutTime, setLogoutTime] = React.useState(beregnUtloggingsTidspunkt(props.sessionDurationInMinutes));
    const [showWarningTime, setShowWarningTime] = React.useState(
        beregnVisAdvarseTidspunkt(props.showWarningerAfterMinutes)
    );

    const intl = useIntl();

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
        <NavFrontendModal
            isOpen={showWarning || showLoggedOut}
            contentLabel={intl.formatMessage({id: "timeout.fortsett"})}
            closeButton={false}
            onRequestClose={() => null}
        >
            <div className="timeoutbox">
                {showWarning && (
                    <Nedtelling
                        onContinueClick={() => {
                            onContinueClick();
                        }}
                        utloggingsUrl="/esso/logout"
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
        </NavFrontendModal>
    );
};

export default TimeoutBox;
