import {UnauthorizedMelding} from "../../../generated/model";
import {basePath} from "../../config";
import {logError} from "../../log/loggerUtils";

export const buildLoginUrl = async (unauthError: UnauthorizedMelding, {origin, pathname, search}: Location) => {
    if (!unauthError) {
        await logError(`401-feil uten data`);
        throw new Error(`401-feil uten data`);
    }
    const loginURLObj = new URL(unauthError.loginUrl);
    const nextHop = pathname === `${basePath}/link` ? new URLSearchParams(search).get("goto") : pathname;
    loginURLObj.searchParams.set("redirect", `${origin}${basePath}/link?goto=${nextHop}`);
    return loginURLObj.toString();
};
