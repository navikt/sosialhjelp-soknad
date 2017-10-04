import { Faktum } from "../types";
import { erDev } from "../utils";

export function finnFaktum(
	faktumKey: string,
	fakta: Faktum[],
	faktumId?: number
): Faktum {
	if (faktumId) {
		return finnFaktumMedId(faktumKey, fakta, faktumId);
	}
	const faktum = fakta.filter((f: Faktum) => {
		return f.key === faktumKey;
	});
	if (faktum.length === 0) {
		if (erDev()) {
			// tslint:disable-next-line
			console.log("Faktum ikke funnet: " + faktumKey);
		}
	}
	return faktum[0];
}

export function getProgresjonFaktum(fakta: Faktum[]) {
	return finnFaktum("progresjon", fakta);
}

export function finnFaktumMedId(
	faktumKey: string,
	fakta: Faktum[],
	faktumId: number
): Faktum {
	return fakta.filter((f: Faktum) => {
		return f.faktumId === faktumId;
	})[0];
}

export function finnFakta(faktumKey: string, fakta: Faktum[]): Faktum[] {
	return fakta.filter(faktum => faktum.key === faktumKey);
}

export function updateFaktumMedLagretVerdi(faktum: Faktum): Faktum {
	return {
		...faktum,
		lagret: {
			value: faktum.value,
			properties: { ...faktum.properties }
		}
	};
}

export function updateFaktaMedLagretVerdi(fakta: Faktum[]): Faktum[] {
	return fakta.map(f => updateFaktumMedLagretVerdi(f));
}
