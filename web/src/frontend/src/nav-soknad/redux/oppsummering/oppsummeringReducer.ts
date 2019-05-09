import {Reducer} from "../reduxTypes";
import {REST_STATUS} from "../../types";
import {
    ErSystemdataEndret,
    Oppsummering,
    OppsummeringActionTypeKeys,
    OppsummeringActionTypes,
    OppsummeringBolk
} from "./oppsummeringTypes";

export interface OppsummeringState {
    oppsummering?: Oppsummering;
    bekreftet?: boolean;
    visBekreftMangler?: boolean;
    restStatus: REST_STATUS;
    visBekreftInfo?: boolean;
    erSystemdataEndret: ErSystemdataEndret;
}

const defaultState: OppsummeringState = {
    oppsummering: undefined,
    bekreftet: false,
    visBekreftMangler: false,
    restStatus: REST_STATUS.INITIALISERT,
    erSystemdataEndret: ErSystemdataEndret.NOT_ASKED
};

const hentUtBody = (html: string): string => {
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
    el.innerHTML = body;
    let signatur = "";
    let bolker: OppsummeringBolk[] = [];
    try {
        signatur = el.querySelector(".js-signatur").innerHTML;
        const htmlBolker = Array.from(el.querySelectorAll(".js-bolk"));
        bolker = htmlBolker
            .map(htmlBolk => {
                return {
                    tittel: htmlBolk.querySelector("h2").innerText,
                    html: htmlBolk.innerHTML.substr(htmlBolk.innerHTML.indexOf("</h2>") + 5)
                };
            })
            .filter(b => b.tittel !== "");
    } catch (error) {
        console.error("Feil ved uthenting av informasjon fra DOM tre :", error.toString()); // tslint:disable-line
    }

    return {
        signatur,
        bolker
    };
};

const OppsummeringReducer: Reducer<OppsummeringState,
    OppsummeringActionTypes> = (state = defaultState, action): OppsummeringState => {
    switch (action.type) {
        case OppsummeringActionTypeKeys.HENT_OPPSUMMERING:
            return {
                ...state,
                restStatus: REST_STATUS.PENDING
            };
        case OppsummeringActionTypeKeys.SET_OPPSUMMERING:
            return {
                ...state,
                oppsummering: hentUtOppsummering(action.oppsummering),
                restStatus: REST_STATUS.OK
            };
        case OppsummeringActionTypeKeys.FEILET:
            return {
                ...state,
                oppsummering: null,
                restStatus: REST_STATUS.FEILET
            };
        case OppsummeringActionTypeKeys.BEKREFT_OPPSUMMERING:
            return {
                ...state,
                bekreftet: !state.bekreftet,
                visBekreftMangler: false
            };
        case OppsummeringActionTypeKeys.SET_VIS_BEKREFT_MANGLER:
            return {
                ...state,
                visBekreftMangler: action.visBekreftMangler
            };
        case OppsummeringActionTypeKeys.SET_ER_SYSTEMDATA_ENDRET: {
            console.warn("Er systemdata endret:");
            console.warn(action.erSystemdataEndret);
            return {
                ...state,
                erSystemdataEndret: action.erSystemdataEndret ? ErSystemdataEndret.YES : ErSystemdataEndret.NO
            }
        }
        default:
            return state;
    }
};

export default OppsummeringReducer;
