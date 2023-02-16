import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {getApiBaseUrl} from "../../nav-soknad/utils/rest-utils";
import {isLocalhost, isMockAlt} from "../../nav-soknad/utils";

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

export const axiosInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise: CancellablePromise<AxiosResponse> = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({data}) => data);

    promise.cancel = () => {
        source.cancel("Query was cancelled");
    };

    return promise as Promise<T>;
};

export type ErrorType<Error> = AxiosError<Error>;
