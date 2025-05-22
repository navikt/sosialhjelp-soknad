import {AxiosError, AxiosRequestConfig, AxiosResponse, isCancel} from "axios";
import {logger} from "@navikt/next-logger";
import {LINK_PAGE_PATH} from "../constants.ts";
import {getGotoParameter} from "./auth/getGotoParameter.ts";
import {DigisosAxiosConfig} from "./axiosInstance.ts";
import {UnauthorizedMelding} from "../../generated/model/unauthorizedMelding.ts";

export const isLoginError = (response: AxiosResponse): response is AxiosResponse<UnauthorizedMelding> =>
    response.status === 401;

const neverResolves = <T>() => new Promise<T>(() => {});

const getLoginUrl = (data: UnauthorizedMelding) =>
    data.loginUrl
        ? `${data.loginUrl}?redirect=${origin}${LINK_PAGE_PATH}?goto=${getGotoParameter(window.location)}`
        : `/sosialhjelp/soknad/oauth2/login?redirect=${origin}${decodeURIComponent(window.location.pathname)}`;

export const handleAxiosError =
    (config: AxiosRequestConfig, options: DigisosAxiosConfig | undefined) => async (e: any) => {
        const {method, url} = config;

        if (!(e instanceof AxiosError)) logger.warn({error: e}, `non-AxiosError error in axiosInstance`);

        if (isCancel(e) || options?.digisosIgnoreErrors) {
            return neverResolves();
        }

        if (!e.response) {
            logger.warn({method, url, error: e}, `nettverksfeil i axiosInstance`);
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
    };
