import {UnauthorizedMelding} from "../../../generated/model";
import {logError} from "../../utils/loggerUtils";
import {buildLoginUrl} from "./buildLoginUrl";

export const redirectToLogin = async (unauthError?: UnauthorizedMelding) => {
    if (!unauthError) {
        await logError(`401-feil uten data`);
        throw new Error(`401-feil uten data`);
    }

    window.location.href = buildLoginUrl(unauthError, window.location);
};
