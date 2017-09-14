import {
	FaktaActionTypeKeys,
	FaktaActionTypes,
	Faktum,
	FaktumActionTypeKeys,
	FaktumValueType,
	SoknadDispatch
} from "./faktaTypes";
import { FaktumValideringsregler, Valideringsfeil } from "../validering/types";
import { fetchPut, fetchToJson } from "../../digisos/redux/rest-utils";

export function setFaktumVerdi(faktum: Faktum, value: FaktumValueType) {
	return (dispatch: SoknadDispatch<FaktaActionTypes>) => {
		const nyttFaktum = Object.assign(faktum);
		nyttFaktum.value = value;
		dispatch({type: FaktumActionTypeKeys.OPPDATER_FAKTUM});
		fetchPut("fakta/" + nyttFaktum.faktumId, JSON.stringify(nyttFaktum))
			.then(response => {
				dispatch({
					type: FaktumActionTypeKeys.OPPDATERT_FAKTUM,
					faktum: nyttFaktum
				});
			})
			.catch(reason => {
				dispatch({type: FaktumActionTypeKeys.FEILET, feilmelding: reason});
			});
	};
}

export function hentFakta(brukerBehandlingId: string, dispatch: SoknadDispatch<FaktaActionTypes>) {
	dispatch({type: FaktaActionTypeKeys.PENDING});
	return fetchToJson("soknader/" + brukerBehandlingId + "/fakta")
		.then(((faktaResponse: Faktum []) => {
			dispatch({type: FaktaActionTypeKeys.SET_FAKTA, fakta: faktaResponse});
		}))
		.catch(reason => {
			dispatch({type: FaktaActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason});
		});
}

export function setFaktumValideringsfeil(valideringsfeil: Valideringsfeil[]) {
	return {
		type: FaktumActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL,
		valideringsfeil
	};
}

export function clearFaktumValideringsfeil() {
	return {
		type: FaktumActionTypeKeys.CLEAR_FAKTUM_VALIDERINGSFEIL
	};
}

export function registerFaktumValidering(faktumValidering: FaktumValideringsregler) {
	return {
		type: FaktumActionTypeKeys.REGISTER_FAKTUM_VALIDERING,
		faktumValidering
	};
}

export function unregisterFaktumValidering(faktumKey: string) {
	return {
		type: FaktumActionTypeKeys.UNREGISTER_FAKTUM_VALIDERING,
		faktumKey
	};
}
