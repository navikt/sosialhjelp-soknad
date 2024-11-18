import React, {createContext, useContext, useState} from "react";

interface AnalyticsData {
    selectedKategorier?: string[];
    situasjonEndret?: string;
}

interface AnalyticsContextProviderProps {
    analyticsData: AnalyticsData;
    setAnalyticsData: (data: Partial<AnalyticsData>) => void;
}

const AnalyticsContextProvider = createContext<AnalyticsContextProviderProps | undefined>(undefined);

export const AnalyticsProvider = ({children}: {children: React.ReactNode}) => {
    const [analyticsData, setAnalyticsDataState] = useState<AnalyticsData>({});

    const setAnalyticsData = (data: Partial<AnalyticsData>) => {
        setAnalyticsDataState((prevData) => ({
            ...prevData,
            ...data,
        }));
    };

    return (
        <AnalyticsContextProvider.Provider value={{analyticsData, setAnalyticsData}}>
            {children}
        </AnalyticsContextProvider.Provider>
    );
};

export const useAnalyticsContext = () => {
    const context = useContext(AnalyticsContextProvider);
    if (!context) {
        throw new Error("useAnalyticsContext must be used within a AnalyticsProvider");
    }
    return context;
};
