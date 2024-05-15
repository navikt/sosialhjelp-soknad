import * as React from "react";
import Nedtelling from "./Nedtelling";
import LoggetUt from "./LoggetUt";
import {logoutURL} from "../config";
import {useSessionTimeout} from "./useSessionTimeout";

export const TimeoutBox = ({
    sessionDurationInMinutes,
    showWarningerAfterMinutes,
}: {
    sessionDurationInMinutes: number;
    showWarningerAfterMinutes: number;
}) => {
    const {showWarning, showLoggedOut, onContinue} = useSessionTimeout(
        sessionDurationInMinutes,
        showWarningerAfterMinutes
    );

    return (
        <>
            <Nedtelling open={showWarning} onContinueClick={onContinue} utloggingsUrl={logoutURL} />
            <LoggetUt open={showLoggedOut} onLoginAgainClick={() => window.location.reload()} />
        </>
    );
};
