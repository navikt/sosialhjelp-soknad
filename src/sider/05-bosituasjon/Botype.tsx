import * as React from "react";
import {useBosituasjon} from "../../lib/hooks/data/useBosituasjon";
import {NyttUnderskjema} from "./NyttUnderskjema";
import {useTranslation} from "react-i18next";
import {Radio, RadioGroup} from "@navikt/ds-react";
import {BosituasjonDtoBotype} from "../../generated/new/model";

const ANDRE_BOTYPER = ["INSTITUSJON", "KRISESENTER", "FENGSEL", "VENNER", "FORELDRE", "FAMILIE"] as const;
type AnnenBotype = (typeof ANDRE_BOTYPER)[number];

const BOTYPER = ["EIER", "LEIER", "KOMMUNAL", "INGEN", "ANNET"] as const;
type Botype = (typeof BOTYPER)[number];

type AnnetLanguageKey = `bosituasjon.annenBotype.${Lowercase<AnnenBotype>}`;
type LanguageKey = `bosituasjon.${Lowercase<Botype>}`;

interface Botypevalg<T extends LanguageKey | AnnetLanguageKey> {
    value: BosituasjonDtoBotype;
    languageKey: T;
}

const BOTYPEVALG: Botypevalg<LanguageKey>[] = BOTYPER.map((botype) => ({
    value: botype,
    languageKey: `bosituasjon.${botype.toLowerCase() as Lowercase<Botype>}`,
}));

const ANNEN_BOTYPEVALG: Botypevalg<AnnetLanguageKey>[] = ANDRE_BOTYPER.map((botype) => ({
    value: botype,
    languageKey: `bosituasjon.annenBotype.${botype.toLowerCase() as Lowercase<AnnenBotype>}`,
}));

export const Botype = () => {
    const {t} = useTranslation("skjema");
    const {botype, setBosituasjon} = useBosituasjon();

    // Hjelpefunksjon: Vis kun undermenyen dersom ikke "eier", "leier", "kommunal" eller "ingen" er valgt
    const erAnnet = botype && [...ANDRE_BOTYPER, "ANNET"].includes(botype);

    return (
        <div className={"mt-12 lg:mt-24 mb-12 lg:mb-24"}>
            <RadioGroup
                legend={t("bosituasjon.sporsmal")}
                value={erAnnet ? "ANNET" : botype || ""}
                onChange={(botype: BosituasjonDtoBotype) => setBosituasjon({botype})}
            >
                {BOTYPEVALG.map(({value, languageKey}) => (
                    <Radio key={value} value={value}>
                        {t(languageKey)}
                    </Radio>
                ))}
            </RadioGroup>
            <NyttUnderskjema hidden={!erAnnet}>
                <RadioGroup
                    legend={t("bosituasjon.annenBotype.sporsmal")}
                    value={botype || ""}
                    onChange={(botype) => setBosituasjon({botype})}
                >
                    {ANNEN_BOTYPEVALG.map(({value, languageKey}) => (
                        <Radio key={value} value={value}>
                            {t(languageKey)}
                        </Radio>
                    ))}
                </RadioGroup>
            </NyttUnderskjema>
        </div>
    );
};
