export interface Kontonummer {
	brukerdefinert: boolean;
	systemverdi: string | null;
	verdi: string | null;
	harIkkeKonto: boolean | null;
}

export const initialKontonummerState: Kontonummer = {
	brukerdefinert: false,
	systemverdi: null,
	verdi: null,
	harIkkeKonto: null
};
