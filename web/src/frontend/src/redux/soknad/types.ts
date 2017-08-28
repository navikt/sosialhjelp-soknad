export * from "../types";

export enum ActionTypeKeys {
	OPPRETT_SOKNAD = "soknad/OPPRETT_SOKNAD",
	SET_BRUKERBEHANDLING_ID = "SET_BRUKERBEHANDLING_ID",
	SET_SERVER_FEIL = "SET_SERVER_FEIL",
	OK = "soknad/OK",
	FEILET = "soknad/FEILET",
	PENDING = "soknad/PENDING",
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

export interface OtherAction {
	type: ActionTypeKeys.OTHER_ACTION;
}
