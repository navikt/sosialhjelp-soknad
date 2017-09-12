import { Action, Dispatch } from "redux";
import {
	FaktaActionTypeKeys,
	SetFaktumVerdiAction,
	SetFaktaAction,
	FaktumValueType,
	FaktumActionTypeKeys,
	Faktum
} from "./faktaTypes";
import { fetchPut } from "../../digisos/redux/rest-utils";

export type ActionTypes = SetFaktumVerdiAction | SetFaktaAction;

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

export function setFakta(fakta: any) {
	return {
		type: FaktaActionTypeKeys.SET_FAKTA,
		fakta
	};
}
