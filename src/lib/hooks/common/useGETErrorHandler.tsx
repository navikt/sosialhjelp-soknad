import {AxiosError, isAxiosError} from "axios";
import getLogger from "@log/logger";

export const handleAxiosError = (error: AxiosError) => {
    if (!error.response) {
        getLogger().error(`GET feilet: ${error.request.path} ${error.message}`);
        return;
    }

    getLogger().error(`GET-feil ${error.request.path}: ${error.code} ${error.message}`);
    window.location.href = "/sosialhjelp/soknad/feil?reason=handleAxiosError";
};

export const useGETErrorHandler = () => ({
    GETErrorHandler: <TError,>(error: TError) => {
        if (!error) {
            getLogger().error(`useGETErrorHandler invokert med error == null, skal ikke skje?`);
            return null;
        }

        if (isAxiosError(error)) {
            handleAxiosError(error);
        } else {
            getLogger().error(`Feil i expectOK: ${error}`);
            window.location.href = "/sosialhjelp/soknad/feil?reason=useGETErrorHandler";
        }
        return null;
    },
});
