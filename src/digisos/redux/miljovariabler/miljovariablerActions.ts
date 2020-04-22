import {MiljovariablerActionTypeKeys, MiljovariablerAction} from "./miljovariablerTypes";
import {MiljovariablerResponse} from "../soknad/soknadTypes";

export const lagreMiljovariablerPaStore = (miljovariablerResponse: MiljovariablerResponse): MiljovariablerAction => {
    return {
        type: MiljovariablerActionTypeKeys.LAGRE_MILJOVARIABLER_PA_STORE,
        miljovariablerResponse,
    };
};
