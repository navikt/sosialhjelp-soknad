import {AxiosError, isAxiosError} from "axios";
import {logError, logWarning} from "../../nav-soknad/utils/loggerUtils";

export const handleAxiosError = async (error: AxiosError) => {
    if (!error.response) {
        await logError(`handleAxiosError: ${error.request.path} ${error.message}`);
        return;
    }

    const {status} = error.response;

    if ([404, 410].includes(status)) {
        if (status === 410) await logWarning("Dobbelthåndterer 410-feil i handleAxiosError");
        window.location.href = "/sosialhjelp/soknad/informasjon";
    } else {
        await logError(`handleAxiosError: ${error.request.path}: ${error.code} ${error.message}`);
        window.location.href = "/sosialhjelp/soknad/feil?reason=handleAxiosError";
    }
};

export const useGETErrorHandler = () => ({
    GETErrorHandler: <TError,>(error: TError) => {
        if (!error) {
            logError(`useGETErrorHandler invokert med error == null, skal ikke skje?`).then();
            return null;
        }

        if (isAxiosError(error)) {
            handleAxiosError(error).then();
        } else {
            logError(`Feil i expectOK: ${error}`).then(() => {
                window.location.href = "/sosialhjelp/soknad/feil?reason=useGETErrorHandler";
            });
        }
        return null;
    },
});
