import {erDev} from "../nav-soknad/utils/rest-utils";

export const CONTEXT_PATH = "sosialhjelp/soknad";
export const API_CONTEXT_PATH = "sosialhjelp/soknad-api";
export const INNSYN_CONTEXT_PATH = "sosialhjelp/innsyn";
export const API_CONTEXT_PATH_WITH_ACCESS_TOKEN = "sosialhjelp/login-api/soknad-api";
export const HEROKU_MASTER_APP_NAME = "sosialhjelp-test";
export const HEROKU_API_MASTER_APP_NAME = "sosialhjelp-api-test";
export const URL_KOMMUNE_NUMMER_INFO_PROD = "/sosialhjelp/innsyn-api/api/veiviser/kommunenummer";
export const URL_KOMMUNE_NUMMER_INFO_DEV = "http://localhost:8080/sosialhjelp/innsyn-api/api/veiviser/kommunenummer";
export const URL_KOMMUNE_TILGJENGELIGHET_PROD = "/sosialhjelp/innsyn-api/api/v1/innsyn/kommune";
export const URL_KOMMUNE_TILGJENGELIGHET_DEV = "http://localhost:8080/sosialhjelp/innsyn-api/api/v1/innsyn/kommune";

export const getContextPathForStaticContent = (): string => {
    const context_path = getContextPathFromWindowLocation(window.location.pathname);
    return erDev() ? "" : context_path
};

export const getContextPathFromWindowLocation = (pathname: string ): string => {
    return pathname.replace(/^(.+?sosialhjelp\/soknad)(.+)$/, "$1")
};

export const getContextPathBasename = (): string => getContextPathFromWindowLocation(window.location.pathname);

export function getRedirectPathname(): string {
    return `/${CONTEXT_PATH}/link`;
}


