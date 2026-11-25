import {createContext, Dispatch} from "react";
import {ValideringActionTypes, ValideringState} from "../validering.ts";
import {SessionResponse} from "../../generated/model";
import {SupportedLanguage} from "../i18n/common.ts";

type TDigisosContext = {
    analytics: {
        analyticsData: Partial<AnalyticsData>;
        setAnalyticsData: (data: Partial<AnalyticsData>) => void;
    };
    validering: {
        state: ValideringState;
        dispatch: Dispatch<ValideringActionTypes>;
    };
    sessionInfo: SessionResponse;
    locale: SupportedLanguage;
};

export const DigisosContext = createContext<TDigisosContext | undefined>(undefined);

export type AnalyticsData = {
    selectedKategorier?: string[];
    situasjonEndret?: string;
};
