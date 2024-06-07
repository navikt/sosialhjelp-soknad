import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse, isCancel} from "axios";
import {isLocalhost, isMockAlt} from "../utils";
import {UnauthorizedMelding} from "../../generated/model";
import {logError, logInfo, logWarning} from "../utils/loggerUtils";
import {baseURL} from "../config";
import {buildLoginUrl} from "./auth/buildLoginUrl";

const AXIOS_INSTANCE = Axios.create({
    baseURL,
    xsrfCookieName: "XSRF-TOKEN-SOKNAD-API",
    xsrfHeaderName: "X-XSRF-TOKEN",
    withCredentials: isLocalhost(window.location.origin) || isMockAlt(window.location.origin),
    headers: {Accept: "application/json, text/plain, */*"},
});

interface CancellablePromise<T> extends Promise<T> {
    cancel?: () => void;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type DigisosAxiosConfig = {
    // If the request fails, silently return a promise which never resolves.
    // (Useful to prevent packet storms from calls to the logger failing)
    digisosIgnoreErrors?: boolean;
};

const isLoginRedirect401 = (r: any): r is AxiosResponse<UnauthorizedMelding | undefined, any> => r?.status === 401;

/**
 * Digisos Axios client
 *
 * In case of 403, 404, 410 errors, returns an unresolving promise because
 * the rug is about to be pulled out under the code anyway when
 * window.location.href is assigned to.
 *
 * All others will generate exceptions (In case of 409, retry up to 10 times).
 *
 * @returns data from the request, *or* a promise that never resolves,
 * in case of an error that is about to be handled by a page redirection.
 */
export const axiosInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig & DigisosAxiosConfig,
    retry: number = 0
): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise: CancellablePromise<AxiosResponse> = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    })
        .then(({data}) => data)
        .catch(async (e) => {
            if (!(e instanceof AxiosError)) await logWarning(`non-axioserror error ${e} in axiosinstance`);

            if (isCancel(e) || options?.digisosIgnoreErrors) return new Promise<T>(() => {});

            if (!e.response) {
                await logWarning(`Nettverksfeil i axiosInstance: ${config.method} ${config.url} ${e}`);
                console.warn(e);
                throw e;
            }

            const {status, data} = e.response;

            if (isLoginRedirect401(e.response)) {
                window.location.href = await buildLoginUrl(e.response.data, window.location);
                return new Promise<T>(() => {});
            }

            // 403 burde gi feilmelding, men visse HTTP-kall som burde returnere 404 gir 403
            if ([403, 404, 410].includes(status)) {
                window.location.href = `/sosialhjelp/soknad/informasjon?reason=axios${status}`;
                return new Promise<T>(() => {});
            }

            // Conflict -- try again
            if (status === 409) {
                if (retry >= 10) {
                    await logError("Max retries encountered!");
                    throw e;
                }
                await logInfo(`Conflict resolution hack, retry #${retry}`);
                await delay(500);
                return axiosInstance<T>(config, options, retry + 1);
            }

            await logWarning(`Nettverksfeil i axiosInstance: ${config.method} ${config.url}: ${status} ${data}`);
            throw e;
        });

    promise.cancel = () => source.cancel("Query was cancelled");

    return promise as Promise<T>;
};

export type ErrorType<Error> = AxiosError<Error>;
