import {REST_FEIL} from "../types/restFeilTypes";
import {erMockMiljoEllerDev} from "./index";
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
        return `http://localhost:7000/${API_CONTEXT_PATH}/`;

        // Kjør mot lokal mock backend:
        // return "http://localhost:3001/sendsoknad/";
    }
    if (window.location.href.indexOf("localhost:8080") >= 0) {
        return `http://localhost:7000/${API_CONTEXT_PATH}/`;
    }
    if (window.location.origin.indexOf("nais.oera") >= 0) {
        return window.location.origin.replace(`${CONTEXT_PATH}`, `${API_CONTEXT_PATH}`) + `/${API_CONTEXT_PATH}/`;
    }
    if (window.location.origin.indexOf("heroku") >= 0) {
        return window.location.origin.replace(`${HEROKU_MASTER_APP_NAME}`, `${HEROKU_API_MASTER_APP_NAME}`) + `/${API_CONTEXT_PATH}/`;
    }
	return kjorerJetty() ? `http://127.0.0.1:7000/${API_CONTEXT_PATH}/` : getAbsoluteApiUrl();
}

export function getAbsoluteApiUrl() {
    return getAbsoluteApiUrlRegex(window.location.pathname);
}

export function getAbsoluteApiUrlRegex(pathname: string){
    return pathname.replace(/^(.+sosialhjelp\/)(.+)$/,  "$1login-api/soknad-api/")
}

function determineCredentialsParameter() {
    return window.location.origin.indexOf("nais.oera") || erDev() || "heroku" ? "include" : "same-origin";
}

export function getRedirectPath(): string {
    const currentOrigin = window.location.origin;
    const gotoParameter = "?goto=" + window.location.pathname;
    const redirectPath = currentOrigin + getRedirectPathname() + gotoParameter;
    return 'redirect=' + redirectPath;
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

export enum HttpStatus {
    UNAUTHORIZED = "unauthorized"
}

export const serverRequest = (method: string, urlPath: string, body: string, retries = 6) => {
    const OPTIONS: RequestInit = {
        headers: getHeaders(),
        method,
        credentials: determineCredentialsParameter(),
        body: body ? body : undefined
    };

    return new Promise((resolve, reject) => {
        fetch(getApiBaseUrl() + urlPath, OPTIONS)
            .then((response: Response) => {
                if (response.status === 409) {
                    if (retries === 0) {
                        throw new Error(response.statusText);
                    }
                    setTimeout(() => {
                        serverRequest(method, urlPath, body, retries - 1)
                            .then((data: any) => {
                                resolve(data);
                            })
                            .catch((reason: any) => reject(reason))
                    }, 100 * (7 - retries));

                } else {
                    const statusKode = verifyStatusSuccessOrRedirect(response);
                    if (statusKode >= 200 && statusKode < 300) {
                        const jsonResponse = toJson(response);
                        resolve(jsonResponse);
                    } else {
                        throw new Error(HttpStatus.UNAUTHORIZED)
                    }
                }
            })
            .catch((reason: any) => reject(reason));
    });
};

export function fetchToJson(urlPath: string) {
    return serverRequest(RequestMethod.GET, urlPath, "");
}

export function fetchPut(urlPath: string, body: string) {
    return serverRequest(RequestMethod.PUT, urlPath, body);
}

export function fetchPost(urlPath: string, body: string) {
    return serverRequest(RequestMethod.POST, urlPath, body);
}

export function fetchDelete(urlPath: string) {
    const OPTIONS: RequestInit = {
        headers: getHeaders(),
        method: RequestMethod.DELETE,
        credentials: determineCredentialsParameter()
    };
    return fetch(getApiBaseUrl() + urlPath, OPTIONS).then((response: Response) => {
        const statusKode: number = verifyStatusSuccessOrRedirect(response);
        if (statusKode >= 200 && statusKode < 300) {
            return response.text();
        } else {
            throw new Error(HttpStatus.UNAUTHORIZED)
        }
    });
}

export function fetchOppsummering(urlPath: string) {
    const OPTIONS: RequestInit = {
        headers: new Headers({"accept": "application/vnd.oppsummering+html"}),
        method: "GET",
        credentials: determineCredentialsParameter()
    };
    return fetch(getApiBaseUrl() + urlPath, OPTIONS)
        .then((response: Response) => {
            const statusKode: number = verifyStatusSuccessOrRedirect(response);
            if (statusKode >= 200 && statusKode < 300) {
                return response.text();
            } else {
                throw new Error(HttpStatus.UNAUTHORIZED)
            }
        });
}

export function fetchKvittering(urlPath: string) {
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
        .then((response: Response) => {
            const statusKode: number = verifyStatusSuccessOrRedirect(response);
            if (statusKode >= 200 && statusKode < 300) {
                return response.json();
            } else {
                throw new Error(HttpStatus.UNAUTHORIZED)
            }
        });
}

export function fetchFeatureToggles() {
    const OPTIONS: RequestInit = {
        headers: getHeaders(),
        method: "GET",
        credentials: determineCredentialsParameter()
    };
    return fetch(getServletBaseUrl() + "api/feature", OPTIONS)
        .then((response: Response) => {
            const statusKode: number = verifyStatusSuccessOrRedirect(response);
            if (statusKode >= 200 && statusKode < 300) {
                return response.json();
            } else {
                throw new Error(HttpStatus.UNAUTHORIZED)
            }
        });
}

// FIXME: KANSKJE JEG KAN BRUKE DENNE SENRE.
// export const getJsonOrRedirectIfUnauthorizedAndThrowError = (response: Response) => {
//     const statusKode: number = verifyStatusSuccessOrRedirect(response);
//     if (statusKode >= 200 && statusKode < 300) {
//         return response.json();
//     } else {
//         throw new Error(HttpStatus.UNAUTHORIZED)
//     }
// };


let generateUploadOptions = function (formData: FormData) {
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

export function fetchUpload(urlPath: string, formData: FormData) {
    return fetch(getApiBaseUrl() + urlPath, generateUploadOptions(formData))
        .then((response) => {
            const statusKode: number = verifyStatusSuccessOrRedirect(response);
            if (statusKode >= 200 && statusKode < 300) {
                return toJson(response)
            } else {
                throw new Error(HttpStatus.UNAUTHORIZED)
            }
        });
}

export function fetchUploadIgnoreErrors(urlPath: string, formData: FormData) {
    return fetch(getApiBaseUrl() + urlPath, generateUploadOptions(formData))
        .then(toJson);
}

export function toJson<T>(response: Response): Promise<T> {
    if (response.status === 204) {
        return response.text() as Promise<any>;
    }
    return response.json();
}

function verifyStatusSuccessOrRedirect(response: Response): number {
    const AUTH_LINK_VISITED = "sosialhjelpSoknadAuthLinkVisited";

    if (response.status === 401){
        // @ts-ignore
        if (!window[AUTH_LINK_VISITED]) {
            response.json().then(r => {
                if (window.location.search.split("error_id=")[1] !== r.id) {
                    const queryDivider = r.loginUrl.includes("?") ? "&" : "?";
                    window.location.href = r.loginUrl + queryDivider + getRedirectPath() + "&error_id=" + r.id;
                }
            });
        } else {
            // @ts-ignore
            window[AUTH_LINK_VISITED] = false;
        }
        return 401;
    }
    if (response.status >= 200 && response.status < 300) {
        return response.status;
    }
    throw new Error(response.statusText);
}

export function getCookie(name: string) {
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
