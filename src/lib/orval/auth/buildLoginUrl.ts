import {UnauthorizedMelding} from "../../../generated/model";
import {basePath} from "../../config";

import {parseGotoValueFromSearchParameters} from "./parseGotoValueFromSearchParameters";

export const buildLoginUrl = ({loginUrl}: UnauthorizedMelding, {origin, pathname, search}: Location) => {
    const loginURLObj = new URL(loginUrl);
    const nextHop = pathname === `${basePath}/link` ? parseGotoValueFromSearchParameters(search) : pathname;
    loginURLObj.searchParams.set("redirect", `${origin}${basePath}/link?goto=${nextHop}`);
    return loginURLObj.toString();
};
