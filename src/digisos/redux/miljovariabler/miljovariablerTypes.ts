import {MiljovariablerResponse} from "../soknad/soknadTypes";

export interface MiljovariablerState {
	data: {}
}

export enum MiljovariablerActionTypeKeys {
	LAGRE_MILJOVARIABLER_PA_STORE = "miljovariabler/LAGRE_MILJOVARIABLER_PA_STORE"
}

export type MiljovariablerAction =
	| LagreMiljovariablerPaStore

interface LagreMiljovariablerPaStore {
	type: MiljovariablerActionTypeKeys.LAGRE_MILJOVARIABLER_PA_STORE;
	miljovariablerResponse: MiljovariablerResponse;
}
