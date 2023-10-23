import * as React from "react";
import {useBosituasjon} from "./useBosituasjon";
import {NyttUnderskjema} from "./NyttUnderskjema";
import {useTranslation} from "react-i18next";
import {Radio, RadioGroup} from "@navikt/ds-react";

const Botype = () => {
    const {t} = useTranslation("skjema");
    const {bosituasjon, setBosituasjon} = useBosituasjon();

    // Hjelpefunksjon: Vis kun undermenyen dersom ikke "eier", "leier", "kommunal" eller "ingen" er valgt
    const erAnnet = () => !["eier", "leier", "kommunal", "ingen", null].includes(bosituasjon?.botype || null);

    return (
        <div>
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
                    legend={t("bosituasjon.annet.botype.sporsmal")}
                    onChange={(botype) => setBosituasjon({botype})}
                >
                    <Radio value={"foreldre"}>{t("bosituasjon.annet.botype.foreldre")}</Radio>
                    <Radio value={"familie"}>{t("bosituasjon.annet.botype.familie")}</Radio>
                    <Radio value={"venner"}>{t("bosituasjon.annet.botype.venner")}</Radio>
                    <Radio value={"institusjon"}>{t("bosituasjon.annet.botype.institusjon")}</Radio>
                    <Radio value={"fengsel"}>{t("bosituasjon.annet.botype.fengsel")}</Radio>
                    <Radio value={"krisesenter"}>{t("bosituasjon.annet.botype.krisesenter")}</Radio>
                </RadioGroup>
            </NyttUnderskjema>
        </div>
    );
};

export default Botype;
