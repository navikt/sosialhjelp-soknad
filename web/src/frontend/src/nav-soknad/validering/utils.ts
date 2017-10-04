import { Faktum } from "../types";
import {
	Valideringsfeil,
	FaktumValideringsregler,
	ValideringKey
} from "./types";
import { finnFaktum } from "../utils";

interface ValiderOptions {
	faktum: Faktum;
	property?: string;
	valideringsregler: FaktumValideringsregler[];
}

export function validerFaktum(options: ValiderOptions): Valideringsfeil {
	const { faktum, property, valideringsregler } = options;
	const valideringsfeil: Valideringsfeil[] = [];
	const faktumvalidering = valideringsregler.find(
		vr =>
			vr.faktumKey === faktum.key &&
			(property ? vr.property === property : true)
	);
	if (faktumvalidering) {
		faktumvalidering.valideringer.forEach(v => {
			const feilKey = v(property ? faktum.properties[property] : faktum.value);
			if (faktum.ignorert) {
				return;
			}
			if (
				feilKey !== ValideringKey.PAKREVD &&
				(!faktum.value || faktum.value === "")
			) {
				/** Tillate tomme verdier for alt untatt det som er påkrevd */
				return;
			}
			if (feilKey) {
				valideringsfeil.push({
					faktumKey: faktumvalidering.faktumKey,
					property: faktumvalidering.property,
					feilkode:
						feilKey === ValideringKey.PAKREVD
							? `${faktum.key}.feilmelding`
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
		const faktum = finnFaktum(faktumvalidering.faktumKey, fakta);
		const feil = validerFaktum({ faktum, valideringsregler });
		if (feil) {
			valideringsfeil = valideringsfeil.concat(feil);
		}
	});
	return valideringsfeil;
}
