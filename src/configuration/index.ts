export const CONTEXT_PATH = "sosialhjelp/soknad";

export const getContextPathForStaticContent = (): string => "/sosialhjelp/soknad";

export function getRedirectPathname(): string {
    return `/${CONTEXT_PATH}/link`;
}
