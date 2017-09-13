export * from "../types";

export enum SoknadActionTypeKeys {
	FAKTA_PENDING = "fakta/PENDING", // TODO: Flytt
	OPPRETT_SOKNAD = "soknad/OPPRETT_SOKNAD",
	SET_BRUKERBEHANDLING_ID = "soknad/SET_BRUKERBEHANDLING_ID",
	SET_SERVER_FEIL = "SET_SERVER_FEIL",
	OK = "soknad/OK",
	FEILET = "soknad/FEILET",
	PENDING = "soknad/PENDING",
	SET_OPPSUMMERING = "soknad/SET_OPPSUMMERING",
	RESET_SOKNAD = "soknad/RESET_SOKNAD",
	OTHER_ACTION = "__any_other_action_type__"
}

export enum REST_STATUS {
	OK = "OK",
	FEILET = "FEILET",
	PENDING = "PENDING",
	INITIALISERT = "INITIALISERT"
}

export interface OpprettSoknadAction {
	type: SoknadActionTypeKeys.OPPRETT_SOKNAD;
}

export interface SettRestStatusPending {
	type: SoknadActionTypeKeys.PENDING;
}

export interface SettRestStatusOk {
	type: SoknadActionTypeKeys.OK;
}

export interface SetBrukerBehandlingIdAction {
	type: SoknadActionTypeKeys.SET_BRUKERBEHANDLING_ID;
	brukerBehandlingId: string;
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

export interface SoknadState {
	status: string;
	restStatus: string;
	soknadType: string;
	brukerBehandlingId: string;
	feilmelding: string;
}
