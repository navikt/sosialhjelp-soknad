export type Dispatch = (action: any) => void;

export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
	dispatch: Dispatch;
}

export enum ActionTypeKeys {
	SET_FAKTUM_VERDI = "SET_FAKTUM_VERDI",
	SET_FAKTA = "SET_FAKTA",
	SOKNAD_OPPRETTET = "SOKNAD_OPPRETTET",
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

export interface SoknadOpprettetAction {
	type: ActionTypeKeys.SOKNAD_OPPRETTET;
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

export interface SporsmalFaktumTekst {
	sporsmal: string;
	infotekst?: Infotekst;
	hjelpetekst?: Infotekst;
}

export interface CheckboxFaktumTekst {
	label: string;
	infotekst?: Infotekst;
	hjelpetekst?: Infotekst;
}

export interface InputFaktumTekst {
	/** Label som knyttes sammen med inputfelt */
	label: string;
	/** Valgfritt spørsmål */
	sporsmal?: string;
	/** Utfyllende informasjon */
	infotekst?: Infotekst;
	/** Hjelpetekst som plasseres vedsiden av spørsmål */
	hjelpetekst?: Infotekst;
	/** Tekst som skal stå i bakgrunn for sjekkboksen */
	pattern?: string;
	/** Tekst til høyre for inputboks */
	hoyretekst?: string;
	/** Tekst til venstre for inputboks */
	venstretekst?: string;
}
