export const CONTEXT_PATH = "sosialhjelp/soknad";
export const INNSYN_CONTEXT_PATH = "sosialhjelp/innsyn";

export const getContextPathForStaticContent = (): string => "/sosialhjelp/soknad";

export function getRedirectPathname(): string {
    return `/${CONTEXT_PATH}/link`;
}
