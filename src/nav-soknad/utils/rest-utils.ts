import {erMockMiljoEllerDev} from "./index";
import {
    API_CONTEXT_PATH,
    API_CONTEXT_PATH_WITH_ACCESS_TOKEN,
    CONTEXT_PATH,
    getRedirectPathname,
    HEROKU_API_MASTER_APP_NAME,
    HEROKU_MASTER_APP_NAME,
    INNSYN_CONTEXT_PATH
} from "../../configuration";
import {REST_FEIL} from "../../digisos/redux/soknad/soknadTypes";
import {NavLogEntry, NavLogLevel} from "../../digisos/redux/navlogger/navloggerTypes";


export function erDev(): boolean {
    const url = window.location.href;
    return (url.indexOf("localhost") >= 0 || url.indexOf("devillo.no:3000") >= 0 || url.indexOf("localhost:8080") >= 0);
}

export function kjorerJetty(): boolean {
    const url = window.location.href;
    return url.indexOf(":8189") > 0;
}

export function getApiBaseUrl(withAccessToken?: boolean): string {
    const apiContextPath = withAccessToken? API_CONTEXT_PATH_WITH_ACCESS_TOKEN : API_CONTEXT_PATH;

    if (erDev()) {
        // Kjør mot lokal sosialhjelp-soknad-api:
        return `http://localhost:8181/${API_CONTEXT_PATH}/`;

        // Kjør med login-api som proxy om en ønsker access_token fra idporten (uncomment begge linjer under)
        // const apiPort = withAccessToken ? 7000 : 8181;
        // return `http://localhost:${apiPort}/${apiContextPath}/`;
    }
    if (window.location.origin.indexOf("nais.oera") >= 0) {
        return window.location.origin.replace(`${CONTEXT_PATH}`, `${API_CONTEXT_PATH}`) + `/${apiContextPath}/`;
    }
    if (window.location.origin.indexOf("heroku") >= 0) {
        return window.location.origin.replace(`${HEROKU_MASTER_APP_NAME}`, `${HEROKU_API_MASTER_APP_NAME}`) + `/${API_CONTEXT_PATH}/`;
    }
    if (kjorerJetty()) {
        return `http://127.0.0.1:7000/${apiContextPath}/`
    }

    return getAbsoluteApiUrl(withAccessToken);
}

export function getInnsynUrl(): string {
    if (erDev()) {
         return `http://localhost:3000/${INNSYN_CONTEXT_PATH}/`; // Endre port så det passer med porten sosialhjelp-innsyn kjører på lokalt hos deg
    }

    return `${window.location.origin}/${INNSYN_CONTEXT_PATH}/`;
}

export function getAbsoluteApiUrl(withAccessToken?: boolean) {
    return getAbsoluteApiUrlRegex(window.location.pathname, withAccessToken);
}

export function getAbsoluteApiUrlRegex(pathname: string, withAccessToken?: boolean){
    return withAccessToken
        ? pathname.replace(/^(.+sosialhjelp\/)(.+)$/,  "$1login-api/soknad-api/")
        : pathname.replace(/^(.+sosialhjelp\/soknad)(.+)$/, "$1-api/")
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
    let path = window.location.href.split("/");
    let behandlingsId = path[path.length-2];
    const headersRecord: Record<string, string> = {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API-"+ behandlingsId),
        "accept": "application/json, text/plain, */*"
    };
    return new Headers(headersRecord)
};

export enum HttpStatus {
    UNAUTHORIZED = "unauthorized",
    UNAUTHORIZED_LOOP_ERROR = "unauthorized_loop_error",
    SERVICE_UNAVAILABLE = "Service Unavailable"
}

export const serverRequest = (method: string, urlPath: string, body: string, withAccessToken?: boolean, retries = 6) => {
    const OPTIONS: RequestInit = {
        headers: getHeaders(),
        method,
        credentials: determineCredentialsParameter(),
        body: body ? body : undefined
    };

    return new Promise((resolve, reject) => {
        fetch(getApiBaseUrl(withAccessToken) + urlPath, OPTIONS)
            .then((response: Response) => {
                if (response.status === 409) {
                    if (retries === 0) {
                        throw new Error(response.statusText);
                    }
                    setTimeout(() => {
                        serverRequest(method, urlPath, body, withAccessToken, retries - 1)
                            .then((data: any) => {
                                resolve(data);
                            })
                            .catch((reason: any) => reject(reason))
                    }, 100 * (7 - retries));

                } else {
                    verifyStatusSuccessOrRedirect(response);
                    const jsonResponse = toJson(response);
                    resolve(jsonResponse);
                }
            })
            .catch((reason: any) => reject(reason));
    });
};

export function fetchToJson(urlPath: string, withAccessToken?: boolean) {
    return serverRequest(RequestMethod.GET, urlPath, "", withAccessToken);
}

export function fetchPut(urlPath: string, body: string, withAccessToken?: boolean) {
    return serverRequest(RequestMethod.PUT, urlPath, body, withAccessToken);
}

export function fetchPost(urlPath: string, body: string, withAccessToken?: boolean) {
    return serverRequest(RequestMethod.POST, urlPath, body, withAccessToken);
}

export function fetchDelete(urlPath: string) {
    const OPTIONS: RequestInit = {
        headers: getHeaders(),
        method: RequestMethod.DELETE,
        credentials: determineCredentialsParameter()
    };
    return fetch(getApiBaseUrl() + urlPath, OPTIONS).then((response: Response) => {
        verifyStatusSuccessOrRedirect(response);
        return response.text();
    });
}

export function fetchOppsummering(urlPath: string) {
    const OPTIONS: RequestInit = {
        headers: new Headers({"accept": "application/vnd.oppsummering+html"}),
        method: "GET",
        credentials: determineCredentialsParameter()
    };
    return fetch(getApiBaseUrl(true) + urlPath, OPTIONS)
        .then((response: Response) => {
            verifyStatusSuccessOrRedirect(response);
            return response.text();
        });
}

export function fetchKvittering(urlPath: string) {
    //let path = window.location.href.split("/");
    //let behandlingsId = path[path.length-2];
    const OPTIONS: RequestInit = {
        headers: new Headers({
            "accept": "application/vnd.kvitteringforinnsendtsoknad+json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
        }),
        method: "GET",
        credentials: determineCredentialsParameter()
    };
    return fetch(getApiBaseUrl() + urlPath, OPTIONS)
        .then((response: Response) => {
            verifyStatusSuccessOrRedirect(response);
            return response.json();
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
            verifyStatusSuccessOrRedirect(response);
            return response.json();
        });
}

// FIXME: KANSKJE JEG KAN BRUKE DENNE SENRE.
// export const getJsonOrRedirectIfUnauthorizedAndThrowError = (response: Response) => {
//     verifyStatusSuccessOrRedirect(response);
//     return response.json();
// };


let generateUploadOptions = function (formData: FormData) {
    let path = window.location.href.split("/");
    let behandlingsId = path[path.length-2];
    const UPLOAD_OPTIONS: RequestInit = {
        headers: new Headers({
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API-" + behandlingsId),
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
            verifyStatusSuccessOrRedirect(response);
            return toJson(response)
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
    if (response.status === 401) {
        response.json().then(r => {
            const createLogEntry = (message: string, level: NavLogLevel): NavLogEntry => {
                return {
                    url: window.location.href,
                    userAgent: window.navigator.userAgent,
                    message: message.toString(),
                    level
                };
            };

            if (window.location.search.split("error_id=")[1] !== r.id) {
                const queryDivider = r.loginUrl.includes("?") ? "&" : "?";
                window.location.href = r.loginUrl + queryDivider + getRedirectPath() + "%26error_id=" + r.id;
            } else {
                let loggPayload = createLogEntry("Fetch ga 401-error-id selv om kallet ble sendt fra URL med samme error_id (" + r.id + "). Dette kan komme av en påloggingsloop (UNAUTHORIZED_LOOP_ERROR).", NavLogLevel.ERROR);
                fetchPost("informasjon/actions/logg",JSON.stringify(loggPayload)).finally();
            }
        });
        throw new Error(HttpStatus.UNAUTHORIZED)
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
