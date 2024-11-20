"use client";

import TekniskFeil from "../sider/feilsider/TekniskFeil.tsx";
import {logger} from "@navikt/next-logger";
import {logError} from "../lib/log/loggerUtils.ts";
import {useEffect} from "react";
import {faro} from "@grafana/faro-react";

export const ErrorComponent = ({error, reset}: {error: Error; reset: () => void}) => {
    if (faro.api) faro.api.pushError(error);
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_DIGISOS_ENV === "localhost") {
            logger.error(
                {errorMessage: error.message, referrer: document.referrer, location: document.location.href},
                `En bruker har sett TekniskFeil`
            );
            logError(`Viser feilside, error, referrer: ${document.referrer}`);
        }
    }, [error]);
    return <TekniskFeil error={error} reset={reset} />;
};

export default ErrorComponent;
