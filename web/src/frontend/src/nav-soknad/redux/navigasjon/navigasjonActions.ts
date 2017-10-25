import { NavigasjonActionTypes, NavigasjonActions } from "./navigasjonTypes";

export function navigerTilServerfeil(): NavigasjonActions {
	return {
		type: NavigasjonActionTypes.TIL_SERVERFEIL
	};
}

export function gaVidere(stegnummer: number): NavigasjonActions {
	return {
		type: NavigasjonActionTypes.GA_VIDERE,
		stegnummer
	};
}

export function tilSteg(stegnummer: number): NavigasjonActions {
	return {
		type: NavigasjonActionTypes.TIL_STEG,
		stegnummer
	};
}
