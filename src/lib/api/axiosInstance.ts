import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse, isCancel} from "axios";
import digisosConfig from "../config";
import {LINK_PAGE_PATH} from "../constants";
import {isLoginError} from "./error/isLoginError";
import {getGotoParameter} from "./auth/getGotoParameter";
import {logger} from "@navikt/next-logger";
import {UnauthorizedMelding} from "../../generated/model";

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

const getLoginUrl = (data: UnauthorizedMelding) =>
    data.loginUrl
        ? `${data.loginUrl}?redirect=${origin}${LINK_PAGE_PATH}?goto=${getGotoParameter(window.location)}`
        : `/sosialhjelp/soknad/oauth2/login?redirect=${origin}${decodeURIComponent(window.location.pathname)}`;

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
    let mockToken: string | null = null;

    // Ta idtoken fra cookie og legg i authorization header, men kun i mock/localhost
    if (["mock", "localhost"].includes(process.env.NEXT_PUBLIC_DIGISOS_ENV ?? "")) {
        const bearerToken = document.cookie
            .split("; ")
            .find((c) => c.startsWith("localhost-idtoken"))
            ?.split("=")[1];
        if (bearerToken) {
            mockToken = bearerToken;
        }
    }
    const promise: CancellablePromise<AxiosResponse> = AXIOS_INSTANCE({
        ...config,
        ...options,
        ...(mockToken
            ? {
                  headers: {
                      ...config.headers,
                      ...options?.headers,
                      Authorization: mockToken ? `Bearer ${mockToken}` : undefined,
                  },
              }
            : {}),
        signal: controller.signal, // Use signal instead of cancelToken
    })
        .then(({data}) => data)
        .catch(async (e) => {
            const {method, url} = config;

            if (!(e instanceof AxiosError)) logger.warn({error: e}, `non-AxiosError error in axiosinstance`);

            if (isCancel(e) || options?.digisosIgnoreErrors) {
                return neverResolves();
            }

            if (!e.response) {
                logger.warn({method, url, error: e}, `Nettverksfeil i axiosInstance`);
                throw e;
            }

            const {status, data} = e.response;

            if (isLoginError(e.response)) {
                window.location.assign(getLoginUrl(data));
                return neverResolves();
            }

            // 403 burde gi feilmelding, men visse HTTP-kall som burde returnere 404 gir 403
            if ([403, 404, 410].includes(status)) {
                window.location.href = `/sosialhjelp/soknad/informasjon?reason=axios${status}`;
                return neverResolves();
            }

            logger.warn({method, url, status, data}, `nettverksfeil i axiosInstance`);
            throw e;
        });

    promise.cancel = () => controller.abort(); // Use abort method

    return promise as Promise<T>;
};
