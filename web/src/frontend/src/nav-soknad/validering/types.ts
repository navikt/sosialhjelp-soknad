import { Feil } from "nav-frontend-skjema";

export interface Valideringsfeil {
	faktumKey: string;
	element: HTMLElement;
	feil: Feil;
}

interface BaseValidering {
	required?: boolean;
}

export interface StringValidering extends BaseValidering {
	minLength?: number;
	maxLength?: number;
}

export interface NumberValidering extends BaseValidering {
	minValue?: number;
	maxValue?: number;
}

export interface CustomValidering extends BaseValidering {
	validateFunc: (value: any) => boolean;
}

export type FaktumValideringFunc = (value: string) => boolean;

export interface FaktumValideringRules {
	faktumKey: string;
	valideringer: FaktumValideringFunc[];
}
