// This function derives the goto parameter from a Request.url string.
// To mitigate circular redirect bugs, it will redirect to the base path if the goto parameter is "/link".
// @returns BASE_PATH if the goto parameter is null or "/link". Otherwise, the goto parameter minus the trailing slash.
import {BASE_PATH} from "../../../lib/constants.ts";
import getLogger from "@log/logger";

export const getUrlFromGoto = (gotoParam: string | null) => {
    if (gotoParam === null) return BASE_PATH;

    const gotoParamMinusTrailingSlash = gotoParam.replace(/\/$/, "");

    if (!gotoParamMinusTrailingSlash.length) {
        getLogger().warn(`/link got goto=/, redirecting to ${BASE_PATH}`);
        return BASE_PATH;
    }

    // escape infinite redirect loop
    if (gotoParamMinusTrailingSlash === `${BASE_PATH}/link`) {
        getLogger().warn(`infinite redirect loop detected, redirecting to ${BASE_PATH}`);
        return BASE_PATH;
    }

    return gotoParamMinusTrailingSlash;
};
