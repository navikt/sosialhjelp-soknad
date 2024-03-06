import {Dispatch, SetStateAction, useEffect, useState} from "react";

export type LocalStorageFlags = {
    // Test konvertering av filformater, overstyrer tilgjengeliggjorFlereFilformater dersom true
    testKonvertering?: true;
};

/**
 * Hook for bruk av feature flags fra local storage
 *
 * For å muliggjøre testing av feature flags i prod.
 */
export const useLocalStorageOverrides = (): {
    flags: LocalStorageFlags;
    setFlags: Dispatch<SetStateAction<LocalStorageFlags>>;
} => {
    const [flags, setFlags] = useState<LocalStorageFlags>(
        JSON.parse(localStorage.getItem("featureFlags") ?? "{}") as LocalStorageFlags
    );

    useEffect(() => {
        localStorage.setItem("featureFlags", JSON.stringify(flags));
    }, [flags]);

    return {flags, setFlags};
};
