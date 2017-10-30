import { FaktumActionTypes } from "./faktaTypes";

export type FaktaActionTypes = FaktumActionTypes;

export enum FaktumActionTypeKeys {
	OPPDATER_FAKTUM = "faktum/OPPDATER_FAKTUM",
	LAGRE_FAKTUM = "faktum/LAGRE_FAKTUM",
	LAGRET_FAKTUM = "faktum/LAGRET_FAKTUM",
	OPPRETT_FAKTUM = "faktum/OPPRETT_FAKTUM",
	OPPRETTET_FAKTUM = "faktum/OPPRETTET_FAKTUM",
	SLETT_FAKTUM = "faktum/SLETT_FAKTUM",
	SLETTET_FAKTUM = "faktum/SLETTET_FAKTUM",
	FEILET = "faktum/FEILET",
	OTHER_ACTION = "__any_other_action_type__",
	VALIDER_FAKTUM = "VALIDER_FAKTUM",
	IGNORER_FAKTUM = "faktum/IGNORER_FAKTUM"
}

export enum FaktaActionTypeKeys {
	SET_FAKTA = "SET_FAKTA",
	OTHER_ACTION = "__any_other_action_type__",
	RESET_FAKTA = "RESET_FAKTA"
}
