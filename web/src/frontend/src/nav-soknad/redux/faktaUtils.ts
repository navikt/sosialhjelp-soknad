import { Faktum } from "./faktaTypes";
import { erDev } from "../../digisos/redux/rest-utils";

export function finnFaktum(faktumKey: string, fakta: Faktum[], faktumId?: number): Faktum {
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

export function finnFaktumMedId(faktumKey: string, fakta: Faktum[], faktumId: number): Faktum {
	return fakta.filter((f: Faktum) => {
		return f.faktumId === faktumId;
	})[0];
}

export function finnFakta(faktumKey: string, fakta: Faktum[]): Faktum[] {
	return fakta.filter((faktum) => faktum.key === faktumKey);
}
