export enum ValideringActionKey {
	PAKREVD = "validering.pakrevd",
	MIN_LENGDE = "validering.minLengde",
	MAX_LENGDE = "validering.maksLengde",
	ER_TALL = "validering.erTall",
	ER_TELEFONNUMMER = "validering.erTelefonnummer",
	ER_KONTONUMMER = "validering.erKontonummer",
	ER_FDATO = "validering.erFdato",
	ER_FDATO_ETTER_IDAG = "validering.erFdatoEtterIdag"
}

export type FaktumValideringFunc = (value: string) => ValideringActionKey;

export interface FaktumValideringKey {
	faktumKey: string;
	property?: string;
	faktumId?: number;
}

export interface Valideringsfeil extends FaktumValideringKey {
	feilkode: string;
}

export interface FaktumValideringsregler extends FaktumValideringKey {
	valideringer: FaktumValideringFunc[];
}
