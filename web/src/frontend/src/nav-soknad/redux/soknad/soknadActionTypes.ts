import { Soknad, Kvittering, Infofaktum } from "../../types/navSoknadTypes";

export enum SoknadActionTypeKeys {
	START_SOKNAD = "soknad/START_SOKNAD",
	START_SOKNAD_OK = "soknad/START_SOKNAD_OK",
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
	HENT_KVITTERING_OK = "soknad/KVITTERING_HENTET",
	HENT_KVITTERING_FEILET = "soknad/KVITTERING_FEILET",
	SEND_SOKNAD = "soknad/SEND_SOKNAD",
	SEND_SOKNAD_OK = "soknad/SEND_SOKNAD_OK",
	SEND_SOKNAD_FEILET = "soknad/SEND_SOKNAD_FEILET",
	SETT_INFOFAKTUM = "soknad/SETT_INFOFAKTUM"
}

export type AVBRYT_DESTINASJON = "START" | "MINSIDE";

export type SoknadActionTypes =
	| StartSoknadAction
	| StartSoknadOkAction
	| OpprettSoknadAction
	| OpprettSoknadAction
	| OpprettSoknadOkAction
	| OpprettSoknadFeiletAction
	| HentSoknadAction
	| HentSoknaOkAction
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
	| HentKvitteringOkAction
	| HentKvitteringFeiletAction
	| HentKvitteringOkAction
	| SlettSoknadAction
	| SlettSoknadOkAction
	| SlettSoknadFeiletAction
	| SettInfofaktumAction;

export interface StartSoknadAction {
	type: SoknadActionTypeKeys.START_SOKNAD;
	kommune?: string;
	bydel?: string;
}

export interface StartSoknadOkAction {
	type: SoknadActionTypeKeys.START_SOKNAD_OK;
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

export interface HentSoknaOkAction {
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
	brukerBehandlingId: string;
}

export interface SendSoknadFeiletAction {
	type: SoknadActionTypeKeys.SEND_SOKNAD_FEILET;
	feilmelding: string;
}

export interface ResetSoknadAction {
	type: SoknadActionTypeKeys.RESET_SOKNAD;
}

export interface AvbrytSoknadAction {
	type: SoknadActionTypeKeys.AVBRYT_SOKNAD;
	destinasjon?: AVBRYT_DESTINASJON;
}

export interface FortsettSoknadAction {
	type: SoknadActionTypeKeys.FORTSETT_SOKNAD;
}

export interface SlettSoknadAction {
	type: SoknadActionTypeKeys.SLETT_SOKNAD;
	brukerBehandlingId: string;
	destinasjon?: AVBRYT_DESTINASJON;
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

export interface HentKvitteringOkAction {
	type: SoknadActionTypeKeys.HENT_KVITTERING_OK;
	kvittering: Kvittering;
}

export interface HentKvitteringFeiletAction {
	type: SoknadActionTypeKeys.HENT_KVITTERING_FEILET;
	feilmelding: string;
}

export interface SetServerFeilAction {
	type: SoknadActionTypeKeys.SET_SERVER_FEIL;
	feilmelding: string;
}

export interface OtherAction {
	type: SoknadActionTypeKeys.OTHER_ACTION;
}

export interface SettInfofaktumAction {
	type: SoknadActionTypeKeys.SETT_INFOFAKTUM;
	info: Infofaktum;
}
