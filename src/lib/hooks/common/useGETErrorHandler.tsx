import {AxiosError, isAxiosError} from "axios";
import {logger} from "@navikt/next-logger";

export const handleAxiosError = (error: AxiosError) => {
    if (!error.response) {
        logger.error(`GET feilet: ${error.request.path} ${error.message}`);
        return;
    }

    logger.error(`GET-feil ${error.request.path}: ${error.code} ${error.message}`);
    window.location.href = "/sosialhjelp/soknad/feil?reason=handleAxiosError";
};

export const useGETErrorHandler = () => ({
    GETErrorHandler: <TError,>(error: TError) => {
        if (!error) {
            logger.error(`useGETErrorHandler invokert med error == null, skal ikke skje?`);
            return null;
        }

        if (isAxiosError(error)) {
            handleAxiosError(error);
        } else {
            logger.error(`Feil i expectOK: ${error}`);
            window.location.href = "/sosialhjelp/soknad/feil?reason=useGETErrorHandler";
        }
        return null;
    },
});
