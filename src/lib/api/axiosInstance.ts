import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse, isCancel} from "axios";
import digisosConfig from "../config";
import {isLoginError} from "./error/isLoginError";
import getLogger from "@log/logger";
import {SoknadApiError} from "../../generated/new/model";

const AXIOS_INSTANCE = Axios.create({
    baseURL: digisosConfig.baseURL,
    withCredentials: digisosConfig.withCredentials,
    headers: {Accept: "application/json, text/plain, */*"},
});

interface CancellablePromise<T> extends Promise<T> {
    cancel?: () => void;
}

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
    options?: AxiosRequestConfig & DigisosAxiosConfig
): Promise<T> => {
    const controller = new AbortController();

    const promise: CancellablePromise<AxiosResponse> = AXIOS_INSTANCE({
        ...config,
        ...options,
        signal: controller.signal, // Use signal instead of cancelToken
    })
        .then(({data}) => data)
        .catch(async (e) => {
            if (!(e instanceof AxiosError)) getLogger().warn(`non-axioserror error ${e} in axiosinstance`);

            if (isCancel(e) || options?.digisosIgnoreErrors) {
                return neverResolves();
            }

            const {response} = e;
            if (!response) {
                getLogger().warn(`Nettverksfeil i axiosInstance: ${config.method} ${config.url} ${e}`);
                throw e;
            }

            if (isLoginError(response)) {
                const loginUrl = `/sosialhjelp/soknad/oauth2/login?redirect=${origin}${decodeURIComponent(window.location.pathname)}`;
                getLogger().info(`Fikk 401 på kall, redirecter til login: ${loginUrl}`);
                window.location.assign(loginUrl);
                return neverResolves();
            }

            const {status, data} = response;

            if ([403, 404, 410].includes(status)) {
                const errorType = (data as SoknadApiError).error;

                if (status === 403 && (errorType === "NoAccess" || errorType === "SokerUnder18")) {
                    throw e;
                }
                window.location.href = `/sosialhjelp/soknad/informasjon?reason=axios${status}`;
                return neverResolves();
            }

            getLogger().warn(`Nettverksfeil i axiosInstance: ${config.method} ${config.url}: ${status} ${data}`);
            throw e;
        });

    promise.cancel = () => controller.abort(); // Use abort method

    return promise as Promise<T>;
};

export type ErrorType<T> = AxiosError<T>;
