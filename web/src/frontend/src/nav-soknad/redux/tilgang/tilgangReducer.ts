import {
	ActionTypeKeys,
	TilgangActionTypes,
	TilgangApiType
} from "./tilgangTypes";

const { OK, PENDING, FEILET, INIT } = ActionTypeKeys;

const initialState = {
	harTilgang: false,
	status: INIT
};

export default (
	state: TilgangApiType = initialState,
	action: TilgangActionTypes
) => {
	switch (action.type) {
		case OK: {
			return { ...state, status: OK, harTilgang: action.harTilgang };
		}
		case PENDING:
			return { ...state, status: PENDING };
		case FEILET:
			return { ...state, status: FEILET, felmelding: action.feilmelding };
		default:
			return state;
	}
};
