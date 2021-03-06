export const CONTEXT_PATH = "sosialhjelp/soknad";
export const API_CONTEXT_PATH = "sosialhjelp/soknad-api";
export const INNSYN_CONTEXT_PATH = "sosialhjelp/innsyn";
export const API_CONTEXT_PATH_WITH_ACCESS_TOKEN = "sosialhjelp/login-api/soknad-api";
export const GCP_APP_NAME = "sosialhjelp-soknad-gcp";
export const GCP_API_APP_NAME = "sosialhjelp-soknad-api-gcp";

export const getContextPathForStaticContent = (): string => "/sosialhjelp/soknad";

export const getContextPathFromWindowLocation = (pathname: string): string => {
    return pathname.replace(/^(.+?sosialhjelp\/soknad)(.+)$/, "$1");
};

export const getContextPathBasename = (): string => getContextPathFromWindowLocation(window.location.pathname);

export function getRedirectPathname(): string {
    return `/${CONTEXT_PATH}/link`;
}
