import { Soknad } from "../types/navSoknadTypes";

export enum SoknadActionTypeKeys {
	OPPRETT_SOKNAD = "soknad/OPPRETT_SOKNAD",
	OPPRETTET_SOKNAD = "soknad/OPPRETTET_SOKNAD",
	HENT_SOKNAD = "soknad/HENT_SOKNAD",
	HENTET_SOKNAD = "soknad/HENTET_SOKNAD",
	SET_SERVER_FEIL = "SET_SERVER_FEIL",
	FEILET = "soknad/FEILET",
	PENDING = "soknad/PENDING",
	RESET_SOKNAD = "soknad/RESET_SOKNAD",
	OTHER_ACTION = "__any_other_action_type__",
	AVBRYT_SOKNAD = "soknad/AVBRYT_SOKNAD",
	FORTSETT_SOKNAD = "soknad/FORTSETT_SOKNAD",
	HENT_KVITTERING = "soknad/HENT_KVITTERING",
	KVITTERING_HENTET = "soknad/KVITTERING_HENTET"
}

export interface OpprettetSoknadAction {
	type: SoknadActionTypeKeys.OPPRETTET_SOKNAD;
	brukerBehandlingId: string;
}

export interface OpprettSoknadAction {
	type: SoknadActionTypeKeys.OPPRETT_SOKNAD;
}

export interface HentSoknadAction {
	type: SoknadActionTypeKeys.HENT_SOKNAD;
}

export interface HentetSoknadAction {
	type: SoknadActionTypeKeys.HENTET_SOKNAD;
	data: Soknad;
}

export interface SetServerFeilAction {
	type: SoknadActionTypeKeys.SET_SERVER_FEIL;
	feilmelding: string;
}
export interface ResetSoknadAction {
	type: SoknadActionTypeKeys.RESET_SOKNAD;
}

export interface OtherAction {
	type: SoknadActionTypeKeys.OTHER_ACTION;
}

export interface AvbrytSoknadAction {
	type: SoknadActionTypeKeys.AVBRYT_SOKNAD;
}

export interface FortsettSoknadAction {
	type: SoknadActionTypeKeys.FORTSETT_SOKNAD;
}

export interface HentKvittering {
	type: SoknadActionTypeKeys.HENT_KVITTERING;
}

export interface KvitteringHentetAction {
	type: SoknadActionTypeKeys.KVITTERING_HENTET;
}
