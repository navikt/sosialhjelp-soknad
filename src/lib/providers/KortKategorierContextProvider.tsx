import React, {useContext} from "react";
import {DokumentasjonDtoType} from "../../generated/new/model";

interface ValgtKategoriData {
    valgtKategorier?: DokumentasjonDtoType;
    sokersTekst?: string;
}

interface KategoriContextProviderProps {
    valgtKategoriData: ValgtKategoriData;
    setValgtKategoriData: (data: Partial<ValgtKategoriData>) => void;
}

const ValgtKategoriContext = React.createContext<KategoriContextProviderProps | undefined>(undefined);

export const ValgtKategoriProvider = ({children}: {children: React.ReactNode}) => {
    const [valgtKategoriData, setKategoriDataState] = React.useState<ValgtKategoriData>({});

    const setValgtKategoriData = (data: Partial<ValgtKategoriData>) => {
        setKategoriDataState((prevData) => ({
            ...prevData,
            ...data,
            valgtKategorier: data.valgtKategorier || "UTGIFTER_ANDRE_UTGIFTER",
        }));
    };

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
