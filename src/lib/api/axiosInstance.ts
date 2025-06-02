import Axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import digisosConfig from "../config";
import {handleAxiosError} from "./handleAxiosError.ts";
import Cookie from "js-cookie";


const AXIOS_INSTANCE = Axios.create({
    baseURL: digisosConfig.baseURL,
    withCredentials: digisosConfig.withCredentials,
    headers: {Accept: "application/json, text/plain, */*"},
});

interface CancellablePromise<T> extends Promise<T> {
    cancel?: () => void;
}

export interface DigisosAxiosConfig extends AxiosRequestConfig {
    // If the request fails, silently return a promise which never resolves.
    // (Useful to prevent packet storms from calls to the logger failing)
    digisosIgnoreErrors?: boolean;
}

const isCookieAuthEnv = ["mock", "localhost"].includes(process.env.NEXT_PUBLIC_DIGISOS_ENV ?? "");

const getAuthHeaderFromCookie = () => {
    const token = Cookie.get("localhost-idtoken");
    return token ? `Bearer ${token}` : undefined;
};

/**
 * Digisos Axios client
 *
 * In case of 403, 404, 410 errors, returns an unresolving promise because
 * the rug is about to be pulled out under the code anyway when
 * window.location.href is assigned to.
 *
 * All others will generate exception
 *
 * @returns data from the request, *or* a promise that never resolves,
 * in case of an error that is about to be handled by a page redirection.
 */
export const axiosInstance = <T>(config: AxiosRequestConfig, options?: DigisosAxiosConfig): Promise<T> => {
    const controller = new AbortController();

    // Ta idtoken fra cookie og legg i authorization header, men kun i mock/localhost
    const Authorization = isCookieAuthEnv ? getAuthHeaderFromCookie() : undefined;

    const promise: CancellablePromise<AxiosResponse> = AXIOS_INSTANCE({
        ...config,
        ...options,
        headers: {...config.headers, ...options?.headers, Authorization},
        signal: controller.signal, // Use signal instead of cancelToken
    })
        .then((res) => res.data)
        .catch(handleAxiosError(config, options));

    promise.cancel = () => controller.abort(); // Use abort method

    return promise as Promise<T>;
};

export type ErrorType<T> = AxiosError<T>;
