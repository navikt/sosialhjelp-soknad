"use client";

import {ReactNode, useReducer, useState} from "react";
import {initialValideringState, valideringsReducer} from "../validering.ts";
import {AnalyticsData, DigisosContext} from "./DigisosContext.ts";
import {SupportedLanguage} from "../i18n/common.ts";
import {useGetSessionInfo} from "../../generated/informasjon-ressurs/informasjon-ressurs.ts";
import {useFeatureToggles} from "../../generated/feature-toggle-ressurs/feature-toggle-ressurs.ts";

interface Props {
    children: ReactNode;
    locale: SupportedLanguage;
}

export const DigisosContextProvider = ({children, locale}: Props) => {
    const [state, dispatch] = useReducer(valideringsReducer, initialValideringState);

    const [analyticsData, setAnalyticsDataState] = useState<AnalyticsData>({});
    const setAnalyticsData = (data: Partial<AnalyticsData>) => {
        setAnalyticsDataState((prevData) => ({
            ...prevData,
            ...data,
        }));
    };

    const {data: sessionInfo} = useGetSessionInfo({
        query: {retry: 0, throwOnError: (error) => error.response?.status === 403},
    });
    const {data: featureToggles} = useFeatureToggles({query: {retry: 0}});

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
                featureToggles: featureToggles,
                sessionInfo: sessionInfo,
                locale,
            }}
        >
            {children}
        </DigisosContext.Provider>
    );
};
