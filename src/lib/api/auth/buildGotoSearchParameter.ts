import {linkPagePath} from "../../config";

export const buildGotoSearchParameter = ({pathname, search}: Pick<Location, "pathname" | "search">) => {
    // Hvis browseren allerede er på en redirect-side, vil vi beholde den opprinnelige goto-parameteren.
    const underlyingRedirectDestination = new URLSearchParams(search).get("goto");
    const hasUnderlyingRedirect = pathname === linkPagePath && !!underlyingRedirectDestination;

    const searchParams = new URLSearchParams();

    searchParams.set("goto", hasUnderlyingRedirect ? underlyingRedirectDestination : pathname);

    return searchParams.toString();
};
