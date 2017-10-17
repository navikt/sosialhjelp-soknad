import { Action, Dispatch } from "redux";
import { fetchHtml } from "../../../nav-soknad/utils/rest-utils";
import {
	OppsummeringActionTypeKeys,
	SetOppsummering,
	HentOppsummering,
	SetServerFeil,
	BekreftOppsummering
} from "./oppsummeringTypes";
import { State } from "../reducers";

export type OppsummeringActionTypes =
	| SetOppsummering
	| BekreftOppsummering
	| HentOppsummering
	| SetServerFeil;

export function bekreftOppsummering(bekreftet: boolean) {
	return {
		type: OppsummeringActionTypeKeys.BEKREFT_OPPSUMMERING,
		bekreftet
	};
}

export function hentOppsummering() {
	return (dispatch: Dispatch<Action>, getState: () => State) => {
		dispatch({ type: OppsummeringActionTypeKeys.PENDING });
		fetchHtml("soknader/" + getState().soknad.data.brukerBehandlingId)
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
