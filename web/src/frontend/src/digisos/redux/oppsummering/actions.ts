import { Action, Dispatch } from "redux";
import { ActionTypeKeys, SetOppsummering } from "./types";
import { fetchHtml } from "../rest-utils";

export type ActionTypes = SetOppsummering;

export function hentOppsummering(id: string) {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionTypeKeys.PENDING });
		fetchHtml("soknader/" + id + "/oppsummering")
			.then(response => {
				dispatch({
					type: ActionTypeKeys.SET_OPPSUMMERING,
					oppsummering: response
				});
			})
			.catch(reason => {
				dispatch({ type: ActionTypeKeys.FEILET, feilmelding: reason });
			});
	};
}
