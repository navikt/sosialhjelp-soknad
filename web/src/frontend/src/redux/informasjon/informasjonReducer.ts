import { ActionTypeKeys, ActionTypes, LedetekstApiType } from "./informasjonTypes";

const {OK, PENDING, FEILET, INIT} = ActionTypeKeys;

const initialState = {
	data: {},
	status: INIT
};

export default (state: LedetekstApiType = initialState, action: ActionTypes) => {
	switch (action.type) {
		case OK: {
			return {...state, status: OK, data: action.data};
		}
		case PENDING:
			return {...state, status: PENDING};
		case FEILET:
			return {...state, status: FEILET, data: action.data};
		default:
			return state;
	}
};
