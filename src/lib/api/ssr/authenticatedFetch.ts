import {cookies, headers} from "next/headers";
import digisosConfig from "../../config.ts";

const getAuthorizationHeader = async (): Promise<string> => (await headers()).get("authorization") ?? "";

const getRequestCookies = async (): Promise<string> => {
    const requestCookies = await cookies();
    return requestCookies
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");
};

const getBody = <T>(c: Response | Request): Promise<T> => {
    const contentType = c.headers.get("content-type");
    if (contentType?.includes("application/json")) return c.json();
    return c.text() as Promise<T>;
};

const getHeaders = async (initHeaders?: HeadersInit): Promise<HeadersInit> => {
    const headers = new Headers(initHeaders);

    const authHeader = await getAuthorizationHeader();
    if (authHeader) headers.set("Authorization", authHeader);

    const requestCookies = await getRequestCookies();
    if (requestCookies) headers.set("Cookie", requestCookies);

    return headers;
};

export const authenticatedFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const absoluteUrl = new URL(digisosConfig.baseURL + url.slice(1));

    const response = await fetch(absoluteUrl, {...options, headers: await getHeaders(options.headers)});
    if (!response.ok) throw new Error(`Failed to fetch ${absoluteUrl}: ${response.status} ${response.statusText}`);

    const data = await getBody<T>(response);
    return {status: response.status, data, headers: response.headers} as T;
};

export default authenticatedFetch;
