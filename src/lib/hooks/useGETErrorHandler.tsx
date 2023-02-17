import {AxiosError, isAxiosError} from "axios";
import {logError} from "../../nav-soknad/utils/loggerUtils";

export const handleAxiosError = (error: AxiosError) => {
    if (!error.response) return logError(`GET feilet: ${error.request.path} ${error.message}`);

    const {status} = error.response;

    if (status === 404) {
        window.location.href = "/sosialhjelp/soknad/informasjon";
    } else if (status === 410) {
        window.location.href = "/sosialhjelp/soknad/informasjon";
    } else {
        logError(`GET-feil ${error.request.path}: ${error.code} ${error.message}`);
        // FIXME: Husk å lage denne!!
        window.location.href = "/sosialhjelp/soknad/feil";
    }
};

export const useGETErrorHandler = () => ({
    GETErrorHandler: (error: AxiosError | Error | null) => {
        console.log("isaxioserror");

        if (!error) {
            logError(`useGETErrorHandler invokert med error == null, skal ikke skje?`);
            return;
        }

        if (isAxiosError(error)) {
            handleAxiosError(error);
        } else {
            logError(`Feil i expectOK: ${error.message}`);
            window.location.href = "/sosialhjelp/soknad/feil";
        }
    },
});
