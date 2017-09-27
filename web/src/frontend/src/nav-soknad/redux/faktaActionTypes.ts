import { ValideringActionTypes } from "./valideringActionTypes";
import { FaktumActionTypes } from "./faktaReducer";

export type FaktaActionTypes = FaktumActionTypes | ValideringActionTypes;

export enum FaktumActionTypeKeys {
	OPPDATER_FAKTUM = "faktum/OPPDATER_FAKTUM",
	OPPDATERT_FAKTUM = "faktum/OPPDATERT_FAKTUM",
	OPPRETT_FAKTUM = "faktum/OPPRETT_FAKTUM",
	OPPRETTET_FAKTUM = "faktum/OPPRETTET_FAKTUM",
	FEILET = "faktum/FEILET",
	OTHER_ACTION = "__any_other_action_type__",
	VALIDER_FAKTUM = "VALIDER_FAKTUM",
	PROGRESJON_LAGRES = "PROGRESJON_LAGRES",
	PROGRESJON_LAGRET = "PROGRESJON_LAGRET"
}

export enum FaktaActionTypeKeys {
	SET_FAKTA = "SET_FAKTA",
	OTHER_ACTION = "__any_other_action_type__"
}
