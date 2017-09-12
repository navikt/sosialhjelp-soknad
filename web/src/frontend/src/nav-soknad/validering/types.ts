import { Feil } from "nav-frontend-skjema";

export interface Valideringsfeil {
	faktumKey: string;
	feil: Feil;
}

export type FaktumValideringFunc = (value: string) => boolean;

export interface FaktumValidering {
	validerFunc: FaktumValideringFunc;
	feilmelding?: string;
}

export interface FaktumValideringsregler {
	faktumKey: string;
	valideringer: FaktumValidering[];
}
