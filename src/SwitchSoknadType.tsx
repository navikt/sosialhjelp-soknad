import useIsKort from "./lib/hooks/data/useIsKort.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import * as React from "react";

export const SwitchSoknadType = () => {
    const {data: isKortSoknad, isError, isLoading} = useIsKort();

    const location = useLocation();

    if (isError) {
        throw new Error("Feil ved henting av søknadstype");
    }

    if (location.pathname?.includes("/kort") && !isLoading && !isKortSoknad) {
        return <Navigate to={location.pathname.replace("/kort", "")} replace />;
    }

    if (!location.pathname?.includes("/kort") && !isLoading && !!isKortSoknad) {
        return <Navigate to={location.pathname.replace("skjema/", "skjema/kort/")} replace />;
    }
    return <Outlet />;
};
