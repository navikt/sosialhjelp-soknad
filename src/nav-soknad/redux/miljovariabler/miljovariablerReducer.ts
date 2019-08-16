import {
	MiljovariablerActionTypeKeys,
	MiljovariablerApiType,
	MiljovariablerActionTypes
} from "./miljovariablerTypes";

const { OK, PENDING, FEILET, INIT } = MiljovariablerActionTypeKeys;

const initialState = {
	data: {},
	status: INIT
};

export default (
	state: MiljovariablerApiType = initialState,
	action: MiljovariablerActionTypes
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
