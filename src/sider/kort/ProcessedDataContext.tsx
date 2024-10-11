import React, {createContext, useContext, useState} from "react";

interface ProcessedData {
    selectedKategorier?: string[];
    situasjonEndret?: string;
}

interface ProcessedDataContextProps {
    processedData: ProcessedData;
    setProcessedData: (data: Partial<ProcessedData>) => void;
}

const ProcessedDataContext = createContext<ProcessedDataContextProps | undefined>(undefined);

export const ProcessedDataProvider = ({children}: {children: React.ReactNode}) => {
    const [processedData, setProcessedDataState] = useState<ProcessedData>({});

    const setProcessedData = (data: Partial<ProcessedData>) => {
        setProcessedDataState((prevData) => ({
            ...prevData,
            ...data,
        }));
    };

    return (
        <ProcessedDataContext.Provider value={{processedData, setProcessedData}}>
            {children}
        </ProcessedDataContext.Provider>
    );
};

export const useProcessedData = () => {
    const context = useContext(ProcessedDataContext);
    console.log("context", context);
    if (!context) {
        throw new Error("useProcessedData must be used within a ProcessedDataProvider");
    }
    return context;
};
