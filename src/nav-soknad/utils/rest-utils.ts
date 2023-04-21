import {basePath} from "../../configuration";
import {REST_FEIL} from "../../digisos/redux/soknadsdata/soknadsdataTypes";
import {redirectToLogin} from "../../lib/orval/soknad-api-axios";
import {logWarning} from "./loggerUtils";
import {baseURL} from "../../lib/config";

export const determineCredentialsParameter = () =>
    process.env.REACT_APP_DIGISOS_ENV === "localhost" ? "include" : "same-origin";

export const getRedirectPath = () => `${window.location.origin}${basePath}/link?goto=${getGotoPathname()}`;

export const getGotoPathname = () =>
    window.location.pathname === `${basePath}/link`
        ? parseGotoValueFromSearchParameters(window.location.search)
        : window.location.pathname;

export function parseGotoValueFromSearchParameters(searchParameters: string): string {
    const afterGoto = searchParameters.split("goto=")[1];
    return afterGoto ? afterGoto.split("&login_id")[0] : afterGoto; // Fjerne login_id dersom strengen bak goto= er definert.
}

export const downloadAttachedFile = (urlPath: string) => window.open(baseURL + urlPath);

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

const getHeaders = () =>
    new Headers({
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
        accept: "application/json, text/plain, */*",
    });

export enum HttpStatus {
    UNAUTHORIZED = "unauthorized",
}

export const serverRequest = <T>(
    method: HTTPMethod,
    urlPath: string,
    body: string,
    withAccessToken?: boolean,
    retries = 6
): Promise<T> => {
    const OPTIONS: RequestInit = {
        headers: getHeaders(),
        method,
        credentials: determineCredentialsParameter(),
        body: body ? body : undefined,
    };

    return new Promise<T>((resolve, reject) => {
        fetch(baseURL + urlPath, OPTIONS)
            .then((response: Response) => {
                if (response.ok) resolve(toJson<T>(response));

                const {status, statusText} = response;

                if (status === 401) {
                    response.json().then((data) => redirectToLogin(data));
                    return;
                }

                if (status === 409) {
                    if (!retries) throw new DigisosLegacyRESTError(status, `Ran out of 409 retries: ${statusText}`);

                    setTimeout(() => {
                        serverRequest(method, urlPath, body, withAccessToken, retries - 1)
                            .then((data: unknown) => resolve(data as T))
                            .catch(reject);
                    }, 100 * (7 - retries));

                    return;
                }

                if ([403, 410].includes(status)) {
                    logWarning(`Redirecter til /informasjon i rest-utils fordi HTTP ${status}`);
                    window.location.href = `/sosialhjelp/soknad/informasjon?reason=legacy${status}`;

                    return;
                }

                throw new DigisosLegacyRESTError(response.status, response.statusText);
            })
            .catch(reject);
    });
};

export const fetchToJson = <T>(urlPath: string, withAccessToken?: boolean) =>
    serverRequest<T>("GET", urlPath, "", withAccessToken);

export const fetchPut = (urlPath: string, body: string, withAccessToken?: boolean) =>
    serverRequest("PUT", urlPath, body, withAccessToken);

export const fetchPost = <T>(urlPath: string, body: string, withAccessToken?: boolean) =>
    serverRequest<T>("POST", urlPath, body, withAccessToken);

export function fetchDelete(urlPath: string) {
    const OPTIONS: RequestInit = {
        headers: getHeaders(),
        method: "DELETE",
        credentials: determineCredentialsParameter(),
    };
    return fetch(baseURL + urlPath, OPTIONS).then((response: Response) => {
        if (response.status === 401) response.json().then((data) => redirectToLogin(data));
        if (!response.ok) throw new DigisosLegacyRESTError(response.status, response.statusText);
        return response.text();
    });
}

const generateUploadOptions = (formData: FormData, method: string): RequestInit => ({
    headers: new Headers({
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
        accept: "application/json, text/plain, */*",
    }),
    method: method,
    credentials: determineCredentialsParameter(),
    body: formData,
});

export function fetchUpload<T>(urlPath: string, formData: FormData) {
    return fetch(baseURL + urlPath, generateUploadOptions(formData, "POST")).then((response) => {
        if (response.status === 401) response.json().then((data) => redirectToLogin(data));
        if (!response.ok) throw new DigisosLegacyRESTError(response.status, response.statusText);
        return toJson<T>(response);
    });
}

export function fetchUploadIgnoreErrors(urlPath: string, formData: FormData, method: string) {
    return fetch(baseURL + urlPath, generateUploadOptions(formData, method)).then(toJson);
}

export function toJson<T>(response: Response): Promise<T> {
    if (response.status === 204) return response.text() as Promise<any>;

    return response.json();
}

// REST error encountered using the old (rest-utils.ts) network code
export class DigisosLegacyRESTError extends Error {
    public readonly status: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.status = statusCode;
    }
}

export function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        const partsPopped: string | undefined = parts.pop();
        if (partsPopped) {
            const partsPoppedSplitAndShift = partsPopped.split(";").shift();
            return partsPoppedSplitAndShift ? partsPoppedSplitAndShift : "null";
        } else {
            return "null";
        }
    } else {
        return "null";
    }
}

export function detekterInternFeilKode(feilKode: string): string {
    let internFeilKode = feilKode;
    if (feilKode.match(/Request Entity Too Large/i)) {
        if (feilKode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR) {
            internFeilKode = REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR;
        } else if (feilKode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE) {
            internFeilKode = REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE;
        } else {
            internFeilKode = REST_FEIL.FOR_STOR_FIL;
        }
    }

    if (feilKode.match(/Unsupp?orted Media Type/i)) internFeilKode = REST_FEIL.FEIL_FILTPYE;

    return internFeilKode;
}
