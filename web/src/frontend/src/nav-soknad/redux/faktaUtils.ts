import { Faktum } from "../types";

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

export function getFaktumIndex(fakta: Faktum[], faktum: Faktum) {
	const index = fakta.findIndex(item => {
		return item.faktumId === faktum.faktumId;
	});
	if (index === -1) {
		console.error("Manglende faktum " + JSON.stringify(faktum, null, 4));
	}
	return index;
}

export function updateFaktumStateVerdi(fakta: Faktum[], faktum: Faktum) {
	const index = getFaktumIndex(fakta, faktum);
	if (index === -1) {
		return [...fakta];
	} else {
		return [...fakta.slice(0, index), faktum, ...fakta.slice(index + 1)];
	}
}

export function updateFaktumLagretVerdi(fakta: Faktum[], faktum: Faktum) {
	const index = getFaktumIndex(fakta, faktum);
	if (index === -1) {
		return [...fakta];
	} else {
		const lagretFaktum = updateFaktumMedLagretVerdi(faktum);
		return [
			...fakta.slice(0, index),
			{ ...lagretFaktum } as Faktum,
			...fakta.slice(index + 1)
		];
	}
}
