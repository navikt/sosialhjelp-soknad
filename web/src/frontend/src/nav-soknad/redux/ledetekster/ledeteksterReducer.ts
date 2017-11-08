import {
	LedeteksterActionTypeKeys,
	InformasjonActionTypes,
	LedetekstState
} from "./ledeteksterTypes";

const { OK, PENDING, FEILET, INIT } = LedeteksterActionTypeKeys;

const initialState = {
	data: {},
	status: INIT
};

export default (
	state: LedetekstState = initialState,
	action: InformasjonActionTypes
) => {
	switch (action.type) {
		case OK: {
			return { ...state, status: OK, data: action.data };
		}
		case PENDING:
			return { ...state, status: PENDING };
		case FEILET:
			return { ...state, status: FEILET, felmelding: action.feilmelding };
		default:
			return state;
	}
};
