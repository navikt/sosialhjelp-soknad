import {LedeteksterAction, LedeteksterActionTypeKeys} from "./ledeteksterTypes";
import {LedeteksterResponse} from "../soknad/soknadTypes";

export const lagreLedeteksterPaStore = (ledeteksterResponse: LedeteksterResponse): LedeteksterAction => {
    return {
        type: LedeteksterActionTypeKeys.LAGRE_LEDETEKSTER_PA_STORE,
        ledeteksterResponse,
    };
};
