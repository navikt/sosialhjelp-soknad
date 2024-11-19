import {createContext, Dispatch} from "react";
import {ValideringActionTypes, ValideringState} from "../validering.ts";

type TDigisosContext = {
    analytics: {
        analyticsData: Partial<AnalyticsData>;
        setAnalyticsData: (data: Partial<AnalyticsData>) => void;
    };
    validering: {
        state: ValideringState;
        dispatch: Dispatch<ValideringActionTypes>;
    };
};

export const DigisosContext = createContext<TDigisosContext | undefined>(undefined);

export type AnalyticsData = {
    selectedKategorier?: string[];
    situasjonEndret?: string;
};
