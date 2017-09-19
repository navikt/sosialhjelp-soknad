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
	verdi: string,
	valideringsregler: FaktumValideringsregler[]
): Valideringsfeil {
	const valideringsfeil: Valideringsfeil[] = [];
	const faktumvalidering = valideringsregler.find(
		vr => vr.faktumKey === faktumKey
	);
	if (faktumvalidering) {
		faktumvalidering.valideringer.forEach(v => {
			const feilKey = v(verdi);
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
	return valideringsfeil.length > 0 ? valideringsfeil[0] : null;
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
			getFaktumVerdi(fakta, faktumvalidering.faktumKey),
			valideringsregler
		);
		if (feil) {
			valideringsfeil = valideringsfeil.concat(feil);
		}
	});
	return valideringsfeil;
}
