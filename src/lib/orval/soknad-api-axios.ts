import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse, isCancel} from "axios";
import {getApiBaseUrl, getRedirectPath} from "../../nav-soknad/utils/rest-utils";
import {isLocalhost, isMockAlt} from "../../nav-soknad/utils";
import {UnauthorizedMelding} from "../../generated/model";
import {logError, logInfo, logWarning} from "../../nav-soknad/utils/loggerUtils";
import axiosRetry from "axios-retry";

axiosRetry(Axios, {retries: 3});

export const redirectToLogin = (data?: UnauthorizedMelding): Promise<void> => {
    if (!data) {
        logError(`401-feil uten data`);
        throw new Error(`401-feil uten data`);
    }

    const {id, loginUrl} = data;

    if (new URLSearchParams(window.location.search).get("login_id") === id) {
        logError("login_id == id fra 401, kan indikere en redirect loop?");
    }

    const loginURLObj = new URL(loginUrl);
    loginURLObj.searchParams.set("login_id", id);
    loginURLObj.searchParams.set("redirect", getRedirectPath());
    window.location.href = loginURLObj.toString();

    // Returner et Promise som aldri vil resolve, så kodeflyten stopper i påvente av navigering
    return new Promise(() => {});
};

export const AXIOS_INSTANCE = Axios.create({
    baseURL: getApiBaseUrl(true),
    xsrfCookieName: "XSRF-TOKEN-SOKNAD-API",
    withCredentials: isLocalhost(window.location.origin) || isMockAlt(window.location.origin),
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
        Accept: "application/json, text/plain, */*",
    },
});

interface CancellablePromise<T> extends Promise<T> {
    cancel?: () => void;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Digisos-spesifikke Axios-valg
 */
export type DigisosAxiosConfig = {
    // Ingen feilhåndtering skal utføres (mest nyttig for logging)
    digisosIgnoreErrors?: boolean;
    /**
     *  Overstyrer default (pt. [403, 404, 410]) feilkoder som fører til reset (noen APIer bruker feks 404)
     */
    digisosFatalErrors?: number[];
};

const isLoginRedirect401 = (response: any): response is AxiosResponse<UnauthorizedMelding | undefined, any> =>
    response?.status === 401;

/**
 * Digisos Axios client
 *
 * In case of 403, 404, 410 errors, returns an unresolving promise because
 * the rug is about to be pulled out under the code anyway with a redirect.
 *
 * All others will generate exceptions (409 causes up to ten retries).
 *
 * @returns data from the request, *or* a promise that never resolves,
 * in case of an error that is about to be handled by a page redirection.
 */
export const axiosInstance = <T>(
    config: AxiosRequestConfig,
    options?: DigisosAxiosConfig,
    retry: number = 0
): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise: CancellablePromise<AxiosResponse> = AXIOS_INSTANCE({
        ...config,
        cancelToken: source.token,
    })
        .then(({data}) => data)
        .catch(async (e) => {
            if (isCancel(e) || options?.digisosIgnoreErrors) return new Promise<T>(() => {});

            if (!(e instanceof AxiosError<T>)) {
                logWarning(`non-axioserror error ${e} in axiosinstance`);
                return;
            }

            if (!e.response) {
                logWarning(`Nettverksfeil i axiosInstance: ${config.method} ${config.url} ${e}`);
                throw e;
            }

            const {status, data} = e.response;

            if (isLoginRedirect401(e.response)) await redirectToLogin(e.response.data);

            // 403 burde gi feilmelding, men visse HTTP-kall som burde returnere 404 gir 403
            if (options?.digisosFatalErrors ?? [403, 404, 410].includes(status)) {
                window.location.href = `/sosialhjelp/soknad/informasjon?reason=axios${status}`;
                return new Promise<T>(() => {});
            }

            // Conflict -- try again
            if (status === 409) {
                if (retry >= 10) {
                    logError("Max retries encountered!");
                    throw e;
                }
                logInfo(`Conflict resolution hack, retry #${retry}`);
                await delay(500);
                return axiosInstance<T>(config, options, retry + 1);
            }

            logWarning(`Nettverksfeil i axiosInstance: ${config.method} ${config.url}: ${status} ${data}`);
            throw e;
        });

    promise.cancel = () => source.cancel("Query was cancelled");

    return promise as Promise<T>;
};

export type ErrorType<Error> = AxiosError<Error>;
