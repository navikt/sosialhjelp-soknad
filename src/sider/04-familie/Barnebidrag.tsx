import * as React from "react";
import {useTranslation} from "react-i18next";
import {Radio, RadioGroup} from "@navikt/ds-react";
import {useBarnebidrag} from "../../lib/hooks/data/useBarnebidrag";

export const Barnebidrag = () => {
    const {t} = useTranslation("skjema");
    const {barnebidrag, setBarnebidrag} = useBarnebidrag();

    return (
        <RadioGroup
            legend={t("familie.barn.true.barnebidrag.sporsmal")}
            value={barnebidrag}
            onChange={(verdi) => setBarnebidrag(verdi)}
        >
            <Radio value={"betaler"}>{t(`familie.barn.true.barnebidrag.betaler`)}</Radio>
            <Radio value={"mottar"}>{t(`familie.barn.true.barnebidrag.mottar`)}</Radio>
            <Radio value={"begge"}>{t(`familie.barn.true.barnebidrag.begge`)}</Radio>
            <Radio value={"ingen"}>{t(`familie.barn.true.barnebidrag.ingen`)}</Radio>
        </RadioGroup>
    );
};
