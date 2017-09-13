import { Action, Dispatch } from "redux";
import {
	FaktaActionTypeKeys,
	SetFaktumVerdiAction,
	SetFaktaAction,
	SetFaktumValideringFeilAction,
	SetFaktumValideringOkAction,
	RegisterFaktumValidering,
	UnregisterFaktumValidering,
	FaktumValueType,
	FaktumActionTypeKeys,
	Faktum
} from "./faktaTypes";
import { FaktumValideringsregler, Valideringsfeil } from "../validering/types";
import { fetchPut, fetchToJson } from "../../digisos/redux/rest-utils";

export type ActionTypes =
	| SetFaktumVerdiAction
	| SetFaktaAction
	| SetFaktumValideringFeilAction
	| SetFaktumValideringOkAction
	| RegisterFaktumValidering
	| UnregisterFaktumValidering;

export function setFaktumVerdi(faktum: Faktum, value: FaktumValueType) {
	return (dispatch: Dispatch<Action>) => {
		const nyttFaktum = Object.assign(faktum);
		nyttFaktum.value = value;
		dispatch({ type: FaktumActionTypeKeys.PENDING });
		fetchPut("fakta/" + nyttFaktum.faktumId, JSON.stringify(nyttFaktum))
			.then(response => {
				dispatch({
					type: FaktumActionTypeKeys.SET_FAKTUM,
					faktum: nyttFaktum
				});
				dispatch({ type: FaktumActionTypeKeys.OK });
			})
			.catch(reason => {
				dispatch({ type: FaktumActionTypeKeys.FEILET, feilmelding: reason });
			});
	};
}

export function hentFakta(brukerBehandlingId: string, dispatch: Dispatch<Action>) {
	dispatch({ type: FaktaActionTypeKeys.PENDING });
	return fetchToJson("soknader/" + brukerBehandlingId + "/fakta")
		.then((faktaResponse => dispatch({type: FaktaActionTypeKeys.SET_FAKTA, fakta: faktaResponse})))
		.catch(reason => {
			dispatch({ type: FaktaActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
	});
}

export function setFakta(fakta: any): ActionTypes {
	return {
		type: FaktaActionTypeKeys.SET_FAKTA,
		fakta
	};
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

export function registerFaktumValidering(
	faktumValidering: FaktumValideringsregler
) {
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
