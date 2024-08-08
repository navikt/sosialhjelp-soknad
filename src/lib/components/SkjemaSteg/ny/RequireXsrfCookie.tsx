import * as React from "react";
import {ReactNode, useEffect} from "react";
import {useBehandlingsId} from "../../../hooks/common/useBehandlingsId";
import {hentXsrfCookie} from "../../../../generated/client/soknad-ressurs/soknad-ressurs";

/**
 * pt bruker backend én XSRF-cookie per søknad, ikke per økt.
 * Denne komponenten forhindrer at skjema-komponenter lastes før XSRF-cookien er satt.
 */
export const RequireXsrfCookie = ({children}: {children: ReactNode}) => {
    const [waitingForCookie, setWaitingForCookie] = React.useState(true);
    const behandlingsId = useBehandlingsId();

    useEffect(() => {
        hentXsrfCookie(behandlingsId).finally(() => setWaitingForCookie(false));
    }, [behandlingsId]);

    return waitingForCookie ? null : children;
};
