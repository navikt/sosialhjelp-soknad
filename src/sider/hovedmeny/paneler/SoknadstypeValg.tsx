import {useConfigFeatureFlags} from "../../../lib/config.ts";
import {Box, Radio, RadioGroup} from "@navikt/ds-react";
import * as React from "react";

interface SoknadstypeValgProps {
    valg: "kort" | "standard" | null;
    setValg: (valg: "kort" | "standard") => void;
}

export const SoknadstypeValg = ({valg, setValg}: SoknadstypeValgProps) => {
    if (!useConfigFeatureFlags().soknadstypeValg) return null;

    return (
        <Box className={"flex justify-center mb-8"}>
            <RadioGroup legend={"Velg søknadstype"} value={valg} onChange={(value) => setValg(value)}>
                <div className="bg-lightblue-50 p-2 rounded-md">
                    <Radio value={"standard"}>Standard</Radio>
                    <Radio value={"kort"}>Kort</Radio>
                </div>
            </RadioGroup>
        </Box>
    );
};
