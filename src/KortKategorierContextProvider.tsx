import React, {createContext, useContext, useState} from "react";
import {VedleggFrontendType} from "./generated/model";

interface ValgtKategoriData {
    valgtKategorier?: VedleggFrontendType;
    sokersTekst?: string;
}

interface KategoriContextProviderProps {
    valgtKategoriData: ValgtKategoriData;
    setValgtKategoriData: (data: Partial<ValgtKategoriData>) => void;
}

const ValgtKategoriContextProvider = createContext<KategoriContextProviderProps | undefined>(undefined);

export const ValgtKategoriProvider = ({children}: {children: React.ReactNode}) => {
    const [valgtKategoriData, setKategoriDataState] = useState<ValgtKategoriData>({});

    const setValgtKategoriData = (data: Partial<ValgtKategoriData>) => {
        setKategoriDataState((prevData) => ({
            ...prevData,
            ...data,
        }));
    };

    return (
        <ValgtKategoriContextProvider.Provider value={{valgtKategoriData, setValgtKategoriData}}>
            {children}
        </ValgtKategoriContextProvider.Provider>
    );
};

export const useValgtKategoriContext = () => {
    const context = useContext(ValgtKategoriContextProvider);
    if (!context) {
        throw new Error("useKategoriContext must be used within a KategoriProvider");
    }
    return context;
};
