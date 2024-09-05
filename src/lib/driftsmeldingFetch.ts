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
    const response = await fetch(requestUrl, {
        ...options,
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch ${requestUrl}: ${response.status} ${response.statusText}`);
    }
    const data = (await response.json()) as T;
    return {status: response.status, data} as T;
};
