import {
    API_CONTEXT_PATH,
    API_CONTEXT_PATH_WITH_ACCESS_TOKEN,
    CONTEXT_PATH,
    GCP_API_APP_NAME,
    GCP_APP_NAME,
    getRedirectPathname,
    INNSYN_CONTEXT_PATH,
} from "../../configuration";
import {REST_FEIL} from "../../digisos/redux/soknad/soknadTypes";
import {logError} from "./loggerUtils";

export function erLocalhost(): boolean {
    const url = window.location.href;
    return url.indexOf("localhost") >= 0;
}

export function erProd(): boolean {
    const url = window.location.href;
    return url.indexOf("www.nav.no") >= 0;
}

export function erDevSbs(): boolean {
    const url = window.location.href;
    return url.indexOf("www-q0") >= 0 || url.indexOf("www-q1") >= 0;
}

export function erQGammelVersjon(): boolean {
    /* Vi endrer url til www-q*.dev.nav.no. Denne funksjonen returnerer true når den gamle URL-en blir benyttet.
     * Den gamle URL-en vil bli benyttet en stund av kommuner. */
    const url = window.location.href;
    return url.indexOf("www-q0.nav.no") >= 0 || url.indexOf("www-q1.nav.no") >= 0;
}

enum LocalHostMode {
    LOCALHOST_MOCK_PROFIL,
    LOCALHOST_MOCK_ALT_PROFIL,
    LOCALHOST_LOKAL_LOGIN_API,
}

export function getLocalhostApiBaseUrl(withAccessToken: boolean | undefined, apiContextPath: string): string {
    const mode = LocalHostMode.LOCALHOST_MOCK_PROFIL; // Velg modus her!

    // @ts-ignore
    if (mode === LocalHostMode.LOCALHOST_MOCK_PROFIL) {
        // Kjør mot lokal sosialhjelp-soknad-api:
        return `http://localhost:8181/${API_CONTEXT_PATH}/`;
    }

    if (mode === LocalHostMode.LOCALHOST_MOCK_ALT_PROFIL) {
        // Kjør mot lokal sosialhjelp-soknad-api og mock-alt-api (som login-api):
        if (withAccessToken) return `http://localhost:8989/sosialhjelp/mock-alt-api/login-api/${API_CONTEXT_PATH}/`;
        else return `http://localhost:8181/${API_CONTEXT_PATH}/`;
    }

    if (mode === LocalHostMode.LOCALHOST_LOKAL_LOGIN_API) {
        // Kjør med login-api som proxy om en ønsker access_token fra idporten
        const apiPort = withAccessToken ? 7000 : 8181;
        return `http://localhost:${apiPort}/${apiContextPath}/`;
    }

    return `http://localhost:8181/${API_CONTEXT_PATH}/`;
}

export function getApiBaseUrl(withAccessToken?: boolean): string {
    const apiContextPath = withAccessToken ? API_CONTEXT_PATH_WITH_ACCESS_TOKEN : API_CONTEXT_PATH;

    if (erLocalhost()) {
        return getLocalhostApiBaseUrl(withAccessToken, apiContextPath);
    }
    if (window.location.origin.indexOf("nais.oera") >= 0) {
        return window.location.origin.replace(`${CONTEXT_PATH}`, `${API_CONTEXT_PATH}`) + `/${apiContextPath}/`;
    }
    if (
        window.location.origin.indexOf("sosialhjelp-soknad-gcp.dev.nav.no") >= 0 ||
        window.location.origin.indexOf("digisos-gcp.dev.nav.no") >= 0 ||
        window.location.origin.indexOf("labs.nais.io") >= 0
    ) {
        if (window.location.origin.indexOf("digisos-gcp.dev.nav.no") >= 0) {
            return getAbsoluteApiUrlForMockAlt(withAccessToken);
        }
        if (window.location.origin.indexOf("digisos.labs.nais.io") >= 0) {
            return getAbsoluteApiUrl(withAccessToken);
        }
        return window.location.origin.replace(`${GCP_APP_NAME}`, `${GCP_API_APP_NAME}`) + `/${API_CONTEXT_PATH}/`;
    }

    return getAbsoluteApiUrl(withAccessToken);
}

export function getInnsynUrl(): string {
    if (erLocalhost()) {
        return `http://localhost:3000/${INNSYN_CONTEXT_PATH}/`; // Endre port så det passer med porten sosialhjelp-innsyn kjører på lokalt hos deg
    }

    return `${window.location.origin}/${INNSYN_CONTEXT_PATH}/`;
}

export function getAbsoluteApiUrl(withAccessToken?: boolean) {
    return getAbsoluteApiUrlRegex(window.location.pathname, withAccessToken);
}

export function getAbsoluteApiUrlRegex(pathname: string, withAccessToken?: boolean) {
    return withAccessToken
        ? pathname.replace(/^(.+sosialhjelp\/)(.+)$/, "$1login-api/soknad-api/")
        : pathname.replace(/^(.+sosialhjelp\/soknad)(.+)$/, "$1-api/");
}

export function getAbsoluteApiUrlForMockAlt(withAccessToken?: boolean) {
    return getAbsoluteApiUrlRegexForMockAlt(window.location.pathname, withAccessToken);
}

export function getAbsoluteApiUrlRegexForMockAlt(pathname: string, withAccessToken?: boolean) {
    return withAccessToken
        ? pathname.replace(/^(.+sosialhjelp\/)(.+)$/, "$1mock-alt-api/login-api/sosialhjelp/soknad-api/")
        : pathname.replace(/^(.+sosialhjelp\/soknad)(.+)$/, "$1-api/");
}

function determineCredentialsParameter() {
    return window.location.origin.indexOf("nais.oera") || erLocalhost() ? "include" : "same-origin";
}

function getRedirectOrigin() {
    /* Vi endrer preprod-url til www-q*.dev.nav.no (pga naisdevice).
     * Men den gamle URL-en (www-q*.nav.no) vil bli benyttet en stund av kommuner.
     * Loginservice kan kun sette cookies på apper som kjører på samme domene.
     * Vi lar derfor loginservice redirecte til den nye ingressen. */

    const currentOrigin = window.location.origin;
    if (erQGammelVersjon()) {
        return currentOrigin.replace("nav.no", "dev.nav.no");
    }
    return window.location.origin;
}

export function getRedirectPath(): string {
    const redirectOrigin = getRedirectOrigin();
    const gotoParameter = "?goto=" + getGotoPathname();
    const redirectPath = redirectOrigin + getRedirectPathname() + gotoParameter;
    return "redirect=" + redirectPath;
}

export function getGotoPathname(): string {
    const gotoFromLink = getGotoParameterIfPathAlreadyIsLink();
    return gotoFromLink ? gotoFromLink : window.location.pathname;
}

function getGotoParameterIfPathAlreadyIsLink(): string | undefined {
    if (window.location.pathname === getRedirectPathname()) {
        return parseGotoValueFromSearchParameters(window.location.search);
    }
    return undefined;
}

export function parseGotoValueFromSearchParameters(searchParameters: string): string {
    const afterGoto = searchParameters.split("goto=")[1];
    return afterGoto ? afterGoto.split("&login_id")[0] : afterGoto; // Fjerne login_id dersom strengen bak goto= er definert.
}

export function downloadAttachedFile(urlPath: string): void {
    const filUrl = `${getApiBaseUrl()}${urlPath}`;
    window.open(filUrl);
}

export const MED_CREDENTIALS: RequestInit = {
    credentials: determineCredentialsParameter(),
};

enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

const getHeaders = (): Headers => {
    //let path = window.location.href.split("/");
    //let behandlingsId = path[path.length-2];
    const headersRecord: Record<string, string> = {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
        accept: "application/json, text/plain, */*",
    };
    return new Headers(headersRecord);
};

export enum HttpStatus {
    UNAUTHORIZED = "unauthorized",
    UNAUTHORIZED_LOOP_ERROR = "unauthorized_loop_error",
    SERVICE_UNAVAILABLE = "Service Unavailable",
}

export const serverRequest = <T>(
    method: string,
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
                            .catch((reason: any) => reject(reason));
                    }, 100 * (7 - retries));
                } else {
                    verifyStatusSuccessOrRedirect(response);
                    const jsonResponse = toJson<T>(response);
                    resolve(jsonResponse);
                }
            })
            .catch((reason: any) => reject(reason));
    });
};

export function fetchToJson<T>(urlPath: string, withAccessToken?: boolean) {
    return serverRequest<T>(RequestMethod.GET, urlPath, "", withAccessToken);
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
        credentials: determineCredentialsParameter(),
    };
    return fetch(getApiBaseUrl() + urlPath, OPTIONS).then((response: Response) => {
        verifyStatusSuccessOrRedirect(response);
        return response.text();
    });
}

export function fetchOppsummering(urlPath: string) {
    const OPTIONS: RequestInit = {
        headers: new Headers({accept: "application/vnd.oppsummering+html"}),
        method: "GET",
        credentials: determineCredentialsParameter(),
    };
    return fetch(getApiBaseUrl(false) + urlPath, OPTIONS).then((response: Response) => {
        verifyStatusSuccessOrRedirect(response);
        return response.text();
    });
}

export function fetchKvittering(urlPath: string) {
    //let path = window.location.href.split("/");
    //let behandlingsId = path[path.length-2];
    const OPTIONS: RequestInit = {
        headers: new Headers({
            accept: "application/vnd.kvitteringforinnsendtsoknad+json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
        }),
        method: "GET",
        credentials: determineCredentialsParameter(),
    };
    return fetch(getApiBaseUrl() + urlPath, OPTIONS).then((response: Response) => {
        verifyStatusSuccessOrRedirect(response);
        return response.json();
    });
}

// FIXME: KANSKJE JEG KAN BRUKE DENNE SENRE.
// export const getJsonOrRedirectIfUnauthorizedAndThrowError = (response: Response) => {
//     verifyStatusSuccessOrRedirect(response);
//     return response.json();
// };

let generateUploadOptions = function (formData: FormData, method: string) {
    //let path = window.location.href.split("/");
    //let behandlingsId = path[path.length-2];
    const UPLOAD_OPTIONS: RequestInit = {
        headers: new Headers({
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
            accept: "application/json, text/plain, */*",
        }),
        method: method,
        credentials: determineCredentialsParameter(),
        body: formData,
    };
    return UPLOAD_OPTIONS;
};

export function fetchUpload(urlPath: string, formData: FormData) {
    return fetch(getApiBaseUrl() + urlPath, generateUploadOptions(formData, "POST")).then((response) => {
        verifyStatusSuccessOrRedirect(response);
        return toJson(response);
    });
}

export function fetchUploadIgnoreErrors(urlPath: string, formData: FormData, method: string) {
    return fetch(getApiBaseUrl() + urlPath, generateUploadOptions(formData, method)).then(toJson);
}

export function toJson<T>(response: Response): Promise<T> {
    if (response.status === 204) {
        return response.text() as Promise<any>;
    }
    return response.json();
}

function verifyStatusSuccessOrRedirect(response: Response): number {
    if (response.status === 401) {
        response.json().then((r) => {
            if (window.location.search.split("login_id=")[1] !== r.id) {
                const queryDivider = r.loginUrl.includes("?") ? "&" : "?";
                window.location.href = r.loginUrl + queryDivider + getRedirectPath() + "%26login_id=" + r.id;
            } else {
                logError(
                    "Fetch ga 401-error-id selv om kallet ble sendt fra URL med samme login_id (" +
                        r.id +
                        "). Dette kan komme av en påloggingsloop (UNAUTHORIZED_LOOP_ERROR)."
                );
            }
        });
        throw new Error(HttpStatus.UNAUTHORIZED);
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
    if (feilKode.match(/Unsupp?orted Media Type/i)) {
        internFeilKode = REST_FEIL.FEIL_FILTPYE;
    }
    return internFeilKode;
}
