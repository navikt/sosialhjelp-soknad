import { Feil } from "nav-frontend-skjema";

export type Dispatch = (action: any) => void;

export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
	dispatch: Dispatch;
}

export enum ActionTypeKeys {
	FAKTA_PENDING = "FAKTA_PENDING",
	SET_FAKTUM_VERDI = "SET_FAKTUM_VERDI",
	SET_FAKTA = "SET_FAKTA",
	SOKNAD_OPPRETTET = "SOKNAD_OPPRETTET",
	RESET_FAKTUM_VERDI = "RESET_FAKTUM_VERDI",
	SET_FAKTUM_VALIDERINGSFEIL = "SET_FAKTUM_VALIDATION_FEIL",
	CLEAR_FAKTUM_VALIDERINGSFEIL = "SET_FAKTUM_VALIDATION_OK",
	REGISTER_FAKTUM_VALIDERING = "REGISTER_FAKTUM_VALIDERING",
	UNREGISTER_FAKTUM_VALIDERING = "UNREGISTER_FAKTUM_VALIDERING",
	SET_SERVER_FEIL = "SET_SERVER_FEIL",
	OTHER_ACTION = "__any_other_action_type__"
}

export interface FaktumValideringRules {
	rules: any;
}

export interface FaktumValidering {
	faktumKey: string;
	rules: FaktumValideringRules;
}

export interface Faktum {
	key: string;
	value: string;
}

export interface Fakta {
	faktum: Faktum[];
}

export interface Valideringsfeil {
	faktumKey: string;
	element: HTMLElement;
	feil: Feil;
}

export interface SetFaktumVerdiAction {
	type: ActionTypeKeys.SET_FAKTUM_VERDI;
	faktumKey: string;
	value: FaktumValueType;
	properties?: any;
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
export interface SetFaktumValideringFeilAction {
	type: ActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL;
	faktumKey: string;
	element: HTMLElement;
	feil: Feil;
}
export interface SetFaktumValideringOkAction {
	type: ActionTypeKeys.CLEAR_FAKTUM_VALIDERINGSFEIL;
	faktumKey: string;
}

export interface RegisterFaktumValidering {
	type: ActionTypeKeys.REGISTER_FAKTUM_VALIDERING;
	faktumValidering: FaktumValidering;
}

export interface UnregisterFaktumValidering {
	type: ActionTypeKeys.UNREGISTER_FAKTUM_VALIDERING;
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
