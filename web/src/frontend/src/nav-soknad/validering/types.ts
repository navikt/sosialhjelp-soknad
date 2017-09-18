export enum ValideringKey {
	PAKREVD = "validering.pakrevd",
	MIN_LENGDE = "validering.minLengde",
	MAX_LENGDE = "validering.maksLengde",
	ER_TALL = "validering.erTall",
	ER_TELEFONNUMMER = "validering.erTelefonnummer",
	ER_KONTONUMMER = "validering.erKontonummer"
}

export interface Valideringsfeil {
	faktumKey: string;
	feilkode: string;
}

export type FaktumValideringFunc = (value: string) => ValideringKey;

export interface FaktumValideringsregler {
	faktumKey: string;
	valideringer: FaktumValideringFunc[];
}
