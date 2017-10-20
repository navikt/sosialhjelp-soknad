import { REST_STATUS, Faktum } from "../types";
import { FaktumActionTypeKeys, FaktaActionTypeKeys } from "./faktaActionTypes";
import {
	updateFaktumMedLagretVerdi,
	updateFaktumStateVerdi,
	updateFaktumLagretVerdi
} from "./faktaUtils";
import { Reducer } from "./reduxTypes";

export interface FaktumState {
	restStatus: string;
	progresjonPending: boolean;
	data: Faktum[];
}

export interface FaktumComponentProps {
	fakta: Faktum[];
}

const initialState: FaktumState = {
	restStatus: "",
	progresjonPending: false,

	data: []
};

export type FaktumActionTypes =
	| LagreFaktum
	| LagretFaktum
	| OppdaterFaktumVerdi
	| OpprettFaktum
	| OpprettetFaktum
	| SlettFaktum
	| SlettetFaktum
	| SetFaktaAction
	| SetFaktumFailedAction
	| SetFaktumIgnorert
	| ResetFaktaAction;

interface ResetFaktaAction {
	type: FaktaActionTypeKeys.RESET_FAKTA;
}

interface OppdaterFaktumVerdi {
	type: FaktumActionTypeKeys.OPPDATER_FAKTUM;
	faktum: Faktum;
}

interface LagreFaktum {
	type: FaktumActionTypeKeys.LAGRE_FAKTUM;
	faktum: Faktum;
}

interface LagretFaktum {
	type: FaktumActionTypeKeys.LAGRET_FAKTUM;
	faktum: Faktum;
}

interface OpprettFaktum {
	type: FaktumActionTypeKeys.OPPRETT_FAKTUM;
}

interface OpprettetFaktum {
	type: FaktumActionTypeKeys.OPPRETTET_FAKTUM;
	faktum: Faktum;
}

interface SlettFaktum {
	type: FaktumActionTypeKeys.SLETT_FAKTUM;
	faktumId: number;
}

interface SlettetFaktum {
	type: FaktumActionTypeKeys.SLETTET_FAKTUM;
}

interface SetFaktaAction {
	type: FaktaActionTypeKeys.SET_FAKTA;
	fakta: Faktum[];
}

interface SetFaktumFailedAction {
	type: FaktumActionTypeKeys.FEILET;
	feilmelding: string;
}

interface SetFaktumIgnorert {
	type: FaktumActionTypeKeys.IGNORER_FAKTUM;
	faktum: Faktum;
	ignorert: boolean;
}

const FaktumReducer: Reducer<FaktumState, FaktumActionTypes> = (
	state = initialState,
	action
): FaktumState => {
	switch (action.type) {
		case FaktumActionTypeKeys.OPPDATER_FAKTUM:
			return {
				...state,
				data: updateFaktumStateVerdi(state.data, action.faktum)
			};
		case FaktumActionTypeKeys.LAGRE_FAKTUM:
			return {
				...state,
				restStatus: REST_STATUS.PENDING,
				data: updateFaktumStateVerdi(state.data, action.faktum),
				progresjonPending: action.faktum.key === "progresjon"
			};
		case FaktumActionTypeKeys.LAGRET_FAKTUM:
			return {
				...state,
				restStatus: REST_STATUS.OK,
				data: updateFaktumLagretVerdi(state.data, action.faktum),
				progresjonPending: false
			};
		case FaktumActionTypeKeys.OPPRETT_FAKTUM: {
			return { ...state, restStatus: REST_STATUS.PENDING };
		}
		case FaktumActionTypeKeys.OPPRETTET_FAKTUM: {
			return {
				...state,
				restStatus: REST_STATUS.OK,
				data: [...state.data, updateFaktumMedLagretVerdi(action.faktum)]
			};
		}
		case FaktumActionTypeKeys.IGNORER_FAKTUM: {
			return {
				...state,
				data: updateFaktumStateVerdi(state.data, {
					...action.faktum,
					ignorert: action.ignorert
				})
			};
		}
		case FaktumActionTypeKeys.SLETTET_FAKTUM: {
			return { ...state, restStatus: REST_STATUS.OK };
		}
		case FaktumActionTypeKeys.SLETT_FAKTUM: {
			return {
				...state,
				restStatus: REST_STATUS.PENDING,
				data: state.data.filter(faktum => faktum.faktumId !== action.faktumId)
			};
		}
		case FaktaActionTypeKeys.RESET_FAKTA:
			return {
				...state,
				...initialState
			};
		case FaktaActionTypeKeys.SET_FAKTA:
			return {
				...state,
				data: action.fakta,
				restStatus: REST_STATUS.OK
			};
		default:
			return state;
	}
};

export default FaktumReducer;
