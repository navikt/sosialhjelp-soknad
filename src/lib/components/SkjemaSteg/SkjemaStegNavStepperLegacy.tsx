import {Stepper} from "@navikt/ds-react";
import * as React from "react";
import {DigisosSkjemaStegKey, SkjemaConfig, SkjemaSteg} from "./digisosSkjema";
import {useTranslation} from "react-i18next";
import {DigisosLanguageKey} from "../../i18n";

export const SkjemaStegNavStepperLegacy = ({
    skjemaConfig,
    aktivtSteg,
    onStepChange,
}: {
    skjemaConfig: SkjemaConfig;
    aktivtSteg: DigisosSkjemaStegKey;
    onStepChange: (steg: number, aktivtSteg?: SkjemaSteg) => void;
}) => {
    const steg = skjemaConfig.steg[aktivtSteg];
    const {t} = useTranslation("skjema");

    return (
        <div className={"max-w-md mx-auto w-full"}>
            <Stepper
                className={"top-stepper"}
                aria-label="Søknadssteg"
                activeStep={steg.id}
                orientation={"horizontal"}
                onStepChange={(s: number) => onStepChange(s, steg)}
            >
                {Object.entries(skjemaConfig.steg)
                    .filter(([_, s]) => s.type === "skjema")
                    .map(([key, _]) => (
                        <Stepper.Step aria-label={`steg ${key}`} key={key} as="button">
                            {t(`${key}.tittel` as DigisosLanguageKey)}
                        </Stepper.Step>
                    ))}
            </Stepper>
        </div>
    );
};
