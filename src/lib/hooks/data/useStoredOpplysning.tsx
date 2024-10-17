import {useState} from "react";
import {
    VedleggFrontend,
    VedleggRadFrontend,
    VedleggFrontendGruppe,
    VedleggFrontendType,
} from "../../../generated/model";

// A mock data store that could be replaced by a real backend API or local storage
const opplysningStore: Record<string, VedleggFrontend["rader"]> = {};

// Hook to manage saving and loading of opplysning data
export const useStoredOpplysning = (opplysningType: string) => {
    const [savedOpplysning, setSavedOpplysning] = useState<VedleggFrontend | null>(() => {
        // Load from store (this could be a backend or local storage)
        const rader = opplysningStore[opplysningType] || null;
        return rader
            ? {rader, gruppe: "defaultGruppe" as VedleggFrontendGruppe, type: "defaultType" as VedleggFrontendType}
            : null;
    });

    const saveOpplysning = (rader: VedleggRadFrontend[]) => {
        // Save to store
        opplysningStore[opplysningType] = rader;
        setSavedOpplysning({
            rader,
            gruppe: "defaultGruppe" as VedleggFrontendGruppe,
            type: "defaultType" as VedleggFrontendType,
        } as VedleggFrontend); // Update state
    };

    return {
        savedOpplysning,
        saveOpplysning,
    };
};
