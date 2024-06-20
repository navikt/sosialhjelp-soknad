import {redirect} from "react-router-dom";
import {basePath} from "../../config";
import {removeBasePath} from "./removeBasePath";

export const redirectToGotoSearchParameter = async () => {
    const gotoParam = new URLSearchParams(window.location.search).get("goto");
    return redirect(removeBasePath(gotoParam, basePath) ?? "/");
};
