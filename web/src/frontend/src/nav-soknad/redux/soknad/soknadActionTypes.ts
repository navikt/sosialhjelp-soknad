import { Soknad, Kvittering } from "../../types/navSoknadTypes";

export enum SoknadActionTypeKeys {
	START_SOKNAD = "soknad/START_SOKNAD",
	OPPRETT_SOKNAD = "soknad/OPPRETT_SOKNAD",
	OPPRETTER_SOKNAD = "soknad/OPPRETTER_SOKNAD",
	OPPRETTET_SOKNAD = "soknad/OPPRETTET_SOKNAD",
	HENT_SOKNAD = "soknad/HENT_SOKNAD",
	HENTER_SOKNAD = "soknad/HENTER_SOKNAD",
	HENTET_SOKNAD = "soknad/HENTET_SOKNAD",
	HENTET_SOKNAD_FEILET = "soknad/HENTET_SOKNAD_FEILET",
	SET_SERVER_FEIL = "SET_SERVER_FEIL",
	FEILET = "soknad/FEILET",
	PENDING = "soknad/PENDING",
	RESET_SOKNAD = "soknad/RESET_SOKNAD",
	OTHER_ACTION = "__any_other_action_type__",
	AVBRYT_SOKNAD = "soknad/AVBRYT_SOKNAD",
	FORTSETT_SOKNAD = "soknad/FORTSETT_SOKNAD",
	SLETT_SOKNAD = "soknad/SLETT_SOKNAD",
	HENT_KVITTERING = "soknad/HENT_KVITTERING",
	KVITTERING_HENTET = "soknad/KVITTERING_HENTET",
	SEND_SOKNAD = "soknad/SEND_SOKNAD",
	SOKNAD_SENDT = "soknad/SOKNAD_SENDT"
}

export type SoknadActionTypes =
	| OpprettSoknadAction
	| OppretterSoknadAction
	| OpprettetSoknadAction
	| HentSoknadAction
	| HenterSoknadAction
	| HentetSoknadAction
	| HentSoknadFeiletAction
	| SendSoknadAction
	| SoknadSendtAction
	| AvbrytSoknadAction
	| FortsettSoknadAction
	| SetServerFeilAction
	| ResetSoknadAction
	| OtherAction
	| HentKvitteringAction
	| KvitteringHentetAction
	| SlettSoknadAction;

export interface StartSoknadAction {
	type: SoknadActionTypeKeys.START_SOKNAD;
	kommune?: string;
	bydel?: string;
}

export interface OpprettSoknadAction {
	type: SoknadActionTypeKeys.OPPRETT_SOKNAD;
}

export interface OppretterSoknadAction {
	type: SoknadActionTypeKeys.OPPRETTER_SOKNAD;
}

export interface OpprettetSoknadAction {
	type: SoknadActionTypeKeys.OPPRETTET_SOKNAD;
	brukerBehandlingId: string;
}

export interface HentSoknadAction {
	type: SoknadActionTypeKeys.HENT_SOKNAD;
	brukerBehandlingId: string;
}

export interface HenterSoknadAction {
	type: SoknadActionTypeKeys.HENTER_SOKNAD;
	brukerBehandlingId: string;
}

export interface HentetSoknadAction {
	type: SoknadActionTypeKeys.HENTET_SOKNAD;
	data: Soknad;
}

export interface HentSoknadFeiletAction {
	type: SoknadActionTypeKeys.HENTET_SOKNAD_FEILET;
	brukerBehandlingId: string;
}

export interface SendSoknadAction {
	type: SoknadActionTypeKeys.SEND_SOKNAD;
	brukerBehandlingId: string;
}

export interface SoknadSendtAction {
	type: SoknadActionTypeKeys.SOKNAD_SENDT;
}

export interface ResetSoknadAction {
	type: SoknadActionTypeKeys.RESET_SOKNAD;
}

export interface AvbrytSoknadAction {
	type: SoknadActionTypeKeys.AVBRYT_SOKNAD;
}

export interface FortsettSoknadAction {
	type: SoknadActionTypeKeys.FORTSETT_SOKNAD;
}

export interface SlettSoknadAction {
	type: SoknadActionTypeKeys.SLETT_SOKNAD;
	brukerBehandlingId: string;
}

export interface HentKvitteringAction {
	type: SoknadActionTypeKeys.HENT_KVITTERING;
	brukerBehandlingId: string;
}

export interface KvitteringHentetAction {
	type: SoknadActionTypeKeys.KVITTERING_HENTET;
	kvittering: Kvittering;
}

export interface SetServerFeilAction {
	type: SoknadActionTypeKeys.SET_SERVER_FEIL;
	feilmelding: string;
}

export interface OtherAction {
	type: SoknadActionTypeKeys.OTHER_ACTION;
}
