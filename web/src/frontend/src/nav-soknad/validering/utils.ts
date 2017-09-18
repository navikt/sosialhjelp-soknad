import { Faktum } from "../redux/faktaTypes";
import {
	Valideringsfeil,
	FaktumValideringsregler,
	ValideringKey
} from "./types";
import { getFaktumVerdi } from "../utils";

export function validerFaktum(
	fakta: Faktum[],
	faktumKey: string,
	valideringsregler: FaktumValideringsregler[]
) {
	const valideringsfeil: Valideringsfeil[] = [];
	const faktumvalidering = valideringsregler.find(
		vr => vr.faktumKey === faktumKey
	);
	if (faktumvalidering) {
		const value = getFaktumVerdi(fakta, faktumKey);
		faktumvalidering.valideringer.forEach(v => {
			const feilKey = v(value);
			if (feilKey) {
				valideringsfeil.push({
					faktumKey: faktumvalidering.faktumKey,
					feilkode:
						feilKey === ValideringKey.PAKREVD
							? `${faktumKey}.feilmelding`
							: feilKey
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
			faktumvalidering.faktumKey,
			valideringsregler
		);
		if (feil) {
			valideringsfeil = valideringsfeil.concat(feil);
		}
	});
	return valideringsfeil;
}
