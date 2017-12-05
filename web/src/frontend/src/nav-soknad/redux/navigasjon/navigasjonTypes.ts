import { Kommune } from "../../types";
export enum Sider {
	FORSIDEN = "https://www.nav.no",
	/* tslint:disable-next-line */
	FINN_DITT_NAV_KONTOR = "https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/finn-ditt-nav-kontor--353421",
	SERVERFEIL = "/serverfeil",
	START = "/informasjon",
	BOSTED = "/bosted"
}

export enum NavigasjonActionTypes {
	TILBAKE_ELLER_FORSIDEN = "navigasjon/TILBAKE_ELLER_FORSIDEN",
	TIL_FINN_DITT_NAV_KONTOR = "navigasjon/TIL_FINN_DITT_NAV_KONTOR",
	TIL_DITT_NAV = "navigasjon/TIL_DITT_NAV",
	TIL_STEG = "navigasjon/TIL_STEG",
	TIL_START = "navigasjon/TIL_START",
	GA_VIDERE = "navigasjon/GA_VIDERE",
	GA_TILBAKE = "navigasjon/GA_TILBAKE",
	TIL_SERVERFEIL = "navigasjon/TIL_SERVERFEIL",
	TIL_BOSTED = "navigasjon/TIL_BOSTED",
	TIL_BOSTED_ELLER_START_SOKNAD = "navigasjon/TIL_BOSTED_ELLER_START_SOKNAD",
	TIL_KVITTERING = "navigasjon/TIL_KVITTERING"
}

export type NavigasjonActions =
	| TilStart
	| GaTilbake
	| TilServerfeil
	| TilSteg
	| TilFinnDittNavKontor
	| TilbakeEllerForsiden
	| GaVidere
	| TilBosted
	| TilDittNav
	| TilKvittering
	| TilBostedEllerStartSoknad;

export interface TilServerfeil {
	type: NavigasjonActionTypes.TIL_SERVERFEIL;
}

export interface TilSteg {
	type: NavigasjonActionTypes.TIL_STEG;
	stegnummer: number;
}

export interface TilStart {
	type: NavigasjonActionTypes.TIL_START;
}

export interface GaVidere {
	type: NavigasjonActionTypes.GA_VIDERE;
	stegnummer: number;
}

export interface GaTilbake {
	type: NavigasjonActionTypes.GA_TILBAKE;
	stegnummer: number;
}

export interface TilFinnDittNavKontor {
	type: NavigasjonActionTypes.TIL_FINN_DITT_NAV_KONTOR;
}

export interface TilbakeEllerForsiden {
	type: NavigasjonActionTypes.TILBAKE_ELLER_FORSIDEN;
}

export interface TilBosted {
	type: NavigasjonActionTypes.TIL_BOSTED;
}

export interface TilBostedEllerStartSoknad {
	type: NavigasjonActionTypes.TIL_BOSTED_ELLER_START_SOKNAD;
	valgtKommune: Kommune;
}

export interface TilDittNav {
	type: NavigasjonActionTypes.TIL_DITT_NAV;
}

export interface TilKvittering {
	type: NavigasjonActionTypes.TIL_KVITTERING;
	brukerbehandlingId: string;
}
