import * as React from "react";
import {useTranslation} from "react-i18next";
import {KortSkjemaPage, SkjemaHeadings, SkjemaPage} from "./SkjemaSteg";
import {Stepper} from "@navikt/ds-react";
import {useCurrentSoknadIsKort} from "./useCurrentSoknadIsKort.tsx";

export const SkjemaStegStepperV2 = ({
    page,
    onStepChange,
}: {
    page: SkjemaPage | KortSkjemaPage;
    onStepChange: (toPage: number) => Promise<unknown>;
}) => {
    const {t} = useTranslation("skjema");
    const kort = useCurrentSoknadIsKort();

    return (
        <div className={"max-w-md w-full mx-auto pb-10"}>
            <Stepper
                className={"top-stepper"}
                aria-label="Søknadssteg"
                activeStep={page}
                orientation={"horizontal"}
                onStepChange={onStepChange}
            >
                {[...Array(kort ? 4 : 8).keys()].map((key) => (
                    <Stepper.Step aria-label={`steg ${key}`} key={key} as="button">
                        {t(SkjemaHeadings[page].tittel)}
                    </Stepper.Step>
                ))}
            </Stepper>
        </div>
    );
};
