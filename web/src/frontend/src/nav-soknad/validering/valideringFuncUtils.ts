import {Valideringsfeil, ValideringsFeilKode} from "../redux/valideringActionTypes";

export const mod11Kontroll = (verdi: string) => {
	let controlNumber = 2;
	let sumForMod = 0;
	let i = 0;

	for (i = verdi.length - 2; i >= 0; --i) {
		sumForMod += parseInt(verdi.charAt(i), 10) * controlNumber;
		if (++controlNumber > 7) {
			controlNumber = 2;
		}
	}
	const result = 11 - sumForMod % 11;
	return result === 11 ? 0 : result;
};

export const konverterFdatoTilDato = (dato: string): Date => {
	const dag = parseInt(dato.substr(0, 2), 10);
	const mnd = parseInt(dato.substr(2, 2), 10) - 1;
	const ar = parseInt(dato.substr(4, 4), 10);
	const d = new Date(ar, mnd, dag);
	if (d.getDate() !== dag || d.getMonth() !== mnd || d.getFullYear() !== ar) {
		return null;
	}
	return d;
};

export const lagValideringsfeil = (valideringActionKey: ValideringsFeilKode, faktumKey: string): Valideringsfeil => {
	if (valideringActionKey) {
		const valideringsfeil: Valideringsfeil = {
			faktumKey,
			feilkode: valideringActionKey
		};
		return valideringsfeil;
	} else {
		return null;
	}
};

