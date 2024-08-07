import {LINK_PAGE_PATH} from "../../constants";

export const getGotoParameter = ({pathname, search}: Pick<Location, "pathname" | "search">) => {
    // Hvis browseren allerede er på en redirect-side, vil vi beholde den opprinnelige goto-parameteren.
    const underlyingRedirectDestination = new URLSearchParams(search).get("goto");
    const hasUnderlyingRedirect = pathname === LINK_PAGE_PATH && !!underlyingRedirectDestination;

    // Vi dobbelt-dekoder goto-parameteren for å være bug-kompatible med login-api.
    // Kan forenkles når vi ikke lenger bruker login-api ved å erstatte
    // decodeURIComponent(underlyingRedirectDestination)
    // med underlyingRedirectDestination.
    return hasUnderlyingRedirect ? decodeURIComponent(underlyingRedirectDestination) : pathname;
};
