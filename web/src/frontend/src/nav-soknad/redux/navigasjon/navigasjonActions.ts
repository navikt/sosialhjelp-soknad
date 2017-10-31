import { NavigasjonActionTypes, NavigasjonActions } from "./navigasjonTypes";

export function navigerTilServerfeil(): NavigasjonActions {
	return {
		type: NavigasjonActionTypes.TIL_SERVERFEIL
	};
}

export function navigerTilFinnDittNavKontor(): NavigasjonActions {
	return {
		type: NavigasjonActionTypes.TIL_FINN_DITT_NAV_KONTOR
	};
}

export function navigerTilDittNav(): NavigasjonActions {
	return {
		type: NavigasjonActionTypes.TIL_DITT_NAV
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

export function tilbakeEllerForsiden(): NavigasjonActions {
	return {
		type: NavigasjonActionTypes.TILBAKE_ELLER_FORSIDEN
	};
}

export function tilBosted(): NavigasjonActions {
	return {
		type: NavigasjonActionTypes.TIL_BOSTED
	};
}

export function navigerTilKvittering(
	brukerbehandlingId: string
): NavigasjonActions {
	return {
		type: NavigasjonActionTypes.TIL_KVITTERING,
		brukerbehandlingId
	};
}
