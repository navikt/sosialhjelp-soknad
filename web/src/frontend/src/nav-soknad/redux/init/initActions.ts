import { InitActionTypeKeys, InitActionTypes } from "./initTypes";

const start = (): InitActionTypes => {
	return {
		type: TilgangActionTypeKeys.INIT
	};
};
