import {useState} from "react";
import {
    VedleggFrontend,
    VedleggRadFrontend,
    VedleggFrontendGruppe,
    VedleggFrontendType,
} from "../../../generated/model";

// A mock data store that could be replaced by a real backend API or local storage
const mockOpplysningStore: Record<string, VedleggFrontend["rader"]> = {};

// Hook to manage saving and loading of opplysning data
export const useStoredOpplysning = (opplysningType: string) => {
    const [savedOpplysning, setSavedOpplysning] = useState<VedleggFrontend | null>(() => {
        // Load from store (this could be a backend or local storage)
        const rader = mockOpplysningStore[opplysningType] || null;
        return rader
            ? {rader, gruppe: "defaultGruppe" as VedleggFrontendGruppe, type: "defaultType" as VedleggFrontendType}
            : null;
    });

    const saveOpplysning = (rader: VedleggRadFrontend[]) => {
        // Save to store
        mockOpplysningStore[opplysningType] = rader;
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
