import { Feil } from "nav-frontend-skjema";

export type Dispatch = (action: any) => void;

export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
	dispatch: Dispatch;
}

export enum FaktumActionTypeKeys {
	OK = "faktum/OK",
	FEILET = "faktum/FEILET",
	PENDING = "faktum/PENDING",
	SET_FAKTUM = "faktum/SET_FAKTUM",
	OTHER_ACTION = "__any_other_action_type__",
	SET_FAKTUM_VALIDERINGSFEIL = "SET_FAKTUM_VALIDATION_FEIL",
	CLEAR_FAKTUM_VALIDERINGSFEIL = "SET_FAKTUM_VALIDATION_OK",
	REGISTER_FAKTUM_VALIDERING = "REGISTER_FAKTUM_VALIDERING",
	UNREGISTER_FAKTUM_VALIDERING = "UNREGISTER_FAKTUM_VALIDERING",
}

export enum FaktaActionTypeKeys {
	PENDING = "fakta/PENDING",
	OK = "fakta/OK",
	SET_FAKTA = "SET_FAKTA",
	SOKNAD_OPPRETTET = "SOKNAD_OPPRETTET",
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
	faktumId: number;
	soknadId: number;
	parrentFaktum: null | number;
	key: string;
	value: null | boolean | string | number;
	faktumEgenskaper?: FaktumEgenskap[];
	properties: object;
	type?: string;
}

export interface FaktumEgenskap {
	faktumId: number;
	soknadId: number;
	key: string;
	value: string;
	systemEgenskap: number;
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
	type: FaktumActionTypeKeys.SET_FAKTUM;
	faktumKey: string;
	value: FaktumValueType;
	properties?: any;
}

export interface SetFaktaAction {
	type: FaktaActionTypeKeys.SET_FAKTA;
	fakta: any;
}

export interface SoknadOpprettetAction {
	type: FaktaActionTypeKeys.SOKNAD_OPPRETTET;
}

export interface SetFaktumValideringFeilAction {
	type: FaktumActionTypeKeys.SET_FAKTUM_VALIDERINGSFEIL;
	faktumKey: string;
	element: HTMLElement;
	feil: Feil;
}

export interface SetFaktumValideringOkAction {
	type: FaktumActionTypeKeys.CLEAR_FAKTUM_VALIDERINGSFEIL;
	faktumKey: string;
}

export interface RegisterFaktumValidering {
	type: FaktumActionTypeKeys.REGISTER_FAKTUM_VALIDERING;
	faktumValidering: FaktumValidering;
}

export interface UnregisterFaktumValidering {
	type: FaktumActionTypeKeys.UNREGISTER_FAKTUM_VALIDERING;
	faktumKey: string;
}

export interface OtherAction {
	type: FaktaActionTypeKeys.OTHER_ACTION;
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
