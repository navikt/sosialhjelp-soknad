import { Reducer } from "../../../nav-soknad/redux/reduxTypes";
import { REST_STATUS } from "../../../nav-soknad/types";
import {
	OppsummeringActionTypeKeys,
	Oppsummering,
	OppsummeringBolk
} from "./oppsummeringTypes";
import { OppsummeringActionTypes } from "./oppsummeringActions";

export interface OppsummeringState {
	oppsummering?: Oppsummering;
	bekreftet?: boolean;
	restStatus: REST_STATUS;
}

const defaultState: OppsummeringState = {
	oppsummering: undefined,
	bekreftet: false,
	restStatus: REST_STATUS.INITIALISERT
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
	const signatur = el.querySelector(".js-signatur").innerHTML;
	const htmlBolker = Array.from(el.querySelectorAll(".js-bolk"));
	const bolker: OppsummeringBolk[] = htmlBolker
		.map(htmlBolk => {
			return {
				tittel: htmlBolk.querySelector("h2").innerText,
				html: htmlBolk.innerHTML.substr(htmlBolk.innerHTML.indexOf("</h2>") + 5)
			};
		})
		.filter(b => b.tittel !== "");
	return {
		signatur,
		bolker
	};
};

const OppsummeringReducer: Reducer<
	OppsummeringState,
	OppsummeringActionTypes
> = (state = defaultState, action): OppsummeringState => {
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
		case OppsummeringActionTypeKeys.SET_SERVER_FEIL:
			return {
				...state,
				oppsummering: null,
				restStatus: REST_STATUS.FEILET
			};
		case OppsummeringActionTypeKeys.BEKREFT_OPPSUMMERING:
			return {
				...state,
				bekreftet: action.bekreftet
			};
		default:
			return state;
	}
};

export default OppsummeringReducer;
