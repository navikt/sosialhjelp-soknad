import { Action, Dispatch } from "redux";
import { OppsummeringActionTypeKeys, SetOppsummering } from "./oppsummeringTypes";
import { fetchHtml } from "../rest-utils";

export type OppsummeringActionTypes = SetOppsummering;

export function hentOppsummering(id: string) {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: OppsummeringActionTypeKeys.PENDING });
		fetchHtml("soknader/" + id + "/oppsummering")
			.then(response => {
				dispatch({
					type: OppsummeringActionTypeKeys.SET_OPPSUMMERING,
					oppsummering: response
				});
			})
			.catch(reason => {
				dispatch({ type: OppsummeringActionTypeKeys.FEILET, feilmelding: reason });
			});
	};
}
