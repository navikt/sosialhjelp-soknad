import { fetchToJson } from "../../../nav-soknad/utils/rest-utils";
import { SoknadDispatch } from "../../../nav-soknad/redux/reduxTypes";
import { ActionTypeKeys, MiljovariablerActionTypes } from "./miljovariablerTypes";
import NavLogger from "../../../nav-soknad/utils/navLogger";

const { OK, PENDING, FEILET } = ActionTypeKeys;
const Logger = new NavLogger();

export function hentMiljovariabler() {
	const urlPath = "informasjon/miljovariabler";
	return (dispatch: SoknadDispatch<MiljovariablerActionTypes>) => {
		if (PENDING) {
			dispatch({ type: PENDING });
		}
		return fetchToJson(urlPath)
			.then(response => {
				dispatch({ type: OK, data: response });
			})
			.catch(reason => {
				Logger.error("Problemer med å lese miljøvariabler fra " + urlPath + " : " + reason);
				dispatch({ type: FEILET, feilmelding: reason });
			});
	};
}
