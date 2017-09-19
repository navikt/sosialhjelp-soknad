import { Valideringsfeil } from "../../validering/types";

/** Filtrerer slik at det kun er en feilmelding per faktum */
export const filtrerFeilmeldinger = (
	feilmeldinger: Valideringsfeil[]
): Valideringsfeil[] => {
	if (!feilmeldinger) {
		return [];
	}

	return feilmeldinger.reduce(
		(arr: Valideringsfeil[], feil: Valideringsfeil) =>
			arr.findIndex(f => f.faktumKey === feil.faktumKey) >= 0
				? arr
				: [...arr, feil],
		[]
	);
};
