import {redirect} from "react-router-dom";
import {basePath} from "../../config";

const removeBasePath = (str: string | null, prefix: string) => {
    if (!str) return null;
    const isPrefixed = str.startsWith(prefix);
    const path = isPrefixed ? str.substring(prefix.length) : str;
    return path.length ? path : null;
};

export const redirectToGotoSearchParameter = async () => {
    const gotoParam = new URLSearchParams(window.location.search).get("goto");
    return redirect(removeBasePath(gotoParam, basePath) ?? "/");
};
