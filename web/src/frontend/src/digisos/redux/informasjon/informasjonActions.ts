import { ActionTypeKeys, InformasjonActionTypes } from "./informasjonTypes";
import { fetchToJson } from "../rest-utils";
import { SoknadDispatch } from "../../../nav-soknad/redux/faktaTypes";

const { OK, PENDING, FEILET } = ActionTypeKeys;

function leggNoklerPaaLedetekster(dispatch: SoknadDispatch<InformasjonActionTypes>, data: object) {
	const meldinger = {};
	Object.keys(data).forEach(key => {
		meldinger[key] = `${data[key]} [${key}]`;
	});
	return dispatch({ type: OK, data: meldinger });
}

export function hentLedetekster(visNokler: boolean) {
	return (dispatch: SoknadDispatch<InformasjonActionTypes>) => {
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
