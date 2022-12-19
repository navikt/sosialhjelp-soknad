export const basePath = "/sosialhjelp/soknad" as const;

export function getRedirectPathname(): string {
    return `${basePath}/link`;
}
