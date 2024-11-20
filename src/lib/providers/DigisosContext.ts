import {createContext, Dispatch} from "react";
import {ValideringActionTypes, ValideringState} from "../validering.ts";
import {FeatureToggles200, SessionResponse} from "../../generated/model/index.ts";

type TDigisosContext = {
    analytics: {
        analyticsData: Partial<AnalyticsData>;
        setAnalyticsData: (data: Partial<AnalyticsData>) => void;
    };
    validering: {
        state: ValideringState;
        dispatch: Dispatch<ValideringActionTypes>;
    };
    featureToggles: FeatureToggles200;
    sessionInfo: SessionResponse;
};

export const DigisosContext = createContext<TDigisosContext | undefined>(undefined);

export type AnalyticsData = {
    selectedKategorier?: string[];
    situasjonEndret?: string;
};
