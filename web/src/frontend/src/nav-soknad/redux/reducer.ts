import { Faktum } from "../soknadTypes";

export type FaktumMap = Map<string, any>;
import { Reducer } from "./types";
import { ActionTypeKeys } from "./types";
// import { ActionTypes } from "./actions";

export interface FaktumStoreState {
	faktumStore: FaktumState;
}

export interface FaktumState {
	fakta: Faktum[];
	faktumTekst?: any;
}

// export interface Faktum {
// 	key: string;
// 	value: any;
// 	type: string;
// }

export interface FaktumComponentProps {
	fakta: Faktum[];
}

const initialState: FaktumState = {
	fakta: []
};

function updateFaktumVerdi(fakta: Faktum[], faktum: Faktum) {
	const index: number = fakta.findIndex(item => {
		return item.faktumId === faktum.faktumId;
	});
	if (index === -1) {
		console.error("Manglende faktum " + JSON.stringify(faktum, null, 4));
		return [...fakta];
	} else {
		return [
			...fakta.slice(0, index),
			faktum,
			...fakta.slice(index + 1)
		];
	}
}

// const faktumReducer: Reducer<FaktumState, ActionTypes> =
const faktumReducer: Reducer<FaktumState, any> = (
	state = initialState,
	action
): FaktumState => {
	switch (action.type) {
		case ActionTypeKeys.SET_FAKTUM_VERDI:
			return {
				...state,
				fakta: updateFaktumVerdi(state.fakta, action.faktum)
			};
		case ActionTypeKeys.RESET_FAKTUM_VERDI:
			return {
				...state,
				fakta: state.fakta.filter(faktum => faktum.key !== action.faktumKey)
			};
		case ActionTypeKeys.SET_FAKTA:
			return {
				...state,
				fakta: action.fakta
			};
		default:
			return state;
	}
};

export default faktumReducer;
