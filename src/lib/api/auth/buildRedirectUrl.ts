import {linkPagePath} from "../../config";

export interface LocationFragment {
    origin: string;
    pathname: string;
    search: string;
}

export const buildRedirectUrl = ({origin, pathname, search}: LocationFragment) => {
    const redirectUrl = new URL(`${origin}${linkPagePath}`);

    // Hvis vi er på /link og har en goto-parameter, bevarer vi den.
    const goto = new URLSearchParams(search).get("goto");
    if (pathname === linkPagePath && goto) {
        redirectUrl.searchParams.set("goto", goto);
    }

    /** tester om dette fikser q0
    else {
        redirectUrl.searchParams.set("goto", `${pathname}${search}`);
    }
     */
    return redirectUrl.toString();
};
