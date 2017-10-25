import { NavigasjonActionTypes, NavigasjonActions } from "./navigasjonTypes";

export function navigerTilServerfeil(): NavigasjonActions {
	return {
		type: NavigasjonActionTypes.TIL_SERVERFEIL
	};
}
