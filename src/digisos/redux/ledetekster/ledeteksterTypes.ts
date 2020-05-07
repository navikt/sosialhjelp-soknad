import {LedeteksterResponse} from "../soknad/soknadTypes";

export interface LedeteksterState {
    data: {};
}

export enum LedeteksterActionTypeKeys {
    LAGRE_LEDETEKSTER_PA_STORE = "ledetekster/LAGRE_LEDETEKSTER_PA_STORE",
}

export type LedeteksterAction = LagreLedeteksterPaStore;

interface LagreLedeteksterPaStore {
    type: LedeteksterActionTypeKeys.LAGRE_LEDETEKSTER_PA_STORE;
    ledeteksterResponse: LedeteksterResponse;
}
