import digisosConfig from "./config.ts";

const getUrl = (contextUrl: string): string => {
    const {pathname, search} = new URL(contextUrl);
    const baseUrl = digisosConfig.driftsmeldingUrl;
    return new URL(`${baseUrl}${pathname}${search}`).toString();
};

export const driftsmeldingFetch = async <T>(url: string, options: RequestInit): Promise<T> => {
    const requestUrl = getUrl(url);
    const request = new Request(requestUrl, {...options, signal: AbortSignal.timeout(500)});
    const response = await fetch(request);
    const data = (await response.json()) as T;
    return {status: response.status, data} as T;
};
