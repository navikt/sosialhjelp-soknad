import * as React from "react";
import {useBosituasjon} from "../../lib/hooks/data/useBosituasjon";
import {NyttUnderskjema} from "./NyttUnderskjema";
import {useTranslation} from "react-i18next";
import {Radio, RadioGroup} from "@navikt/ds-react";

export const Botype = () => {
    const {t} = useTranslation("skjema");
    const {botype, setBosituasjon} = useBosituasjon();

    // Hjelpefunksjon: Vis kun undermenyen dersom ikke "eier", "leier", "kommunal" eller "ingen" er valgt
    const erAnnet = () => !["EIER", "LEIER", "KOMMUNAL", "INGEN", null].includes(botype || null);

    return (
        <div className={"mt-12 lg:mt-24 mb-12 lg:mb-24"}>
            <RadioGroup
                legend={t("bosituasjon.sporsmal")}
                value={erAnnet() ? "ANNET" : botype || ""}
                onChange={(botype) => setBosituasjon({botype})}
            >
                <Radio value={"EIER"}>{t("bosituasjon.eier")}</Radio>
                <Radio value={"LEIER"}>{t("bosituasjon.leier")}</Radio>
                <Radio value={"KOMMUNAL"}>{t("bosituasjon.kommunal")}</Radio>
                <Radio value={"INGEN"}>{t("bosituasjon.ingen")}</Radio>
                <Radio value={"ANNET"}>{t("bosituasjon.annet")}</Radio>
            </RadioGroup>
            <NyttUnderskjema hidden={!erAnnet()}>
                <RadioGroup
                    legend={t("bosituasjon.annenBotype.sporsmal")}
                    value={botype || ""}
                    onChange={(botype) => setBosituasjon({botype})}
                >
                    <Radio value={"FORELDRE"}>{t("bosituasjon.annenBotype.foreldre")}</Radio>
                    <Radio value={"FAMILIE"}>{t("bosituasjon.annenBotype.familie")}</Radio>
                    <Radio value={"VENNER"}>{t("bosituasjon.annenBotype.venner")}</Radio>
                    <Radio value={"INSTITUSJON"}>{t("bosituasjon.annenBotype.institusjon")}</Radio>
                    <Radio value={"FENGSEL"}>{t("bosituasjon.annenBotype.fengsel")}</Radio>
                    <Radio value={"KRISESENTER"}>{t("bosituasjon.annenBotype.krisesenter")}</Radio>
                </RadioGroup>
            </NyttUnderskjema>
        </div>
    );
};
