import {erDev, erHerokuFeatureBranch} from "../nav-soknad/utils/rest-utils";

export const baseContextPath = "soknadsosialhjelp";

/**
 * Resolves basename in a pathname independent way
 */
export function getContextPathForStaticContent() {

    if (erDev()){
        return "";
    } else if (erHerokuFeatureBranch()){
        return ""
    } else {
        return `/${baseContextPath}`
    }
}

export function getContextPathBasename() {
    // @ts-ignore
    // return window.location.pathname.replace(`/^/(([^/]+/)?${baseContextPath}).+$/`, "$1")

    // return window.location.pathname.replace( /^\/(([^/]+\/)?soknadsosialhjelp).+$/, "/$1");
    return window.location.pathname.replace( /(.+soknadsosialhjelp)(.+)/, "$1");
    // return "/soknadsosialhjelp"
}