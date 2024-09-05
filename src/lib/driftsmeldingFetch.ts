import digisosConfig from "./config.ts";
import {logger} from "@navikt/next-logger";

const getUrl = (contextUrl: string): string => {
    const {pathname, search} = new URL(contextUrl);
    const baseUrl = digisosConfig.driftsmeldingUrl;
    return new URL(`${baseUrl}${pathname}${search}`).toString();
};

export const driftsmeldingFetch = async <T>(url: string, options: RequestInit): Promise<T> => {
    const requestUrl = getUrl(url);
    logger.info(`Fetching driftsmelding from ${requestUrl}`);
    const request = new Request(requestUrl, {
        ...options,
        signal: AbortSignal.timeout(500),
        next: {revalidate: 30},
    });
    const response = await fetch(request);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${requestUrl}: ${response.status} ${response.statusText}`);
    }
    const data = (await response.json()) as T;
    return {status: response.status, data} as T;
};
