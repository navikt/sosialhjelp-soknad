export enum Sider {
	SERVERFEIL = "/serverfeil"
}

export enum NavigasjonActionTypes {
	TIL_SERVERFEIL = "navigasjon/TIL_SERVERFEIL"
}

export type NavigasjonActions = TilServerfeil;

export interface TilServerfeil {
	type: NavigasjonActionTypes.TIL_SERVERFEIL;
}
