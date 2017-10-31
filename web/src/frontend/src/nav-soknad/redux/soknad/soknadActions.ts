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
		type: SoknadActionTypeKeys.OPPRETTET_SOKNAD,
		brukerBehandlingId
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
		type: SoknadActionTypeKeys.HENTET_SOKNAD,
		data
	};
}

export function hentSoknadFeilet(
	brukerBehandlingId: string
): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.HENTET_SOKNAD_FEILET,
		brukerBehandlingId
	};
}

export function sendSoknad(brukerBehandlingId: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.SEND_SOKNAD,
		brukerBehandlingId
	};
}

export function soknadSendt(brukerBehandlingId: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.SOKNAD_SENDT,
		brukerBehandlingId
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

export function hentKvittering(brukerBehandlingId: string): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.HENT_KVITTERING,
		brukerBehandlingId
	};
}

export function kvitteringHentet(kvittering: Kvittering): SoknadActionTypes {
	return {
		type: SoknadActionTypeKeys.KVITTERING_HENTET,
		kvittering
	};
}
