"use client";
import {ReactNode, useEffect, useReducer, useState} from "react";
import {initialValideringState, valideringsReducer} from "../validering.ts";
import {AnalyticsData, DigisosContext} from "./DigisosContext.ts";
import {featureToggles as getFeatureToggles} from "../../generated/feature-toggle-ressurs/feature-toggle-ressurs.ts";
import {SessionResponse} from "../../generated/model/sessionResponse.ts";
import {FeatureToggles200} from "../../generated/model/featureToggles200.ts";
import {SupportedLanguage} from "../i18n/common.ts";
import {getSessionInfo} from "../../generated/informasjon-ressurs/informasjon-ressurs.ts";

export const DigisosContextProvider = ({children, locale}: {children: ReactNode; locale: SupportedLanguage}) => {
    const [state, dispatch] = useReducer(valideringsReducer, initialValideringState);

    const [analyticsData, setAnalyticsDataState] = useState<AnalyticsData>({});
    const setAnalyticsData = (data: Partial<AnalyticsData>) => {
        setAnalyticsDataState((prevData) => ({
            ...prevData,
            ...data,
        }));
    };

    const [sessionInfo, setSessionInfo] = useState<SessionResponse | null>();
    useEffect(() => {
        getSessionInfo().then(setSessionInfo);
    }, []);
    const [featureToggles, setFeatureToggles] = useState<FeatureToggles200 | null>({});
    useEffect(() => {
        getFeatureToggles().then(setFeatureToggles);
    }, []);
    if (!sessionInfo || !featureToggles) return null;

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
                featureToggles: featureToggles!,
                sessionInfo: sessionInfo!,
                locale,
            }}
        >
            {children}
        </DigisosContext.Provider>
    );
};
