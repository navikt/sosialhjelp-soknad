import {
	FaktaActionTypeKeys,
	FaktaActionTypes,
	Faktum,
	FaktumActionTypeKeys,
	FaktumValueType,
	SoknadDispatch
} from "./faktaTypes";
import { fetchPut, fetchToJson } from "../../digisos/redux/rest-utils";

export function setFaktumVerdi(faktum: Faktum, value: FaktumValueType) {
	return (dispatch: SoknadDispatch<FaktaActionTypes>) => {
		const nyttFaktum = Object.assign(faktum);
		nyttFaktum.value = value;
		dispatch({ type: FaktumActionTypeKeys.OPPDATER_FAKTUM });
		fetchPut("fakta/" + nyttFaktum.faktumId, JSON.stringify(nyttFaktum))
			.then(response => {
				dispatch({
					type: FaktumActionTypeKeys.OPPDATERT_FAKTUM,
					faktum: nyttFaktum
				});
			})
			.catch(reason => {
				dispatch({ type: FaktumActionTypeKeys.FEILET, feilmelding: reason });
			});
	};
}

export function hentFakta(
	brukerBehandlingId: string,
	dispatch: SoknadDispatch<FaktaActionTypes>
) {
	dispatch({ type: FaktaActionTypeKeys.PENDING });
	return fetchToJson("soknader/" + brukerBehandlingId + "/fakta")
		.then((faktaResponse: Faktum[]) => {
			dispatch({ type: FaktaActionTypeKeys.SET_FAKTA, fakta: faktaResponse });
		})
		.catch(reason => {
			dispatch({
				type: FaktaActionTypeKeys.SET_SERVER_FEIL,
				feilmelding: reason
			});
		});
}
