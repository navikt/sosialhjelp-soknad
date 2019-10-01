import {InjectedIntl} from "react-intl";
import {AVBRYT_DESTINASJON, SoknadActionType, SoknadActionTypeKeys} from "./soknadActionTypes";
import {NavEnhet} from "../../skjema/personopplysninger/adresse/AdresseTypes";
import {FornavnResponse, TilgangResponse} from "./soknadTypes";

export function startSoknadOk() {
	return {
		type: SoknadActionTypeKeys.START_SOKNAD_OK
	};
}
export function opprettSoknad(
	intl: InjectedIntl
) {
	return {
		type: SoknadActionTypeKeys.OPPRETT_SOKNAD,
		intl
	};
}
export function opprettSoknadOk(behandlingsId: string): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.OPPRETT_SOKNAD_OK,
		behandlingsId
	};
}

export function hentSoknad(behandlingsId: string): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.HENT_SOKNAD,
		behandlingsId
	};
}
export function hentSoknadOk(xsrfCookieReceived: boolean, behandlingsId: string): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.HENT_SOKNAD_OK,
		xsrfCookieReceived,
		behandlingsId
	};
}

export function sendSoknad(behandlingsId: string): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.SEND_SOKNAD,
		behandlingsId
	};
}
export function sendSoknadOk(behandlingsId: string): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.SEND_SOKNAD_OK,
		behandlingsId
	};
}

export function avbrytSoknad(
	destinasjon: AVBRYT_DESTINASJON = "MINSIDE"
): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.AVBRYT_SOKNAD,
		destinasjon
	};
}

export function fortsettSoknad(): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.FORTSETT_SOKNAD
	};
}

export function slettSoknad(
	behandlingsId: string,
	destinasjon: AVBRYT_DESTINASJON = "MINSIDE"
): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.SLETT_SOKNAD,
		behandlingsId,
		destinasjon
	};
}

export function slettSoknadOk(): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.SLETT_SOKNAD_OK
	};
}

export function finnOgOppdaterSoknadsmottakerStatus(brukerbehandlingId: string): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.FINN_OG_OPPDATER_SOKNADSMOTTAKER_STATUS,
		brukerbehandlingId
	}
}

export function oppdaterSoknadsmottakerStatus(valgtSoknadsmottaker: NavEnhet): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.OPPDATER_SOKNADSMOTTAKER_STATUS,
		valgtSoknadsmottaker
	}
}

export const getErSystemdataEndret = (behandlingsId: string): SoknadActionType => {
	return {
		type: SoknadActionTypeKeys.GET_ER_SYSTEMDATA_ENDRET,
		behandlingsId
	};
};

export const setErSystemdataEndret = (erSystemdataEndret: boolean): SoknadActionType => {
	return {
		type: SoknadActionTypeKeys.SET_ER_SYSTEMDATA_ENDRET,
		erSystemdataEndret
	}
};

export const sjekkAutentiseringOgTilgangOgHentRessurser = (): SoknadActionType => {
	return {
		type: SoknadActionTypeKeys.SJEKK_AUTENTISERING_OG_TILGANG_OG_HENT_RESSURSER
	}
};

export const lagreRessurserPaStore = (
	tilgangResponse: TilgangResponse,
	fornavnResponse: FornavnResponse
): SoknadActionType => {
	return {
		type: SoknadActionTypeKeys.LAGRE_TILGANG_OG_FORNAVN_PA_STORE,
		tilgangResponse,
		fornavnResponse
	}
};

export const setLinkVisited = (): SoknadActionType => {
	return {
		type: SoknadActionTypeKeys.SET_LINK_VISITED
	};
};

export const showLargeSpinner = (show: boolean): SoknadActionType => {
	return {
		type: SoknadActionTypeKeys.SHOW_LARGE_SPINNER,
		show
	}
};

export const visSamtykkeInfo = (skalVises: boolean): SoknadActionType => {
	return {
		type: SoknadActionTypeKeys.VIS_SAMTYKKE_INFO,
		skalVises
	}
};

export function showServerFeil(shouldShow: boolean): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.SHOW_SERVER_FEIL,
		shouldShow: shouldShow
	}
}

export function showSideIkkeFunnet(shouldShow: boolean): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.SHOW_SIDE_IKKE_FUNNET,
		shouldShow
	}
}

export function showFeilSide(): SoknadActionType {
	return {
		type: SoknadActionTypeKeys.SHOW_FEIL_SIDE
	}
}
