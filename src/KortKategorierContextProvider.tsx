import React, {useContext} from "react";
import {VedleggFrontendType} from "./generated/model";

export const ValgtKategoriContext = React.createContext<{
    valgtKategoriData: {valgtKategorier: VedleggFrontendType};
    setValgtKategoriData: React.Dispatch<React.SetStateAction<{valgtKategorier: VedleggFrontendType}>>;
} | null>(null);

export const ValgtKategoriProvider = ({children}: {children: React.ReactNode}) => {
    const [valgtKategoriData, setValgtKategoriData] = React.useState<{
        valgtKategorier: VedleggFrontendType;
    }>({valgtKategorier: "annet|annet"});

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
