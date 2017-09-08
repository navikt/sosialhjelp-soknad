// import { Action, Dispatch } from "redux";
import {
	ActionTypeKeys,
	SetFaktumVerdiAction,
	SetFaktaAction,
	ResetFaktumVerdiAction,
	FaktumValueType
} from "./types";
// import { fetchPut } from "../../digisos/redux/rest-utils";

export type ActionTypes =
	| SetFaktumVerdiAction
	| ResetFaktumVerdiAction
	| SetFaktaAction;

export function setFaktumVerdi(
	faktumKey: string,
	value: FaktumValueType,
	properties?: any
) {
	return {
		type: ActionTypeKeys.SET_FAKTUM_VERDI,
		faktumKey,
		value,
		properties
	};
}

export function lagreFaktum(
	faktumKey: string,
	value: FaktumValueType,
	fakta: any
) {
	debugger;
	return {
		type: ActionTypeKeys.SET_FAKTUM_VERDI,
		faktumKey,
		value
	};
	// return (dispatch: Dispatch<Action>) => {
	// 	dispatch({ type: ActionTypeKeys.PENDING });
	// 	const payload = JSON.stringify({ soknadType: "NAV DIGISOS" });
	// 	fetchPut("soknader", payload)
	// 		.then(response => {
	// 			const key = "brukerBehandlingId";
	// 			const brukerBehandlingId = response[key];
	// 			dispatch({
	// 				type: ActionTypeKeys.SET_BRUKERBEHANDLING_ID,
	// 				brukerBehandlingId
	// 			});
	//
	// 		})
	// 		.catch(reason => {
	// 			dispatch({ type: ActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
	// 		});
	// };
}


export function setFakta(fakta: any) {
	return {
		type: ActionTypeKeys.SET_FAKTA,
		fakta
	};
}
