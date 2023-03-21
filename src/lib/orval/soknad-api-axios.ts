import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse, isCancel} from "axios";
import {getApiBaseUrl, getRedirectPath} from "../../nav-soknad/utils/rest-utils";
import {isLocalhost, isMockAlt} from "../../nav-soknad/utils";
import {UnauthorizedMelding} from "../../generated/model";
import {logError, logWarning} from "../../nav-soknad/utils/loggerUtils";

const navigateToLoginOn401 = async (data: UnauthorizedMelding | undefined) => {
    if (!data) {
        await logError(`401-feil uten data`);
        throw new Error(`401-feil uten data`);
    }

    const {id, loginUrl} = data;

    if (new URLSearchParams(window.location.search).get("login_id") === id) {
        await logError("login_id == id fra 401, kan indikere en redirect loop?");
        return;
    }

    const loginURLObj = new URL(loginUrl);
    loginURLObj.searchParams.set("login_id", id);
    loginURLObj.searchParams.set("redirect", getRedirectPath());
    window.location.href = loginURLObj.toString();
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

export const axiosInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
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
            if (e instanceof AxiosError<T>)
                if (e.response) {
                    const {status, data} = e.response;
                    if (status === 401) await navigateToLoginOn401(data as UnauthorizedMelding);
                    // 403 burde gi feilmelding, men visse HTTP-kall som burde returnere 404 gir 403
                    else if ([410, 403, 404].includes(status))
                        window.location.href = `/sosialhjelp/soknad/informasjon?code=${status}`;
                    else if (status === 409) {
                        if (retry >= 10) {
                            logError("Max retries encountered!");
                            throw e;
                        }
                        logWarning(`Conflict resolution hack, retry #${retry}`);
                        await delay(250);
                        return axiosInstance<T>(config, options, retry + 1);
                    } else {
                        await logError(`Nettverksfeil i axiosInstance: ${status} ${data}`);
                        throw e;
                    }
                    return new Promise<T>(() => {});
                } else {
                    if (isCancel(e)) return new Promise<T>(() => {});
                    await logError(`Nettverksfeil i axiosInstance: ${config.method} ${config.url} ${e}`);
                    throw e;
                    // window.location.href = "/sosialhjelp/soknad/feil";
                }
        });

    promise.cancel = () => {
        source.cancel("Query was cancelled");
    };

    return promise as Promise<T>;
};

export type ErrorType<Error> = AxiosError<Error>;
