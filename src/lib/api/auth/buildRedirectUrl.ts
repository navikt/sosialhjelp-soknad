import {linkPagePath} from "../../config";

export interface LocationFragment {
    origin: string;
    pathname: string;
    search: string;
}

export const buildRedirectUrl = ({origin, pathname, search}: LocationFragment) => {
    const redirectUrl = new URL(`${origin}${pathname}`);

    // Hvis vi er på /link og har en goto-parameter, bevarer vi den.
    const goto = new URLSearchParams(search).get("goto");
    if (pathname === linkPagePath && goto) redirectUrl.searchParams.set("goto", goto);

    return redirectUrl.toString();
};
