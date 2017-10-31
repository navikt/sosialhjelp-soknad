import { InjectedIntl } from "react-intl";
import { SoknadActionTypeKeys, SoknadActionTypes } from "./soknadActionTypes";
import { Soknad, Kvittering } from "../../types";

export function startSoknad(kommune: string, bydel?: string) {
	return {
		type: SoknadActionTypeKeys.START_SOKNAD,
		kommune,
		bydel
	};
}

export function opprettSoknad(
	kommuneId: string,
	bydelId: string,
	intl: InjectedIntl
) {
	return {
		type: SoknadActionTypeKeys.OPPRETT_SOKNAD,
		kommuneId,
		bydelId,
		intl
	};
}

export function opprettSoknadOk(brukerBehandlingId: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.OPPRETT_SOKNAD_OK,
		brukerBehandlingId
	};
}

export function opprettSoknadFeilet(feilmelding: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.OPPRETT_SOKNAD_FEILET,
		feilmelding
	};
}

export function hentSoknad(brukerBehandlingId: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.HENT_SOKNAD,
		brukerBehandlingId
	};
}

export function hentetSoknad(data: Soknad): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.HENT_SOKNAD_OK,
		data
	};
}

export function hentSoknadFeilet(feilmelding: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.HENT_SOKNAD_FEILET,
		feilmelding
	};
}

export function sendSoknad(brukerBehandlingId: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.SEND_SOKNAD,
		brukerBehandlingId
	};
}

export function sendSoknadOk(brukerBehandlingId: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.SEND_SOKNAD_OK,
		brukerBehandlingId
	};
}

export function sendSoknadFeilet(feilmelding: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.SEND_SOKNAD_FEILET,
		feilmelding
	};
}

export function resetSoknad(): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.RESET_SOKNAD
	};
}

export function avbrytSoknad(): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.AVBRYT_SOKNAD
	};
}

export function fortsettSoknad(): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.FORTSETT_SOKNAD
	};
}

export function slettSoknad(brukerBehandlingId: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.SLETT_SOKNAD,
		brukerBehandlingId
	};
}

export function slettSoknadOk(): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.SLETT_SOKNAD_OK
	};
}

export function slettSoknadFeilet(feilmelding: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.SLETT_SOKNAD_FEILET,
		feilmelding
	};
}

export function hentKvittering(brukerBehandlingId: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.HENT_KVITTERING,
		brukerBehandlingId
	};
}

export function hentKvitteringOk(kvittering: Kvittering): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.HENT_KVITTERING_OK,
		kvittering
	};
}
export function hentKvitteringFeilet(feilmelding: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.HENT_KVITTERING_FEILET,
		feilmelding
	};
}
