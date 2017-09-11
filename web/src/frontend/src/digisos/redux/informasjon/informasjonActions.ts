import { Dispatch } from "react-redux";
import { Action } from "redux";
import { ActionTypeKeys } from "./informasjonTypes";
import { fetchToJson } from "../rest-utils";

const { OK, PENDING, FEILET } = ActionTypeKeys;

function leggNoklerPaaLedetekster(dispatch: Dispatch<Action>, data: object) {
	const meldinger = {};
	Object.keys(data).forEach(key => {
		meldinger[key] = `${data[key]} [${key}]`;
	});
	return dispatch({ type: OK, data: meldinger });
}

export function hentLedetekster(visNokler: boolean) {
	return (dispatch: Dispatch<Action>) => {
		if (PENDING) {
			dispatch({ type: PENDING });
		}
		return fetchToJson("informasjon/tekster?sprak=nb_NO&type=soknadsosialhjelp")
			.then(response => {
				visNokler
					? leggNoklerPaaLedetekster(dispatch, response)
					: dispatch({ type: OK, data: response });
			})
			.catch(reason => {
				dispatch({ type: FEILET, feilmelding: reason });
			});
	};
}
