import {redirect} from "react-router-dom";
import {BASE_PATH} from "../../constants";
import {removeBasePath} from "./removeBasePath";

export const redirectToGotoSearchParameter = async () => {
    const gotoParam = new URLSearchParams(window.location.search).get("goto");
    return redirect(removeBasePath(gotoParam, BASE_PATH) ?? "/");
};
