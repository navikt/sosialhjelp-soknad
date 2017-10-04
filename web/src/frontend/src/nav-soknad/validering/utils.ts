import { Faktum } from "../types";
import {
	Valideringsfeil,
	FaktumValideringsregler,
	ValideringKey
} from "./types";
import { getFaktumVerdi, finnFaktum } from "../utils";

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
		const faktum = finnFaktum(faktumKey, fakta);
		faktumvalidering.valideringer.forEach(v => {
			const feilKey = v(verdi);
			if (faktum.ignorert) {
				return;
			}
			if (feilKey !== ValideringKey.PAKREVD && (!verdi || verdi === "")) {
				/** Tillate tomme verdier for alt untatt det som er påkrevd */
				return;
			}
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
