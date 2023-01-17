import Axios, {AxiosRequestConfig} from "axios";
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

export const axiosInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({data}) => data);

    // @ts-ignore
    promise.cancel = () => {
        source.cancel("Query was cancelled");
    };

    return promise;
};
