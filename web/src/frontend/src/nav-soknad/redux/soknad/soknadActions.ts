import { InjectedIntl } from "react-intl";
import {
	SoknadActionTypeKeys,
	SoknadActionTypes,
	AVBRYT_DESTINASJON
} from "./soknadActionTypes";
import { Soknad, Kvittering, Infofaktum } from "../../types";

export function startSoknad(kommune: string, bydel?: string) {
	return {
		type: SoknadActionTypeKeys.START_SOKNAD,
		kommune,
		bydel
	};
}

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

export function hentSoknadOk(data: Soknad): SoknadActionTypes {
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

export function avbrytSoknad(
	destinasjon: AVBRYT_DESTINASJON = "MINSIDE"
): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.AVBRYT_SOKNAD,
		destinasjon
	};
}

export function fortsettSoknad(): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.FORTSETT_SOKNAD
	};
}

export function slettSoknad(
	brukerBehandlingId: string,
	destinasjon: AVBRYT_DESTINASJON = "MINSIDE"
): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.SLETT_SOKNAD,
		brukerBehandlingId,
		destinasjon
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

export function settInfofaktum(info: Infofaktum): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.SETT_INFOFAKTUM,
		info
	};
}

export function settAvbrytSoknadSjekk(aktiv: boolean): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.SETT_AVBRYT_SOKNAD_SJEKK,
		aktiv
	};
}
