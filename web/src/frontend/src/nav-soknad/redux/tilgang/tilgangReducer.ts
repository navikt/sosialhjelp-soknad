import {
	TilgangActionTypeKeys,
	TilgangActionTypes,
	TilgangState
} from "./tilgangTypes";

const { OK, PENDING, FEILET, INIT } = TilgangActionTypeKeys;

const initialState: TilgangState = {
	harTilgang: false,
	sperrekode: undefined,
	status: INIT
};

export default (
	state: TilgangState = initialState,
	action: TilgangActionTypes
) => {
	switch (action.type) {
		case OK: {
			const okState: TilgangState = {
				...state,
				status: OK,
				harTilgang: action.harTilgang,
				sperrekode: action.sperrekode
			};
			return okState;
		}
		case PENDING:
			return { ...state, status: PENDING };
		case FEILET:
			return { ...state, status: FEILET, felmelding: action.feilmelding };
		default:
			return state;
	}
};
