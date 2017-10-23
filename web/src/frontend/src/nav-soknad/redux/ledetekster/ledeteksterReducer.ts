import {
	ActionTypeKeys,
	InformasjonActionTypes,
	LedetekstApiType
} from "./ledeteksterTypes";

const { OK, PENDING, FEILET, INIT } = ActionTypeKeys;

const initialState = {
	data: {},
	status: INIT
};

export default (
	state: LedetekstApiType = initialState,
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
