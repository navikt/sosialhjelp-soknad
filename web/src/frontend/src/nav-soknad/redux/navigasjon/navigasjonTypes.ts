export enum Sider {
	SERVERFEIL = "/serverfeil"
}

export enum NavigasjonActionTypes {
	TIL_STEG = "navigasjon/TIL_STEG",
	GA_VIDERE = "navigasjon/GA_VIDERE",
	TIL_SERVERFEIL = "navigasjon/TIL_SERVERFEIL"
}

export type NavigasjonActions =
	TilServerfeil |
	TilSteg |
	GaVidere;

export interface TilServerfeil {
	type: NavigasjonActionTypes.TIL_SERVERFEIL;
}

export interface TilSteg {
	type: NavigasjonActionTypes.TIL_STEG;
	stegnummer: number;
}

export interface GaVidere {
	type: NavigasjonActionTypes.GA_VIDERE;
	stegnummer: number;
}
