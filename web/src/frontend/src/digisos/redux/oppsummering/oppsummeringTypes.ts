export * from "../types";

export enum OppsummeringActionTypeKeys {
	OK = "oppsummering/OK",
	FEILET = "oppsummering/FEILET",
	PENDING = "oppsummering/PENDING",
	SET_OPPSUMMERING = "soknad/SET_OPPSUMMERING"
}

export interface SetOppsummering {
	type: OppsummeringActionTypeKeys.SET_OPPSUMMERING;
	oppsummering: string;
}

export interface OppsummeringState {
	oppsummering: string;
}
