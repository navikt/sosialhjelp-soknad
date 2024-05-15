import {add} from "date-fns";
import * as React from "react";
import useInterval from "../hooks/common/useInterval";

const ONE_MINUTE_IN_MS = 60 * 1000;
const now = () => new Date();
const inXMinutes = (minutes: number) => add(now(), {minutes}).getTime();

export const useSessionTimeout = (sessionDurationInMinutes: number, showWarningerAfterMinutes: number) => {
    const [showWarning, setShowWarning] = React.useState(false);
    const [showLoggedOut, setShowLoggedOut] = React.useState(false);
    const [logoutTime, setLogoutTime] = React.useState(inXMinutes(sessionDurationInMinutes));
    const [showWarningTime, setShowWarningTime] = React.useState(inXMinutes(showWarningerAfterMinutes));

    useInterval(() => {
        const tidIgjenAvSesjon = logoutTime - now().getTime();
        const tidIgjenForAdvarsel = showWarningTime - now().getTime();
        setShowWarning(tidIgjenForAdvarsel < 0 && tidIgjenAvSesjon > 0);
        setShowLoggedOut(tidIgjenAvSesjon < 0);
    }, ONE_MINUTE_IN_MS);

    const onContinue = () => {
        setShowWarning(false);
        setShowLoggedOut(false);
        setLogoutTime(inXMinutes(sessionDurationInMinutes));
        setShowWarningTime(inXMinutes(showWarningerAfterMinutes));
    };

    return {
        showWarning,
        showLoggedOut,
        onContinue,
    };
};
