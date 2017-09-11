import { Action, Dispatch } from "redux";
import {
	ActionTypeKeys,
	SetFaktumVerdiAction,
	SetFaktaAction,
	ResetFaktumVerdiAction,
	FaktumValueType
} from "./types";
import { Faktum } from "../soknadTypes";
import { fetchPut } from "../../digisos/redux/rest-utils";

export type ActionTypes =
	| SetFaktumVerdiAction
	| ResetFaktumVerdiAction
	| SetFaktaAction;

export function setFaktumVerdi(
	faktum: Faktum,
	value: FaktumValueType
) {
	return (dispatch: Dispatch<Action>) => {
		const nyttFaktum = Object.assign(faktum);
		nyttFaktum.value = value;
		dispatch({ type: "faktum/PENDING" });
		fetchPut("fakta/" + nyttFaktum.faktumId, JSON.stringify(nyttFaktum))
			.then(response => {
				dispatch( {
					type: ActionTypeKeys.SET_FAKTUM_VERDI,
					faktum: nyttFaktum
				});
			})
			.catch(reason => {
				dispatch({ type: ActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
			});
	};
}

export function setFakta(fakta: any) {
	return {
		type: ActionTypeKeys.SET_FAKTA,
		fakta
	};
}
