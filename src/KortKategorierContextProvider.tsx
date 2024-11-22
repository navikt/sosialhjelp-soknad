import React, {/*createContext,*/ useContext /*, useEffect, useState*/} from "react";
import {VedleggFrontendType} from "./generated/model";

//interface ValgtKategoriData {
//    valgtKategorier?: VedleggFrontendType;
//    sokersTekst?: string;
//}

//interface KategoriContextProviderProps {
//    valgtKategoriData: ValgtKategoriData;
//    setValgtKategoriData: (data: Partial<ValgtKategoriData>) => void;
//}

export const ValgtKategoriContext = React.createContext<{
    valgtKategoriData: {valgtKategorier: VedleggFrontendType};
    setValgtKategoriData: React.Dispatch<React.SetStateAction<{valgtKategorier: VedleggFrontendType}>>;
} | null>(null);

export const ValgtKategoriProvider = ({children}: {children: React.ReactNode}) => {
    const [valgtKategoriData, setValgtKategoriData] = React.useState<{
        valgtKategorier: VedleggFrontendType;
    }>({valgtKategorier: "annet|annet"});

    //useEffect(() => {
    //    console.log("updated valgtKategoriData", valgtKategoriData);
    //}, [valgtKategoriData]);

    return (
        <ValgtKategoriContext.Provider value={{valgtKategoriData, setValgtKategoriData}}>
            {children}
        </ValgtKategoriContext.Provider>
    );
};

export const useValgtKategoriContext = () => {
    const context = useContext(ValgtKategoriContext);
    if (!context) {
        throw new Error("useKategoriContext must be used within a KategoriProvider");
    }
    return context;
};
