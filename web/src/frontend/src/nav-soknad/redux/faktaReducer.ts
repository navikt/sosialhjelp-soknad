import { REST_STATUS, Faktum } from "../types";
import { FaktumActionTypeKeys, FaktaActionTypeKeys } from "./faktaActionTypes";
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
	| OppdatertFaktumVerdi
	| OppdaterFaktumVerdi
	| OpprettFaktum
	| OpprettetFaktum
	| SlettFaktum
	| SlettetFaktum
	| SetFaktaAction
	| SetFaktumFailedAction
	| ResetFaktaAction;

interface ResetFaktaAction {
	type: FaktaActionTypeKeys.RESET_FAKTA;
}

interface OppdaterFaktumVerdi {
	type: FaktumActionTypeKeys.OPPDATER_FAKTUM;
	faktum: Faktum;
}

interface OppdatertFaktumVerdi {
	type: FaktumActionTypeKeys.OPPDATERT_FAKTUM;
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

const FaktumReducer: Reducer<FaktumState, FaktumActionTypes> = (
	state = initialState,
	action
): FaktumState => {
	switch (action.type) {
		case FaktumActionTypeKeys.OPPDATER_FAKTUM:
			return {
				...state,
				restStatus: REST_STATUS.PENDING,
				data: updateFaktumVerdi(state.data, action.faktum),
				progresjonPending: action.faktum.key === "progresjon"
			};
		case FaktumActionTypeKeys.OPPDATERT_FAKTUM:
			return {
				...state,
				restStatus: REST_STATUS.OK,
				progresjonPending: false
			};
		case FaktumActionTypeKeys.OPPRETT_FAKTUM: {
			return { ...state, restStatus: REST_STATUS.PENDING };
		}
		case FaktumActionTypeKeys.OPPRETTET_FAKTUM: {
			return {
				...state,
				restStatus: REST_STATUS.OK,
				data: [...state.data, action.faktum]
			};
		}
		case FaktumActionTypeKeys.SLETTET_FAKTUM: {
			return {...state, restStatus: REST_STATUS.OK};
		}
		case FaktumActionTypeKeys.SLETT_FAKTUM: {
			return {
				...state,
				restStatus: REST_STATUS.PENDING,
				data: state.data.filter((faktum) => faktum.faktumId !== action.faktumId)};
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

function updateFaktumVerdi(fakta: Faktum[], faktum: Faktum) {
	const index: number = fakta.findIndex(item => {
		return item.faktumId === faktum.faktumId;
	});
	if (index === -1) {
		console.error("Manglende faktum " + JSON.stringify(faktum, null, 4));
		return [...fakta];
	} else {
		return [...fakta.slice(0, index), faktum, ...fakta.slice(index + 1)];
	}
}

export default FaktumReducer;
