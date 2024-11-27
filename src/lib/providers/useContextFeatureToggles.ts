import {useContext} from "react";
import {DigisosContext} from "./DigisosContext.ts";

export const useContextFeatureToggles = () => {
    const context = useContext(DigisosContext)?.featureToggles;
    if (!context) throw new Error("useContextFeatureToggles must be used within a DigisosContext");
    return context;
};
