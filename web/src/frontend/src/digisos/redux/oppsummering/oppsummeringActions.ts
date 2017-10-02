import { Action, Dispatch } from "redux";
import { fetchHtml } from "../../../nav-soknad/utils/rest-utils";
import {
	OppsummeringActionTypeKeys,
	SetOppsummering
} from "./oppsummeringTypes";
import { State } from "../reducers";

export type OppsummeringActionTypes = SetOppsummering;

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
