import * as React from "react";
import {useTranslation} from "react-i18next";
import {Loader, Radio, RadioGroup} from "@navikt/ds-react";
import {useBarnebidrag} from "../../lib/hooks/data/useBarnebidrag";

export const Barnebidrag = () => {
    const {t} = useTranslation("skjema");
    const {barnebidrag, setBarnebidrag, isDelayedLoading} = useBarnebidrag();

    return (
        <RadioGroup
            legend={
                <div>
                    {t("familie.barn.true.barnebidrag.sporsmal")}
                    {isDelayedLoading && <Loader />}
                </div>
            }
            value={barnebidrag}
            onChange={(verdi) => setBarnebidrag(verdi)}
        >
            <Radio value={"BETALER"}>{t(`familie.barn.true.barnebidrag.betaler`)}</Radio>
            <Radio value={"MOTTAR"}>{t(`familie.barn.true.barnebidrag.mottar`)}</Radio>
            <Radio value={"BEGGE"}>{t(`familie.barn.true.barnebidrag.begge`)}</Radio>
            <Radio value={"INGEN"}>{t(`familie.barn.true.barnebidrag.ingen`)}</Radio>
        </RadioGroup>
    );
};
