import { Faktum } from "../redux/faktaTypes";
import { Valideringsfeil, FaktumValideringsregler } from "./types";
import { getFaktumVerdi } from "../utils";

export function validerFaktum(
	fakta: Faktum[],
	valideringsregler: FaktumValideringsregler[],
	faktumKey: string
) {
	const valideringsfeil: Valideringsfeil[] = [];
	const faktumvalidering = valideringsregler.find(
		vr => vr.faktumKey === faktumKey
	);
	if (faktumvalidering) {
		const value = getFaktumVerdi(fakta, faktumKey);
		faktumvalidering.valideringer.forEach(v => {
			const isValid = v.validerFunc(value);
			if (!isValid) {
				valideringsfeil.push({
					faktumKey: faktumvalidering.faktumKey,
					feil: {
						feilmelding: v.feilmelding
					}
				});
			}
		});
	}
	return valideringsfeil;
}

export function validerAlleFaktum(
	fakta: Faktum[],
	valideringsregler: FaktumValideringsregler[]
): Valideringsfeil[] {
	let valideringsfeil: Valideringsfeil[] = [];
	valideringsregler.forEach(faktumvalidering => {
		const feil = validerFaktum(
			fakta,
			valideringsregler,
			faktumvalidering.faktumKey
		);
		if (feil) {
			valideringsfeil = valideringsfeil.concat(feil);
		}
	});
	return valideringsfeil;
}
