import { Faktum } from "../redux/types";
import { Valideringsfeil, FaktumValideringRules } from "./types";
import { getFaktumVerdi } from "../utils";

export function validerRequired(value: string) {
	return typeof value === "string" && value.length > 0;
}

export function validerAlleFaktum(
	fakta: Faktum[],
	valideringer: FaktumValideringRules[]
): Valideringsfeil[] {
	const valideringsfeil: Valideringsfeil[] = [];
	valideringer.forEach(faktum => {
		const value = getFaktumVerdi(fakta, faktum.faktumKey);
		faktum.valideringer.forEach(v => {
			const isValid = v(value);
			if (!isValid) {
				valideringsfeil.push({
					faktumKey: faktum.faktumKey,
					element: null,
					feil: {
						feilmelding: "whooo"
					}
				});
			}
		});
	});
	return valideringsfeil;
}
