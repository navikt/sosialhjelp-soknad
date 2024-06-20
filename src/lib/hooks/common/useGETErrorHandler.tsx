import {AxiosError, isAxiosError} from "axios";
import {logError} from "../../log/loggerUtils";

export const handleAxiosError = (error: AxiosError) => {
    if (!error.response) {
        logError(`GET feilet: ${error.request.path} ${error.message}`);
        return;
    }

    logError(`GET-feil ${error.request.path}: ${error.code} ${error.message}`);
    window.location.href = "/sosialhjelp/soknad/feil?reason=handleAxiosError";
};

export const useGETErrorHandler = () => ({
    GETErrorHandler: <TError,>(error: TError) => {
        if (!error) {
            logError(`useGETErrorHandler invokert med error == null, skal ikke skje?`);
            return null;
        }

        if (isAxiosError(error)) {
            handleAxiosError(error);
        } else {
            logError(`Feil i expectOK: ${error}`).then(() => {
                window.location.href = "/sosialhjelp/soknad/feil?reason=useGETErrorHandler";
            });
        }
        return null;
    },
});
