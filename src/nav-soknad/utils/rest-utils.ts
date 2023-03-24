import {basePath} from "../../configuration";
import {REST_FEIL} from "../../digisos/redux/soknadsdata/soknadsdataTypes";
import {axiosInstance} from "../../lib/orval/soknad-api-axios";
import {Method} from "axios";

export function getApiBaseUrl(withAccessToken?: boolean) {
    return withAccessToken
        ? `${process.env.REACT_APP_API_BASE_URL_WITH_ACCESS_TOKEN}`
        : `${process.env.REACT_APP_API_BASE_URL}`;
}

export const getRedirectPath = () => `${window.location.origin}${basePath}/link?goto=${getGotoPathname()}`;

export const getGotoPathname = () =>
    window.location.pathname === `${basePath}/link`
        ? parseGotoValueFromSearchParameters(window.location.search)
        : window.location.pathname;

export function parseGotoValueFromSearchParameters(searchParameters: string): string {
    const afterGoto = searchParameters.split("goto=")[1];
    return afterGoto ? afterGoto.split("&login_id")[0] : afterGoto; // Fjerne login_id dersom strengen bak goto= er definert.
}

export const downloadAttachedFile = (urlPath: string) => window.open(`${getApiBaseUrl()}${urlPath}`);

export enum HttpStatus {
    UNAUTHORIZED = "unauthorized",
}

export const serverRequest = <T>(method: Method, url: string, body: string, withAccessToken?: boolean): Promise<T> =>
    axiosInstance<T>({
        method,
        url,
        headers: {
            "Content-Type": "application/json",
        },
        data: body,
    });

export const fetchToJson = <T>(urlPath: string, withAccessToken?: boolean) =>
    serverRequest<T>("GET", urlPath, "", withAccessToken);

export const fetchPut = (urlPath: string, body: string, withAccessToken?: boolean) =>
    serverRequest("PUT", urlPath, body, withAccessToken);

export const fetchPost = <T>(urlPath: string, body: string, withAccessToken?: boolean) =>
    serverRequest<T>("POST", urlPath, body, withAccessToken);

export const fetchDelete = (url: string) =>
    axiosInstance({
        method: "DELETE",
        url,
    });

export const fetchUpload = <T>(url: string, data: FormData) =>
    axiosInstance<T>({
        url,
        method: "POST",
        data,
    });

export const fetchUploadIgnoreErrors = <T>(url: string, data: FormData, method: Method) =>
    axiosInstance<T>(
        {
            url,
            method,
            data,
        },
        {
            digisosIgnoreErrors: true,
        }
    );

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
