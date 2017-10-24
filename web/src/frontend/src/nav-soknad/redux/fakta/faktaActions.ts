import {
	FaktaActionTypes,
	FaktaActionTypeKeys,
	FaktumActionTypeKeys,
} from "./faktaActionTypes";
import { Faktum } from "../../types";
import { FaktumActionTypes } from "./faktaTypes";
import { oppdaterFaktumMedVerdier } from "../../utils";

export function lagreFaktum( faktum: Faktum ): FaktumActionTypes {
	return {
		type: FaktumActionTypeKeys.LAGRE_FAKTUM,
		faktum
	};
}

export function lagretFaktum(faktum: Faktum): FaktumActionTypes {
	return {
		type: FaktumActionTypeKeys.LAGRET_FAKTUM,
		faktum
	};
}

export function lagreFaktumFeilet(feilmelding: string): FaktumActionTypes {
	return {
		type: FaktumActionTypeKeys.FEILET,
		feilmelding
	};
}

export function setFaktum(faktum: Faktum): FaktaActionTypes {
	return {
		type: FaktumActionTypeKeys.OPPDATER_FAKTUM,
		faktum
	};
}

export function setFaktumVerdi(
	faktum: Faktum,
	verdi: string,
	property?: string
): FaktaActionTypes {
	return {
		type: FaktumActionTypeKeys.OPPDATER_FAKTUM,
		faktum: oppdaterFaktumMedVerdier(faktum, verdi, property)
	};
}

export function setFaktumIgnorert(faktum: Faktum, ignorert: boolean): FaktaActionTypes {
	return {
		type: FaktumActionTypeKeys.IGNORER_FAKTUM,
		faktum,
		ignorert
	};
}

interface OpprettFaktumType {
	key: string;
	parrentFaktum: number;
}

export function opprettFaktum(faktum: OpprettFaktumType | Faktum) {
	return {
		type: FaktumActionTypeKeys.OPPRETT_FAKTUM,
		faktum
	};
}

export function opprettetFaktum(faktum: Faktum): FaktumActionTypes {
	return {
		type: FaktumActionTypeKeys.OPPRETTET_FAKTUM,
		faktum
	};
}

export function opprettFaktumFeilet(feilmelding: string): FaktumActionTypes {
	return {
		type: FaktumActionTypeKeys.FEILET,
		feilmelding
	};
}

export function resetFakta() {
	return {
		type: FaktaActionTypeKeys.RESET_FAKTA
	};
}

export function slettFaktum(faktumId: number) {
	return {
		type: FaktumActionTypeKeys.SLETT_FAKTUM,
		faktumId
	};
}

export function slettetFaktum(): FaktumActionTypes {
	return {
		type: FaktumActionTypeKeys.SLETTET_FAKTUM
	};
}

export function slettFaktumFeilet(feilmelding: string): FaktumActionTypes {
	return {
		type: FaktumActionTypeKeys.FEILET,
		feilmelding
	};
}
