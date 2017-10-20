export enum OppsummeringActionTypeKeys {
	OK = "oppsummering/OK",
	FEILET = "oppsummering/FEILET",
	PENDING = "oppsummering/PENDING",
	HENT_OPPSUMMERING = "oppsummering/HENT_OPPSUMMERING",
	SET_SERVER_FEIL = "oppsummering/SET_SERVER_FEIL",
	SET_OPPSUMMERING = "oppsummering/SET_OPPSUMMERING",
	BEKREFT_OPPSUMMERING = "oppsummering/BEKREFT_OPPSUMMERING",
	SET_VIS_BEKREFT_MANGLER = "oppsummering/SET_VIS_BEKREFT_MANGLER"
}

export interface OppsummeringBolk {
	tittel: string;
	html: string;
}

export interface Oppsummering {
	signatur: string;
	bolker: OppsummeringBolk[];
}

export interface HentOppsummering {
	type: OppsummeringActionTypeKeys.HENT_OPPSUMMERING;
}

export interface SetServerFeil {
	type: OppsummeringActionTypeKeys.SET_SERVER_FEIL;
}

export interface SetOppsummering {
	type: OppsummeringActionTypeKeys.SET_OPPSUMMERING;
	oppsummering: string;
}

export interface BekreftOppsummering {
	type: OppsummeringActionTypeKeys.BEKREFT_OPPSUMMERING;
	bekreftet: boolean;
}

export interface SetVisBekreftMangler {
	type: OppsummeringActionTypeKeys.SET_VIS_BEKREFT_MANGLER;
	visBekreftMangler: boolean;
}
