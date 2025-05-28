"use client";

import {ReactNode, useReducer, useState} from "react";
import {initialValideringState, valideringsReducer} from "../validering.ts";
import {AnalyticsData, DigisosContext} from "./DigisosContext.ts";
import {SupportedLanguage} from "../i18n/common.ts";
import {useGetSessionInfo} from "../../generated/informasjon-ressurs/informasjon-ressurs.ts";
import {useFeatureToggles} from "../../generated/feature-toggle-ressurs/feature-toggle-ressurs.ts";
import {Loader} from "@navikt/ds-react";

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

    const {data: sessionInfo, isLoading: isSessionLoading} = useGetSessionInfo({query: {retry: 0}});
    const {data: featureToggles, isLoading: isTogglesLoading} = useFeatureToggles({query: {retry: 0}});

    if (isSessionLoading || isTogglesLoading) {
        return <Loader />;
    }

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
