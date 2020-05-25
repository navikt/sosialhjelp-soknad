import {
    OppsummeringActionTypeKeys,
    Oppsummering,
    OppsummeringBolk,
    OppsummeringActionTypes,
    NyOppsummeringBolk,
} from "./oppsummeringTypes";
import {REST_STATUS} from "../soknad/soknadTypes";

export interface OppsummeringState {
    oppsummering: Oppsummering | null;
    nyOppsummering: NyOppsummeringBolk[];
    bekreftet?: boolean;
    visBekreftMangler?: boolean;
    restStatus: REST_STATUS;
    visBekreftInfo?: boolean;
}

const defaultState: OppsummeringState = {
    oppsummering: null,
    nyOppsummering: [],
    bekreftet: false,
    visBekreftMangler: false,
    restStatus: REST_STATUS.INITIALISERT,
};

const hentUtBody = (html: string): string | null => {
    if (!html) {
        return null;
    }
    const idx1 = html.indexOf("<body>") + 6;
    const idx2 = html.indexOf("</body>");
    return html.substring(idx1, idx2);
};

const hentUtOppsummering = (html: string): Oppsummering => {
    const body = hentUtBody(html);
    const el = document.createElement("div");
    el.innerHTML = body ? body : "";
    let signatur = "";
    let bolker: OppsummeringBolk[] = [];
    try {
        const signatur_ = el.querySelector(".js-signatur");
        signatur = signatur_ ? signatur_.innerHTML : "";
        const htmlBolker = Array.from(el.querySelectorAll(".js-bolk"));
        bolker = htmlBolker
            .map((htmlBolk) => {
                const tittel_ = htmlBolk.querySelector("h2");
                return {
                    tittel: tittel_ ? tittel_.innerText : "",
                    html: htmlBolk.innerHTML.substr(htmlBolk.innerHTML.indexOf("</h2>") + 5),
                };
            })
            .filter((b) => b.tittel !== "");
    } catch (error) {
        console.error("Feil ved uthenting av informasjon fra DOM tre :", error.toString()); // tslint:disable-line
    }

    return {
        signatur,
        bolker,
    };
};

export default (state: OppsummeringState = defaultState, action: OppsummeringActionTypes): OppsummeringState => {
    switch (action.type) {
        case OppsummeringActionTypeKeys.HENT_OPPSUMMERING:
            return {
                ...state,
                restStatus: REST_STATUS.PENDING,
            };
        case OppsummeringActionTypeKeys.SET_OPPSUMMERING:
            return {
                ...state,
                oppsummering: hentUtOppsummering(action.oppsummering),
                restStatus: REST_STATUS.OK,
            };
        case OppsummeringActionTypeKeys.FEILET:
            return {
                ...state,
                oppsummering: null,
                restStatus: REST_STATUS.SERVER_ERROR,
            };
        case OppsummeringActionTypeKeys.BEKREFT_OPPSUMMERING:
            return {
                ...state,
                bekreftet: !state.bekreftet,
                visBekreftMangler: false,
            };
        case OppsummeringActionTypeKeys.SET_VIS_BEKREFT_MANGLER:
            return {
                ...state,
                visBekreftMangler: action.visBekreftMangler,
            };
        case OppsummeringActionTypeKeys.HENT_NY_OPPSUMMERING:
            return {
                ...state,
                restStatus: REST_STATUS.PENDING,
            };
        case OppsummeringActionTypeKeys.SET_NY_OPPSUMMERING:
            return {
                ...state,
                nyOppsummering: action.response.steg,
                restStatus: REST_STATUS.OK,
            };
        default:
            return state;
    }
};
