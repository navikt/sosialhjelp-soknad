import * as React from "react";
import {useTranslation} from "react-i18next";
import {SkjemaHeadings, SkjemaStegContext} from "./SkjemaSteg";
import {Stepper} from "@navikt/ds-react";
import {useContext} from "react";
import {logError} from "../../../utils/loggerUtils";

export const SkjemaStegStepper = () => {
    const {t} = useTranslation("skjema");
    const context = useContext(SkjemaStegContext);

    if (context === null) {
        logError("<SkjemaSteg.Stepper/> must be used inside <SkjemaSteg.Container />");
        return null;
    }

    const {page, requestNavigation} = context;

    return (
        <div className={"max-w-md mx-auto"}>
            <Stepper
                className={"py-8 top-stepper"}
                aria-label="Søknadssteg"
                activeStep={page}
                orientation={"horizontal"}
                onStepChange={(s: number) => requestNavigation(s)}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
                    <Stepper.Step aria-label={`steg ${key}`} key={key} as="button">
                        {t(SkjemaHeadings[page].tittel)}
                    </Stepper.Step>
                ))}
            </Stepper>
        </div>
    );
};
