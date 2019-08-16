import {REST_FEIL} from "../types/restFeilTypes";
import {erMockMiljoEllerDev} from "./index";
import {push} from "connected-react-router";
import {Sider} from "../redux/navigasjon/navigasjonTypes";
import {put} from 'redux-saga/effects';
import {
    API_CONTEXT_PATH,
    CONTEXT_PATH,
    getRedirectPathname,
    HEROKU_API_MASTER_APP_NAME,
    HEROKU_MASTER_APP_NAME
} from "../../configuration";

export function erDev(): boolean {
    const url = window.location.href;
    return (url.indexOf("localhost:3000") > 0 || url.indexOf("devillo.no:3000") > 0);
}

export function kjorerJetty(): boolean {
    const url = window.location.href;
    return url.indexOf(":8189") > 0;
}

export function getApiBaseUrl(): string {
    if (erDev()) {
        // Kjør mot lokal sosialhjelp-soknad-api:
        return `http://localhost:8181/${API_CONTEXT_PATH}/`;

        // Kjør mot lokal mock backend:
        // return "http://localhost:3001/sendsoknad/";
    }
    if (window.location.href.indexOf("localhost:8080") >= 0) {
        return `http://localhost:8181/${API_CONTEXT_PATH}/`;
    }
    if (window.location.origin.indexOf("nais.oera") >= 0) {
        return window.location.origin.replace(`${CONTEXT_PATH}`, `${API_CONTEXT_PATH}`) + `/${API_CONTEXT_PATH}/`;
    }
    if (window.location.origin.indexOf("heroku") >= 0) {
        return window.location.origin.replace(`${HEROKU_MASTER_APP_NAME}`, `${HEROKU_API_MASTER_APP_NAME}`) + `/${API_CONTEXT_PATH}/`;
    }
	return kjorerJetty() ? `http://127.0.0.1:8181/${API_CONTEXT_PATH}/` : getAbsoluteApiUrl();
}

export function getAbsoluteApiUrl() {
    return getAbsoluteApiUrlRegex(window.location.pathname);
}

export function getAbsoluteApiUrlRegex(pathname: string){
    return pathname.replace(/^(.+sosialhjelp\/soknad)(.+)$/, "$1-api/")
}

function determineCredentialsParameter() {
    return window.location.origin.indexOf("nais.oera") || erDev() || "heroku" ? "include" : "same-origin";
}

export function getRedirectPath(): string {
    const currentOrigin = window.location.origin;
    const gotoParameter = "?goto=" + window.location.pathname;
    const redirectPath = currentOrigin + getRedirectPathname() + gotoParameter;
    return '?redirect=' + redirectPath;
}

function getServletBaseUrl(): string {
    if (erDev()) {
        return "http://localhost:3001/sendsoknad/";
    }
    return `/${CONTEXT_PATH}/`;
}

export function downloadAttachedFile(urlPath: string): void {
    const filUrl = `${getApiBaseUrl()}${urlPath}`;
    window.open(filUrl);
}

export const MED_CREDENTIALS: RequestInit = {credentials: determineCredentialsParameter()};

enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

const getHeaders = (): Headers => {
    const headersRecord: Record<string, string> = {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
        "accept": "application/json, text/plain, */*"
    };
    return new Headers(headersRecord)
};

export const serverRequest = (method: string, urlPath: string, body: string, retries = 6): Promise<Response> => {
    const OPTIONS: RequestInit = {
        headers: getHeaders(),
        method,
        credentials: determineCredentialsParameter(),
        body: body ? body : undefined
    };

    return new Promise((resolve, reject) => {
        fetch(getApiBaseUrl() + urlPath, OPTIONS)
            .then((response: Response) => {
                resolve(response);
            })
            .catch((reason: string) => {
                reject(reason)
            });
    });
};

export const fetchGet = (urlPath: string): Promise<Response> => serverRequest(RequestMethod.GET, urlPath, "");

export const fetchPut = (urlPath: string, body: string): Promise<Response> => serverRequest(RequestMethod.PUT, urlPath, body);

export const fetchPost = (urlPath: string, body: string): Promise<Response> => serverRequest(RequestMethod.POST, urlPath, body);

export const fetchDelete = (urlPath: string): Promise<Response> => {
    const OPTIONS: RequestInit = {
        headers: getHeaders(),
        method: RequestMethod.DELETE,
        credentials: determineCredentialsParameter()
    };
    return fetch(getApiBaseUrl() + urlPath, OPTIONS);
};

export const fetchOppsummering = (urlPath: string): Promise<Response> => {
    const OPTIONS: RequestInit = {
        headers: new Headers({"accept": "application/vnd.oppsummering+html"}),
        method: "GET",
        credentials: determineCredentialsParameter()
    };
    return fetch(getApiBaseUrl() + urlPath, OPTIONS)
};

export const fetchKvittering = (urlPath: string): Promise<Response> => {
    const OPTIONS: RequestInit = {
        headers: new Headers({
            "accept": "application/vnd.kvitteringforinnsendtsoknad+json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API")
        }),
        method: "GET",
        credentials: determineCredentialsParameter()
    };
    return fetch(getApiBaseUrl() + urlPath, OPTIONS)
};

export function fetchFeatureToggles() {
    const OPTIONS: RequestInit = {
        headers: getHeaders(),
        method: "GET",
        credentials: determineCredentialsParameter()
    };
    return fetch(getServletBaseUrl() + "api/feature", OPTIONS)
}

export const generateUploadOptions = (formData: FormData) => {
    const UPLOAD_OPTIONS: RequestInit = {
        headers: new Headers({
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
            "accept": "application/json, text/plain, */*"
        }),
        method: "POST",
        credentials: determineCredentialsParameter(),
        body: formData
    };
    return UPLOAD_OPTIONS;
};

export const fetchUpload = (urlPath: string, formData: FormData): Promise<Response> => {
    return fetch(getApiBaseUrl() + urlPath, generateUploadOptions(formData))
};

export const fetchUploadIgnoreErrors = (urlPath: string, formData: FormData): Promise<Response> => {
    return fetch(getApiBaseUrl() + urlPath, generateUploadOptions(formData))
};

export function toJson<T>(response: Response): Promise<T> {
    if (response.status === 204) {
        return response.text() as Promise<any>;
    }
    return response.json();
}

export function* sjekkStatusKodeSaga(response: Response): IterableIterator<any> {
    const AUTH_LINK_VISITED = "sosialhjelpSoknadAuthLinkVisited";

    if (response.status === 401){
        if(window.location.pathname !== getRedirectPathname()){
            // @ts-ignore
            if (!window[AUTH_LINK_VISITED]) {
                response.json().then(r => {
                    window.location.href = r.loginUrl + getRedirectPath();
                });
            }
        } else {
            yield put(push(Sider.SERVERFEIL));
        }
        return response;
    }
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new Error(response.statusText);
}

export const responseToJson = (response: Response) => {
    return new Promise((resolve, reject) => {
        resolve(response.json())
    });
};

export const responseToText = (response: Response) => {
    return new Promise((resolve, reject) => {
        resolve(response.text())
    });
};

// export const sjekkStatuskode: Response = (statuskode: string): any {
//     const AUTH_LINK_VISITED = "sosialhjelpSoknadAuthLinkVisited";
//
//     if (response.status === 401){
//         if(window.location.pathname !== getRedirectPathname()){
//             // @ts-ignore
//             if (!window[AUTH_LINK_VISITED]) {
//                 response.json().then(r => {
//                     window.location.href = r.loginUrl + getRedirectPath();
//                     // return {status: "401 UNAUTHORIZED"}
//                 });
//             }
//         } else {
//             put(push(Sider.SERVERFEIL));
//         }
//         return response;
//     }
//     if (response.status >= 200 && response.status < 300) {
//         return response;
//     }
//     return response;
//     // throw new Error(response.statusText);
// }

export const statusCodeOk = (response: Response): boolean => response.status >= 200 && response.status < 300;

export const getCookie = (name: string): string => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        let partsPopped: string | undefined = parts.pop();
        if (partsPopped){
            const partsPoppedSplitAndShift = partsPopped.split(";").shift();
            return  partsPoppedSplitAndShift ? partsPoppedSplitAndShift : "null"
        } else {
            return "null"
        }
    } else {
        return "null";
    }
};

export function detekterInternFeilKode(feilKode: string): string {
    let internFeilKode = feilKode;
    if (feilKode.match(/Request Entity Too Large/i)) {
        internFeilKode = REST_FEIL.FOR_STOR_FIL;
    }
    if (feilKode.match(/Unsupp?orted Media Type/i)) {
        internFeilKode = REST_FEIL.FEIL_FILTPYE;
    }
    return internFeilKode;
}

export function lastNedForsendelseSomZipFilHvisMockMiljoEllerDev(brukerbehandlingId: string) {
    if (erMockMiljoEllerDev()) {
        const url = getApiBaseUrl() + "internal/mock/tjeneste/downloadzip/" + brukerbehandlingId;
        window.open(url);
    }
}
