import {Reducer, ValideringActionTypeKeys, Valideringsfeil} from "./reduxTypes";
import { ValideringActionTypes} from "./valideringActionTypes";

export interface ValideringState {
	feil: Valideringsfeil[];
	visValideringsfeil: boolean;
}

const defaultState: ValideringState = {
	feil: [],
	visValideringsfeil: false,
};


const valideringReducer: Reducer<ValideringState, ValideringActionTypes> = (
	state = defaultState,
	action
): ValideringState => {
	switch (action.type) {
		case ValideringActionTypeKeys.VIS_VALIDERINGSFEIL_PANEL:
			return {
				...state,
				visValideringsfeil: true
			};
		case ValideringActionTypeKeys.SKJUL_VALIDERINGSFEIL_PANEL:
			return {
				...state,
				visValideringsfeil: false
			};
		case ValideringActionTypeKeys.SET_VALIDERINGSFEIL:{
			const {feil} = state;
			const {valideringsfeil} = action;
			if (action.valideringsfeil && valideringsfeil.faktumKey && valideringsfeil.faktumKey !== "" && valideringsfeil.valideringsfeilType){
				feil.push(action.valideringsfeil);
			}
			return {
				...state,
				feil,
			};
		}
		case ValideringActionTypeKeys.CLEAR_VALIDERINGSFEIL:{
			const feil: Valideringsfeil[] = state.feil;
			const feilUpdated: Valideringsfeil[] = feil.filter((f) => {
				return f.faktumKey !== action.faktumKey;
			});
			return {
				...state,
				feil: feilUpdated,
			};
		}
		case ValideringActionTypeKeys.CLEAR_ALL_VALIDERINGSFEIL:{
			return {
				...state,
				feil: [],
			}
		}
		default:
			return state;
	}
};

export default valideringReducer;
