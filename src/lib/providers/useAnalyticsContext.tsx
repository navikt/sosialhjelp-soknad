import {useContext} from "react";
import {DigisosContext} from "./DigisosContext.tsx";

export const useAnalyticsContext = () => {
    const context = useContext(DigisosContext)?.analytics;
    if (!context) throw new Error("useAnalyticsContext must be used within a AnalyticsProvider");
    return context;
};
