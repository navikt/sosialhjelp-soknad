import { Faktum, REST_STATUS } from "../../types";
import { FaktaActionTypeKeys, FaktumActionTypeKeys } from "./faktaActionTypes";
import { updateFaktumLagretVerdi, updateFaktumMedLagretVerdi, updateFaktumStateVerdi } from "./faktaUtils";
import { Reducer } from "../reduxTypes";
import { FaktumActionTypes } from "./faktaTypes";

export interface FaktumState {
	restStatus: string;
	progresjonPending: boolean;
	data: Faktum[];
}

const initialState: FaktumState = {
	restStatus: "",
	progresjonPending: false,
	data: []
};

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
		case FaktumActionTypeKeys.SLETT_FAKTUM_LOKALT:
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
