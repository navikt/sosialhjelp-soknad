import * as React from "react";
import {useTranslation} from "react-i18next";
import {KortSkjemaPage, SkjemaHeadings, SkjemaPage} from "./SkjemaSteg.tsx";
import {Stepper} from "@navikt/ds-react";
import {useCurrentSoknadIsKort} from "./useCurrentSoknadIsKort.tsx";

export const SkjemaStegStepper = ({
    page,
    onStepChange,
}: {
    page: SkjemaPage | KortSkjemaPage;
    onStepChange: (toPage: number) => Promise<unknown>;
}) => {
    const {t} = useTranslation("skjema");
    const kort = useCurrentSoknadIsKort();
    const numSteps = kort ? 4 : 8;

    return (
        <nav className={"w-full mx-auto"} aria-label={`hopp til søknadssteg (${numSteps} steg)`}>
            <Stepper className={"top-stepper"} activeStep={page} orientation={"horizontal"} onStepChange={onStepChange}>
                {[...Array(numSteps).keys()].map((key) => (
                    <Stepper.Step aria-label={`steg ${key + 1}`} key={key} as="button">
                        {t(SkjemaHeadings[page].tittel)}
                    </Stepper.Step>
                ))}
            </Stepper>
        </nav>
    );
};
