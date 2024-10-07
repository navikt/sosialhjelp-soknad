import * as React from "react";
import {useTranslation} from "react-i18next";
import {KortSkjemaPage, SkjemaHeadings, SkjemaPage} from "./SkjemaSteg";
import {Stepper} from "@navikt/ds-react";

export const SkjemaStegStepper = ({
    page,
    requestNavigation,
    kort,
}: {
    page: SkjemaPage | KortSkjemaPage;
    requestNavigation: (toPage: number) => Promise<void>;
    kort: boolean;
}) => {
    const {t} = useTranslation("skjema");

    return (
        <div className={"max-w-md w-full mx-auto"}>
            <Stepper
                className={"top-stepper"}
                aria-label="Søknadssteg"
                activeStep={page}
                orientation={"horizontal"}
                onStepChange={(s: number) => requestNavigation(s)}
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
