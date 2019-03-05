export interface Telefonnummer {
	brukerdefinert: null | boolean;
	systemverdi: null | string;
	verdi: null | string;
}

export const initialTelefonnummerState: Telefonnummer = {
	brukerdefinert: false,
	systemverdi: null,
	verdi: null
};
