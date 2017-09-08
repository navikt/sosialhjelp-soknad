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
	faktumKey: string,
	value: FaktumValueType,
	fakta: any
) {
	const index: number = fakta.findIndex((item: Faktum) => {
		return item.key === faktumKey;
	});
	const faktum: Faktum = fakta[index];
	faktum.value = value;
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: "faktum/PENDING" });
		fetchPut("fakta/" + faktum.faktumId, JSON.stringify(faktum))
			.then(response => {
				dispatch( {
						type: ActionTypeKeys.SET_FAKTUM_VERDI,
						faktumKey,
						value});
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
