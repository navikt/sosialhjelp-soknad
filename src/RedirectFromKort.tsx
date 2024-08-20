import useIsKort from "./lib/hooks/data/useIsKort.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import * as React from "react";

export const RedirectFromKort = () => {
    const {data: isKortSoknad, isError, isLoading} = useIsKort();

    const location = useLocation();

    if (isError || (location.pathname?.includes("/kort") && !isLoading && !isKortSoknad)) {
        return <Navigate to={`${location.pathname.replace("/kort", "")}`} replace></Navigate>;
    }
    return <Outlet />;
};
