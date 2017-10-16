export enum OppsummeringActionTypeKeys {
	OK = "oppsummering/OK",
	FEILET = "oppsummering/FEILET",
	PENDING = "oppsummering/PENDING",
	SET_OPPSUMMERING = "soknad/SET_OPPSUMMERING"
}

export interface OppsummeringBolk {
	tittel: string;
	html: string;
}

export interface Oppsummering {
	signatur: string;
	bolker: OppsummeringBolk[];
}

export interface SetOppsummering {
	type: OppsummeringActionTypeKeys.SET_OPPSUMMERING;
	oppsummering: string;
}
