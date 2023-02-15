import * as React from "react";
import {useTranslation} from "react-i18next";
import {SkjemaHeadings, SkjemaTrinn} from "./SkjemaSteg";
import {Stepper} from "@navikt/ds-react";

export const SkjemaStepper = ({
    steg,
    onStepChange,
}: {
    steg: SkjemaTrinn;
    onStepChange: (steg: number, aktivtSteg?: SkjemaTrinn) => void;
}) => {
    const {t} = useTranslation("skjema");

    return (
        <div className={"max-w-md mx-auto py-8"}>
            <Stepper
                className={"top-stepper"}
                aria-label="Søknadssteg"
                activeStep={steg}
                orientation={"horizontal"}
                onStepChange={(s: number) => onStepChange(s, steg)}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
                    <Stepper.Step key={key} as="button">
                        {t(SkjemaHeadings[steg].tittel)}
                    </Stepper.Step>
                ))}
            </Stepper>
        </div>
    );
};
