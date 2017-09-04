export * from "../redux/types";

export enum ActionTypeKeys {
	SET_FAKTUM_VERDI = "SET_FAKTUM_VERDI",
	SET_FAKTA = "SET_FAKTA",
	RESET_FAKTUM_VERDI = "RESET_FAKTUM_VERDI",
	OTHER_ACTION = "__any_other_action_type__"
}

export interface SetFaktumVerdiAction {
	type: ActionTypeKeys.SET_FAKTUM_VERDI;
	faktumKey: string;
	value: FaktumValueType;
	properties?: any;
}

export interface Faktum {
	key: string;
	value: string;
}

export interface Fakta {
	faktum: Faktum[];
}

export interface SetFaktaAction {
	type: ActionTypeKeys.SET_FAKTA;
	fakta: any;
}

export interface ResetFaktumVerdiAction {
	type: ActionTypeKeys.RESET_FAKTUM_VERDI;
	faktumKey: string;
}

export interface OtherAction {
	type: ActionTypeKeys.OTHER_ACTION;
}

export type FaktumValueType = string | number | boolean;

export interface Infotekst {
	tittel?: string;
	tekst?: string;
}

export interface FaktumSporsmal {
	sporsmal: string;
	infotekst?: Infotekst;
	hjelpetekst?: Infotekst;
}

export interface FaktumCheckboksTekst {
	label: string;
	infotekst?: Infotekst;
	hjelpetekst?: Infotekst;
	feilmelding: string;
}

export interface FaktumInputTekst {
	label: string;
	feilmelding?: string;
	infotekst?: Infotekst;
	hjelpetekst?: Infotekst;
	placeholder?: string;
}
