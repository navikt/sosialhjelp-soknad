import { fetchToJson } from "../../../nav-soknad/utils/rest-utils";
import { SoknadDispatch } from "../../../nav-soknad/redux/reduxTypes";
import {
	ActionTypeKeys,
	MiljovariablerActionTypes
} from "./miljovariablerTypes";

const { OK, PENDING, FEILET } = ActionTypeKeys;

export function hentMiljovariabler() {
	return (dispatch: SoknadDispatch<MiljovariablerActionTypes>) => {
		if (PENDING) {
			dispatch({ type: PENDING });
		}
		return fetchToJson("informasjon/miljovariabler")
			.then(response => {
				dispatch({ type: OK, data: response });
			})
			.catch(reason => {
				dispatch({ type: FEILET, feilmelding: reason });
			});
	};
}
