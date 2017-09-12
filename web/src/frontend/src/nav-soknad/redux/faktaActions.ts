import { Action, Dispatch } from "redux";
import {
	FaktaActionTypeKeys,
	SetFaktumVerdiAction,
	SetFaktaAction,
	SetFaktumValideringFeilAction,
	SetFaktumValideringOkAction,
	RegisterFaktumValidering,
	UnregisterFaktumValidering,
	FaktumValidering,
	FaktumValueType, FaktumActionTypeKeys, Faktum
} from "./faktaTypes";
import { fetchPut } from "../../digisos/redux/rest-utils";
import { Feil } from "nav-frontend-skjema";

export type ActionTypes =
	| SetFaktumVerdiAction
	| SetFaktaAction
	| SetFaktumValideringFeilAction
	| SetFaktumValideringOkAction
	| RegisterFaktumValidering
	| UnregisterFaktumValidering;

export function setFaktumVerdi(
	faktum: Faktum,
	value: FaktumValueType
) {
	return (dispatch: Dispatch<Action>) => {
		const nyttFaktum = Object.assign(faktum);
		nyttFaktum.value = value;
		dispatch({ type: FaktumActionTypeKeys.PENDING });
		fetchPut("fakta/" + nyttFaktum.faktumId, JSON.stringify(nyttFaktum))
			.then(response => {
				dispatch( {
					type: FaktumActionTypeKeys.SET_FAKTUM,
					faktum: nyttFaktum
				});
				dispatch({type: FaktumActionTypeKeys.OK});
			})
			.catch(reason => {
				dispatch({ type: FaktumActionTypeKeys.FEILET, feilmelding: reason });
			});
	};
}

export function setFakta(fakta: any) {
	return {
		type: FaktaActionTypeKeys.SET_FAKTA,
		fakta
	};
}

export function setFaktumValideringsFeil(
	faktumKey: string,
	element: HTMLElement,
	feil: Feil
) {
	return {
		type: FaktumActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL,
		faktumKey,
		element,
		feil
	};
}
export function setFaktumValideringOk(faktumKey: string) {
	return {
		type: FaktumActionTypeKeys.CLEAR_FAKTUM_VALIDERINGSFEIL,
		faktumKey
	};
}

export function registerFaktumValidering(faktumValidering: FaktumValidering) {
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
