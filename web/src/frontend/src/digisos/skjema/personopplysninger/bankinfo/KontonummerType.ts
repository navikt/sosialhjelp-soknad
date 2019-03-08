export interface Kontonummer {
	brukerdefinert: boolean;
	systemverdi: string | null;
	brukerutfyltVerdi: string | null;
	harIkkeKonto: boolean | null;
}

export const initialKontonummerState: Kontonummer = {
	brukerdefinert: false,
	systemverdi: null,
	brukerutfyltVerdi: null,
	harIkkeKonto: null
};
