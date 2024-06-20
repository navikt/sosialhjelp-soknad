import * as React from "react";
import {useBosituasjon} from "../../lib/hooks/data/useBosituasjon";
import {NyttUnderskjema} from "./NyttUnderskjema";
import {useTranslation} from "react-i18next";
import {Radio, RadioGroup} from "@navikt/ds-react";

export const Botype = () => {
    const {t} = useTranslation("skjema");
    const {bosituasjon, setBosituasjon} = useBosituasjon();

    // Hjelpefunksjon: Vis kun undermenyen dersom ikke "eier", "leier", "kommunal" eller "ingen" er valgt
    const erAnnet = () => !["eier", "leier", "kommunal", "ingen", null].includes(bosituasjon?.botype || null);

    return (
        <div className={"mt-12 lg:mt-24 mb-12 lg:mb-24"}>
            <RadioGroup
                legend={t("bosituasjon.sporsmal")}
                value={erAnnet() ? "annet" : bosituasjon?.botype}
                onChange={(botype) => setBosituasjon({botype})}
            >
                <Radio value={"eier"}>{t("bosituasjon.eier")}</Radio>
                <Radio value={"leier"}>{t("bosituasjon.leier")}</Radio>
                <Radio value={"kommunal"}>{t("bosituasjon.kommunal")}</Radio>
                <Radio value={"ingen"}>{t("bosituasjon.ingen")}</Radio>
                <Radio value={"annet"}>{t("bosituasjon.annet")}</Radio>
            </RadioGroup>
            <NyttUnderskjema hidden={!erAnnet()}>
                <RadioGroup
                    legend={t("bosituasjon.annenBotype.sporsmal")}
                    onChange={(botype) => setBosituasjon({botype})}
                >
                    <Radio value={"foreldre"}>{t("bosituasjon.annenBotype.foreldre")}</Radio>
                    <Radio value={"familie"}>{t("bosituasjon.annenBotype.familie")}</Radio>
                    <Radio value={"venner"}>{t("bosituasjon.annenBotype.venner")}</Radio>
                    <Radio value={"institusjon"}>{t("bosituasjon.annenBotype.institusjon")}</Radio>
                    <Radio value={"fengsel"}>{t("bosituasjon.annenBotype.fengsel")}</Radio>
                    <Radio value={"krisesenter"}>{t("bosituasjon.annenBotype.krisesenter")}</Radio>
                </RadioGroup>
            </NyttUnderskjema>
        </div>
    );
};
