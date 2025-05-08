import {useContext, useEffect, useState} from "react";
import {DigisosContext} from "./DigisosContext.ts";
import {getSessionInfo} from "../../generated/informasjon-controller/informasjon-controller.ts";

export const useContextSessionInfo = () => {
    const context = useContext(DigisosContext);
    if (!context) throw new Error("useContextSessionInfo must be used within a DigisosContext");

    const [sessionInfo, setSessionInfo] = useState(context.sessionInfo);

    useEffect(() => {
        getSessionInfo().then(setSessionInfo);
    }, [window.location.pathname]);

    return sessionInfo;
};
