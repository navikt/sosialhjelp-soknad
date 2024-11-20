"use client";

import TekniskFeil from "../../sider/feilsider/TekniskFeil.tsx";
import {logger} from "@navikt/next-logger";
import {logError} from "../../lib/log/loggerUtils.ts";

export const ErrorComponent = ({error}: {error: Error; reset: () => void}) => {
    if (process.env.NEXT_PUBLIC_DIGISOS_ENV !== "localhost") {
        logger.error(`En bruker har sett TekniskFeil, error: ${error} referrer: ${document.referrer}`);
        logError(`Viser feilside, error, referrer: ${document.referrer}`);
    }

    return <TekniskFeil error={error} />;
};

export default ErrorComponent;
