import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse, isCancel} from "axios";
import {logError, logInfo, logWarning} from "../log/loggerUtils";
import digisosConfig from "../config";
import {cookies} from "next/headers";
import {XSRF_COOKIE_NAME, XSRF_HEADER_NAME} from "../constants.ts";

const AXIOS_INSTANCE = Axios.create({
    baseURL: digisosConfig.baseURL,
    xsrfCookieName: XSRF_COOKIE_NAME,
    xsrfHeaderName: XSRF_HEADER_NAME,
    withCredentials: digisosConfig.withCredentials,
    headers: {Accept: "application/json, text/plain, */*"},
});

AXIOS_INSTANCE.interceptors.request.use(
    (config) => {
        // Retrieve cookies from Next.js headers
        const cookieStore = cookies();

        // Get all cookies as a string
        const cookieString = cookieStore.toString();

        // Attach cookies to the request header
        if (cookieString) config.headers["Cookie"] = cookieString;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

interface CancellablePromise<T> extends Promise<T> {
    cancel?: () => void;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type DigisosAxiosConfig = {
    // If the request fails, silently return a promise which never resolves.
    // (Useful to prevent packet storms from calls to the logger failing)
    digisosIgnoreErrors?: boolean;
};

const neverResolves = <T>() => new Promise<T>(() => {});

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

            if (isCancel(e) || options?.digisosIgnoreErrors) return neverResolves();

            const {response} = e;

            if (!response) {
                await logWarning(`Nettverksfeil i axiosInstance: ${config.method} ${config.url} ${e}`);
                console.warn(e);
                throw e;
            }

            const {status, data} = response;

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
