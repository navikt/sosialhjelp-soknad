import * as React from "react";
import {BodyShort, Checkbox, CheckboxGroup, Heading} from "@navikt/ds-react";
import {LocalStorageFlags, useLocalStorageOverrides} from "../lib/useLocalStorageOverrides";

// Convert to a list of those flags which are true
const getTrueKeys = (flags: LocalStorageFlags): (keyof LocalStorageFlags)[] =>
    Object.keys(flags).filter((key): key is keyof LocalStorageFlags => flags[key as keyof LocalStorageFlags] === true);

// Convert a list of true keys to a flags object
const changeFlags = (keys: (keyof LocalStorageFlags)[]) => {
    const flags: LocalStorageFlags = {};
    keys.forEach((key) => (flags[key] = true));
    return flags;
};

export const DebugPanel = () => {
    const {flags, setFlags} = useLocalStorageOverrides();

    return (
        <div className={"w-full max-w-4xl mx-auto"}>
            <Heading level={"2"} size={"large"} spacing>
                Debugpanel
            </Heading>
            <BodyShort spacing>Kun for bruk i utvikling.</BodyShort>
            <CheckboxGroup
                legend={"Feature flags"}
                defaultValue={getTrueKeys(flags)}
                onChange={(keys) => setFlags(changeFlags(keys))}
            >
                <Checkbox value={"testKonvertering"}>Test konvertering</Checkbox>
            </CheckboxGroup>
        </div>
    );
};
