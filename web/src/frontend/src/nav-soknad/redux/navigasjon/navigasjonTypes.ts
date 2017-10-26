export enum Sider {
	FORSIDEN = "https://www.navn.no",
	FINN_DITT_NAV_KOTOR = "https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/finn-ditt-nav-kontor--353421",
	SERVERFEIL = "/serverfeil"
}

export enum NavigasjonActionTypes {
	TILBAKE_ELLER_FORSIDEN = "navigasjon/TILBAKE_ELLER_FORSIDEN",
	TIL_FINN_DITT_NAV_KONTOR = "navigasjon/TIL_FINN_DITT_NAV_KONTOR",
	TIL_STEG = "navigasjon/TIL_STEG",
	GA_VIDERE = "navigasjon/GA_VIDERE",
	TIL_SERVERFEIL = "navigasjon/TIL_SERVERFEIL"
}

export type NavigasjonActions =
	TilServerfeil |
	TilSteg |
	TilFinnDittNavKontor |
	TilbakeEllerForsiden |
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

export interface TilFinnDittNavKontor {
	type: NavigasjonActionTypes.TIL_FINN_DITT_NAV_KONTOR;
}

export interface TilbakeEllerForsiden {
	type: NavigasjonActionTypes.TILBAKE_ELLER_FORSIDEN;
}
