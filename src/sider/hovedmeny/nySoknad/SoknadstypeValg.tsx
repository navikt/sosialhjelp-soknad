import {useFlag} from "../../../featuretoggles/context.tsx";
import {Box, Radio, RadioGroup} from "@navikt/ds-react";
import * as React from "react";

interface SoknadstypeValgProps {
    valg: "kort" | "standard" | undefined;
    setValg: (valg: "kort" | "standard") => void;
}

export const SoknadstypeValg = ({valg, setValg}: SoknadstypeValgProps) => {
    const visValg = useFlag("sosialhjelp.soknad.soknadstypeValg").enabled;
    if (!visValg) return null;

    return (
        <Box className={"flex justify-center mb-8"}>
            <RadioGroup
                legend={"Velg søknadstype (kun for testing)"}
                value={valg ?? null}
                onChange={(value) => setValg(value)}
            >
                <div className="bg-ax-bg-info-moderate p-2 rounded-md">
                    <Radio value={"standard"}>Standard</Radio>
                    <Radio value={"kort"}>Kort</Radio>
                </div>
            </RadioGroup>
        </Box>
    );
};
