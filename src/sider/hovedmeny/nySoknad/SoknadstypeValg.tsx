import {useConfigFeatureFlags} from "../../../lib/config.ts";
import {Box, Radio, RadioGroup} from "@navikt/ds-react";
import * as React from "react";

interface SoknadstypeValgProps {
    valg: "kort" | "standard" | undefined;
    setValg: (valg: "kort" | "standard") => void;
}

export const SoknadstypeValg = ({valg, setValg}: SoknadstypeValgProps) => {
    if (!useConfigFeatureFlags().soknadstypeValg) return null;

    return (
        <Box className={"flex justify-center mb-8"}>
            <RadioGroup legend={"Velg søknadstype"} value={valg ?? null} onChange={(value) => setValg(value)}>
                <div className="bg-ax-bg-info-soft p-2 rounded-md">
                    <Radio value={"standard"}>Standard</Radio>
                    <Radio value={"kort"}>Kort</Radio>
                </div>
            </RadioGroup>
        </Box>
    );
};
