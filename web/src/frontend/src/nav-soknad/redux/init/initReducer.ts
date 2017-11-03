import { InitActionTypeKeys, InitActionTypes, InitState } from "./initTypes";

const { OK, START, FEILET } = InitActionTypeKeys;
import { REST_STATUS } from "../../types";

const initialState: InitState = {
	restStatus: REST_STATUS.INITIALISERT
};

export default (state: InitState = initialState, action: InitActionTypes) => {
	switch (action.type) {
		case OK: {
			return { restStatus: REST_STATUS.OK };
		}
		case START:
			return { restStatus: REST_STATUS.PENDING };
		case FEILET:
			return { restStatus: REST_STATUS.FEILET };
		default:
			return state;
	}
};
