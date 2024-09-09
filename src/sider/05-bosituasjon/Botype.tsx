import * as React from "react";
import {useBosituasjon} from "../../lib/hooks/data/useBosituasjon";
import {NyttUnderskjema} from "./NyttUnderskjema";
import {useTranslation} from "react-i18next";
import {Radio, RadioGroup} from "@navikt/ds-react";
import {BosituasjonFrontendBotype} from "../../generated/model";

const main = ["eier", "leier", "kommunal", "ingen", "annet"] as const;
const annet = ["foreldre", "familie", "venner", "institusjon", "fengsel", "krisesenter"] as const;

const BotypeRadio = ({value, legend}: {value: BosituasjonFrontendBotype; legend: string}) => (
    <Radio value={value}>{legend}</Radio>
);

export const Botype = () => {
    const {t} = useTranslation("skjema");
    const {botype, setBotype, showSecondaryOptions} = useBosituasjon();

    return (
        <div className={"mt-12 lg:mt-24 mb-12 lg:mb-24"}>
            <RadioGroup legend={t("bosituasjon.sporsmal")} value={botype} onChange={setBotype}>
                {main.map((valg) => (
                    <BotypeRadio key={valg} value={valg} legend={t(`bosituasjon.${valg}`)} />
                ))}
            </RadioGroup>
            <NyttUnderskjema hidden={!showSecondaryOptions}>
                <RadioGroup value={botype} legend={t("bosituasjon.annenBotype.sporsmal")} onChange={setBotype}>
                    {annet.map((valg) => (
                        <BotypeRadio key={valg} value={valg} legend={t(`bosituasjon.annenBotype.${valg}`)} />
                    ))}
                </RadioGroup>
            </NyttUnderskjema>
        </div>
    );
};
