"use client";
import {ReactNode, useReducer, useState} from "react";
import {initialValideringState, valideringsReducer} from "../validering.ts";
import {AnalyticsData, DigisosContext} from "./DigisosContext.ts";
import {SessionResponse} from "../../generated/model/sessionResponse.ts";
import {FeatureToggles200} from "../../generated/model/featureToggles200.ts";

export const DigisosContextProvider = ({
    children,
    initialData: {featureToggles, sessionInfo},
}: {
    children: ReactNode;
    initialData: {sessionInfo: SessionResponse; featureToggles: FeatureToggles200};
}) => {
    const [state, dispatch] = useReducer(valideringsReducer, initialValideringState);

    const [analyticsData, setAnalyticsDataState] = useState<AnalyticsData>({});
    const setAnalyticsData = (data: Partial<AnalyticsData>) => {
        setAnalyticsDataState((prevData) => ({
            ...prevData,
            ...data,
        }));
    };

    return (
        <DigisosContext.Provider
            value={{
                analytics: {
                    analyticsData,
                    setAnalyticsData,
                },
                validering: {
                    state,
                    dispatch,
                },
                featureToggles,
                sessionInfo,
            }}
        >
            {children}
        </DigisosContext.Provider>
    );
};
