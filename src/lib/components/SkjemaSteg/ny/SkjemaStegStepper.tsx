import * as React from "react";
import {useTranslation} from "react-i18next";
import {SkjemaHeadings, SkjemaStegContext} from "./SkjemaSteg";
import {Stepper} from "@navikt/ds-react";
import {useContext} from "react";
import {logError} from "../../../log/loggerUtils";

export const SkjemaStegStepper = () => {
    const {t} = useTranslation("skjema");
    const context = useContext(SkjemaStegContext);

    if (context === null) {
        logError("<SkjemaStegStepper/> must be used inside <SkjemaSteg />");
        return null;
    }

    const {page, requestNavigation, kort} = context;

    return (
        <div className={"max-w-md w-full mx-auto"}>
            <Stepper
                className={"top-stepper"}
                aria-label="Søknadssteg"
                activeStep={page}
                orientation={"horizontal"}
                onStepChange={(s: number) => requestNavigation(s)}
            >
                {[...Array(kort ? 3 : 8).keys()].map((key) => (
                    <Stepper.Step aria-label={`steg ${key}`} key={key} as="button">
                        {t(SkjemaHeadings[page].tittel)}
                    </Stepper.Step>
                ))}
            </Stepper>
        </div>
    );
};
