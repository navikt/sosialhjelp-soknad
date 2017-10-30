import { Action, Dispatch } from "redux";
import { fetchOppsummering } from "../utils/rest-utils";
import {
	OppsummeringActionTypeKeys,
	SetOppsummering,
	HentOppsummering,
	SetServerFeil,
	BekreftOppsummering,
	SetVisBekreftMangler
} from "./oppsummeringTypes";
import { SoknadAppState } from "./reduxTypes";

export type OppsummeringActionTypes =
	| SetOppsummering
	| BekreftOppsummering
	| HentOppsummering
	| SetServerFeil
	| SetVisBekreftMangler;

export function bekreftOppsummering(bekreftet: boolean) {
	return {
		type: OppsummeringActionTypeKeys.BEKREFT_OPPSUMMERING,
		bekreftet
	};
}

export function setVisBekreftMangler(visBekreftMangler: boolean) {
	return {
		type: OppsummeringActionTypeKeys.SET_VIS_BEKREFT_MANGLER,
		visBekreftMangler
	};
}

export function hentOppsummering() {
	return (dispatch: Dispatch<Action>, getState: () => SoknadAppState) => {
		dispatch({ type: OppsummeringActionTypeKeys.PENDING });
		fetchOppsummering("soknader/" + getState().soknad.data.brukerBehandlingId)
			.then(response => {
				dispatch({
					type: OppsummeringActionTypeKeys.SET_OPPSUMMERING,
					oppsummering: response
				});
			})
			.catch(reason => {
				dispatch({
					type: OppsummeringActionTypeKeys.FEILET,
					feilmelding: reason
				});
			});
	};
}
