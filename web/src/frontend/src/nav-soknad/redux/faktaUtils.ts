import { Faktum } from "./faktaTypes";

export function finnFaktum(faktumKey: string, fakta: Faktum[]): Faktum {
	return fakta.filter((faktum: Faktum) => {
		return faktum.key === faktumKey;
	})[0];
}
