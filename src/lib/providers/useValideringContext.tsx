import {useContext} from "react";
import {DigisosContext} from "./DigisosContext.tsx";

export const useValideringContext = () => {
    const context = useContext(DigisosContext)?.validering;
    if (!context) {
        throw new Error("useValideringContext must be used within a ValideringContextProvider");
    }
    return context;
};
