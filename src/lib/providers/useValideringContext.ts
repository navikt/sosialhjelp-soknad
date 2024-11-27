import {useContext} from "react";
import {DigisosContext} from "./DigisosContext.ts";

export const useValideringContext = () => {
    const context = useContext(DigisosContext)?.validering;
    if (!context) throw new Error("useValideringContext must be used within a DigisosContext");
    return context;
};
