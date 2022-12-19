const BASE_PATH = "/sosialhjelp/soknad";

export const getBasePath = () => BASE_PATH;

export function getRedirectPathname(): string {
    return `${BASE_PATH}/link`;
}
