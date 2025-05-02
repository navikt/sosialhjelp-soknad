import * as React from "react";
import {useTranslation} from "react-i18next";
import {Checkbox, CheckboxGroup} from "@navikt/ds-react";
import {useBarneutgifter} from "../../lib/hooks/data/useBarneutgifter";
import {BarneutgifterDto} from "../../generated/new/model";

const UTGIFTSTYPER = [
    {languageKey: "fritidsaktiviteter", value: "hasFritidsaktiviteter"},
    {languageKey: "barnehage", value: "hasBarnehage"},
    {languageKey: "sfo", value: "hasSfo"},
    {languageKey: "tannregulering", value: "hasTannregulering"},
    {languageKey: "annet", value: "hasAnnenUtgiftBarn"},
] as const;

export const Barneutgifter = () => {
    const {barneutgifter, setBarneutgifter} = useBarneutgifter();
    const {t} = useTranslation("skjema");

    if (!barneutgifter || !barneutgifter.hasForsorgerplikt) return null;

    return (
        <div className={"space-y-2"}>
            <CheckboxGroup
                legend={t("utgifter.barn.sporsmal")}
                onChange={(navn: (keyof Omit<BarneutgifterDto, "hasBekreftelse" | "hasForsorgerplikt">)[]) =>
                    setBarneutgifter(navn)
                }
                description={t("utgifter.barn.infotekst.tekst")}
                value={Object.keys(barneutgifter).filter((key) => barneutgifter[key as keyof BarneutgifterDto])}
            >
                {UTGIFTSTYPER.map(({value, languageKey}) => (
                    <Checkbox key={value} value={value}>
                        {t(`utgifter.barn.typer.${languageKey}`)}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        </div>
    );
};
