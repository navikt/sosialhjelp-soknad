import {redirectToLogin} from "../orval/soknad-api-axios";
import {logWarning} from "./loggerUtils";
import {baseURL} from "../config";

export const determineCredentialsParameter = () =>
    import.meta.env.REACT_APP_DIGISOS_ENV === "localhost" ? "include" : "same-origin";

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

                    setTimeout(
                        () => {
                            serverRequest(method, urlPath, body, withAccessToken, retries - 1)
                                .then((data: unknown) => resolve(data as T))
                                .catch(reject);
                        },
                        100 * (7 - retries)
                    );

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

export const getCookie = (name: string) =>
    Object.fromEntries(document.cookie.split(";").map((cookie) => cookie.trim().split("=")))[name] || null;

export enum REST_FEIL {
    SAMLET_VEDLEGG_STORRELSE_FOR_STOR = "vedlegg.opplasting.feil.samletStorrelseForStor",
    FOR_STOR = "vedlegg.opplasting.feil.forStor",
    FEIL_FILTYPE = "vedlegg.opplasting.feil.filType",
    KRYPTERT_FIL = "opplasting.feilmelding.pdf.kryptert",
    DUPLIKAT_FIL = "opplasting.feilmelding.duplikat",
    KONVERTERING_FEILET = "opplasting.feilmelding.konvertering",
    GENERELL_FEIL = "opplasting.feilmelding.generell",
    MULIG_VIRUS = "vedlegg.opplasting.feil.muligVirus",
}
