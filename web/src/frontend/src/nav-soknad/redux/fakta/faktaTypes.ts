import { Faktum } from "../../types";
import { FaktaActionTypeKeys, FaktumActionTypeKeys } from "./faktaActionTypes";

export interface FaktumComponentProps {
	fakta: Faktum[];
}

export type FaktumActionTypes =
	| LagreFaktum
	| LagretFaktum
	| OppdaterFaktumVerdi
	| OpprettFaktum
	| OpprettetFaktum
	| SlettFaktum
	| SlettetFaktum
	| SetFaktaAction
	| SetFaktumFailedAction
	| SetFaktumIgnorert
	| ResetFaktaAction;

interface ResetFaktaAction {
	type: FaktaActionTypeKeys.RESET_FAKTA;
}

interface OppdaterFaktumVerdi {
	type: FaktumActionTypeKeys.OPPDATER_FAKTUM;
	faktum: Faktum;
}

export interface LagreFaktum {
	type: FaktumActionTypeKeys.LAGRE_FAKTUM;
	faktum: Faktum;
}

interface LagretFaktum {
	type: FaktumActionTypeKeys.LAGRET_FAKTUM;
	faktum: Faktum;
}

export interface OpprettFaktumType {
	key: string;
	parrentFaktum: number;
}

export interface OpprettFaktum {
	type: FaktumActionTypeKeys.OPPRETT_FAKTUM;
	faktum: OpprettFaktumType | Faktum;
}

interface OpprettetFaktum {
	type: FaktumActionTypeKeys.OPPRETTET_FAKTUM;
	faktum: Faktum;
}

export interface SlettFaktum {
	type: FaktumActionTypeKeys.SLETT_FAKTUM;
	faktumId: number;
}

interface SlettetFaktum {
	type: FaktumActionTypeKeys.SLETTET_FAKTUM;
}

interface SetFaktaAction {
	type: FaktaActionTypeKeys.SET_FAKTA;
	fakta: Faktum[];
}

export interface SetFaktumFailedAction {
	type: FaktumActionTypeKeys.FEILET;
	feilmelding: string;
}

interface SetFaktumIgnorert {
	type: FaktumActionTypeKeys.IGNORER_FAKTUM;
	faktum: Faktum;
	ignorert: boolean;
}
