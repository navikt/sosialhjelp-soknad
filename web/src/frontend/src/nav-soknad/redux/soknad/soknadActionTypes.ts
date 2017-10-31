import { Soknad, Kvittering } from "../../types/navSoknadTypes";

export enum SoknadActionTypeKeys {
	START_SOKNAD = "soknad/START_SOKNAD",
	OPPRETT_SOKNAD = "soknad/OPPRETT_SOKNAD",
	OPPRETT_SOKNAD_OK = "soknad/OPPRETT_SOKNAD_OK",
	OPPRETT_SOKNAD_FEILET = "soknad/OPPRETT_SOKNAD_FEILET",
	HENT_SOKNAD = "soknad/HENT_SOKNAD",
	HENT_SOKNAD_OK = "soknad/HENT_SOKNAD_OK",
	HENT_SOKNAD_FEILET = "soknad/HENT_SOKNAD_FEILET",
	SET_SERVER_FEIL = "SET_SERVER_FEIL",
	FEILET = "soknad/FEILET",
	PENDING = "soknad/PENDING",
	RESET_SOKNAD = "soknad/RESET_SOKNAD",
	OTHER_ACTION = "__any_other_action_type__",
	AVBRYT_SOKNAD = "soknad/AVBRYT_SOKNAD",
	FORTSETT_SOKNAD = "soknad/FORTSETT_SOKNAD",
	SLETT_SOKNAD = "soknad/SLETT_SOKNAD",
	SLETT_SOKNAD_OK = "soknad/SLETT_SOKNAD_OK",
	SLETT_SOKNAD_FEILET = "soknad/SLETT_SOKNAD_FEILET",
	HENT_KVITTERING = "soknad/HENT_KVITTERING",
	KVITTERING_HENTET = "soknad/KVITTERING_HENTET",
	SEND_SOKNAD = "soknad/SEND_SOKNAD",
	SEND_SOKNAD_OK = "soknad/SEND_SOKNAD_OK",
	SEND_SOKNAD_FEILET = "soknad/SEND_SOKNAD_FEILET"
}

export type SoknadActionTypes =
	| OpprettSoknadAction
	| OpprettSoknadOkAction
	| OpprettSoknadFeiletAction
	| HentSoknadAction
	| HentSoknaOkdAction
	| HentSoknadFeiletAction
	| SendSoknadAction
	| SendSoknadOkAction
	| SendSoknadFeiletAction
	| AvbrytSoknadAction
	| FortsettSoknadAction
	| SetServerFeilAction
	| ResetSoknadAction
	| OtherAction
	| HentKvitteringAction
	| KvitteringHentetAction
	| SlettSoknadAction
	| SlettSoknadOkAction
	| SlettSoknadFeiletAction;

export interface StartSoknadAction {
	type: SoknadActionTypeKeys.START_SOKNAD;
	kommune?: string;
	bydel?: string;
}

export interface OpprettSoknadAction {
	type: SoknadActionTypeKeys.OPPRETT_SOKNAD;
}

export interface OpprettSoknadOkAction {
	type: SoknadActionTypeKeys.OPPRETT_SOKNAD_OK;
	brukerBehandlingId: string;
}

export interface OpprettSoknadFeiletAction {
	type: SoknadActionTypeKeys.OPPRETT_SOKNAD_FEILET;
	feilmelding: string;
}

export interface HentSoknadAction {
	type: SoknadActionTypeKeys.HENT_SOKNAD;
	brukerBehandlingId: string;
}

export interface HentSoknaOkdAction {
	type: SoknadActionTypeKeys.HENT_SOKNAD_OK;
	data: Soknad;
}

export interface HentSoknadFeiletAction {
	type: SoknadActionTypeKeys.HENT_SOKNAD_FEILET;
	feilmelding: string;
}

export interface SendSoknadAction {
	type: SoknadActionTypeKeys.SEND_SOKNAD;
	brukerBehandlingId: string;
}

export interface SendSoknadOkAction {
	type: SoknadActionTypeKeys.SEND_SOKNAD_OK;
}

export interface SendSoknadFeiletAction {
	type: SoknadActionTypeKeys.SEND_SOKNAD_FEILET;
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

export interface SlettSoknadOkAction {
	type: SoknadActionTypeKeys.SLETT_SOKNAD_OK;
}

export interface SlettSoknadFeiletAction {
	type: SoknadActionTypeKeys.SLETT_SOKNAD_FEILET;
	feilmelding: string;
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
