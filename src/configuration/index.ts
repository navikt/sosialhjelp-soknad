import {erDev} from "../nav-soknad/utils/rest-utils";

export const baseContextPath = "soknadsosialhjelp";




export const getContextPathForStaticContent = (): string => {
    const context_path = getContextPathFromWindowLocation(window.location.pathname);
    return erDev() ? "" : context_path
};

export const getContextPathFromWindowLocation = (pathname: string ): string => {
    return pathname.replace(/^(.+?soknadsosialhjelp)(.+)$/, "$1")
};

export function getContextPathBasename() {
    // @ts-ignore
    // return window.location.pathname.replace(`/^/(([^/]+/)?${baseContextPath}).+$/`, "$1")

    // return window.location.pathname.replace( /^\/(([^/]+\/)?soknadsosialhjelp).+$/, "/$1");
    return window.location.pathname.replace( /(.+soknadsosialhjelp)(.+)/, "$1");
    // return "/soknadsosialhjelp"
}
