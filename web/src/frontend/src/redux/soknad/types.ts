export * from "../types";

export enum ActionTypeKeys {
	OPPRETT_SOKNAD = "soknad/OPPRETT_SOKNAD",
	SET_BRUKERBEHANDLING_ID = "soknad/SET_BRUKERBEHANDLING_ID",
	SET_SERVER_FEIL = "SET_SERVER_FEIL",
	OK = "soknad/OK",
	FEILET = "soknad/FEILET",
	PENDING = "soknad/PENDING",
	SET_OPPSUMMERING = "soknad/SET_OPPSUMMERING",
	OTHER_ACTION = "__any_other_action_type__"
}

export interface OpprettSoknadAction {
	type: ActionTypeKeys.OPPRETT_SOKNAD;
}

export interface SetBrukerBehandlingIdAction {
	type: ActionTypeKeys.SET_BRUKERBEHANDLING_ID;
	brukerBehandlingId: string;
}

export interface SetServerFeilAction {
	type: ActionTypeKeys.SET_SERVER_FEIL;
	feilmelding: string;
}
export interface SetOppsummering {
	type: ActionTypeKeys.SET_OPPSUMMERING;
	html: string;
}

export interface OtherAction {
	type: ActionTypeKeys.OTHER_ACTION;
}

export interface SoknadState {
	status: string;
	soknadType: string;
	brukerBehandlingId: string;
	feilmelding: string;
	oppsummering: string;
}
