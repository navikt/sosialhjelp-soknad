"use client";
import {IToggle} from "@unleash/nextjs";
import {createContext, PropsWithChildren, useContext} from "react";

import {ExpectedToggles} from "./toggles";

const FlagContext = createContext<{toggles: IToggle[]}>({toggles: []});

export function FlagProvider({toggles, children}: PropsWithChildren<{toggles: IToggle[]}>) {
    return <FlagContext.Provider value={{toggles: toggles ?? []}}>{children}</FlagContext.Provider>;
}

export function useFlag(name: ExpectedToggles): IToggle {
    const {toggles} = useContext(FlagContext);
    return (
        toggles.find((toggle) => toggle.name === name) ?? {
            name,
            enabled: false,
            impressionData: false,
            variant: {name: "disabled", enabled: false},
        }
    );
}
