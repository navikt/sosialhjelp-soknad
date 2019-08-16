import {erDev} from "../nav-soknad/utils/rest-utils";

export const CONTEXT_PATH = "sosialhjelp/soknad";
export const API_CONTEXT_PATH = "sosialhjelp/soknad-api";
export const HEROKU_MASTER_APP_NAME = "sosialhjelp-test";
export const HEROKU_API_MASTER_APP_NAME = "sosialhjelp-api-test";



export const getContextPathForStaticContent = (): string => {
    const context_path = getContextPathFromWindowLocation(window.location.pathname);
    return erDev() ? "" : context_path
};

export const getContextPathFromWindowLocation = (pathname: string ): string => {
    return pathname.replace(/^(.+?sosialhjelp\/soknad)(.+)$/, "$1")
};

export function getContextPathBasename() {
    // @ts-ignore
    // return window.location.pathname.replace(`/^/(([^/]+/)?${CONTEXT_PATH}).+$/`, "$1")

    // return window.location.pathname.replace( /^\/(([^/]+\/)?sosialhjelp\/soknad).+$/, "/$1");
    return window.location.pathname.replace( /(.+sosialhjelp\/soknad)(.+)/, "$1");
    // return "/sosialhjelp/soknad"
}

export function getRedirectPathname(): string {
    return `/${CONTEXT_PATH}/link`;
}