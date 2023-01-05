// Note: This value is duplicated in server.js because the imports are weird
export const basePath = "/sosialhjelp/soknad" as const;

export function getRedirectPathname(): string {
    return `${basePath}/link`;
}
