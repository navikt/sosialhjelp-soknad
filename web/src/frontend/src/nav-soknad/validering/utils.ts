import { Faktum } from "../types";
import {
	Valideringsfeil,
	FaktumValideringsregler,
	ValideringActionKey
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
			if (faktum.ignorert) {
				return;
			}
			const value = property ? faktum.properties[property] : faktum.value;
			const feilKey = v(value);
			if (feilKey !== ValideringActionKey.PAKREVD && (!value || value === "")) {
				/** Tillate tomme verdier for alt untatt det som er påkrevd */
				return;
			}
			if (feilKey) {
				valideringsfeil.push({
					faktumKey: faktumvalidering.faktumKey,
					property: faktumvalidering.property,
					faktumId: faktumvalidering.faktumId,
					feilkode:
						feilKey === ValideringActionKey.PAKREVD
							? `${faktum.key}${faktumvalidering.property || ""}.feilmelding`
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
		const faktum = finnFaktum(
			faktumvalidering.faktumKey,
			fakta,
			faktumvalidering.faktumId
		);
		const feil = validerFaktum({
			faktum,
			valideringsregler,
			property: faktumvalidering.property
		});
		if (feil) {
			valideringsfeil = valideringsfeil.concat(feil);
		}
	});
	return valideringsfeil;
}
