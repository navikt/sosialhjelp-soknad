import {Skatteetaten} from "./Skatteetaten";
import {useTranslation} from "react-i18next";
import {useSkatteetatenData} from "../../../lib/hooks/data/useSkatteetatenData";
import {YesNoInput} from "../../../lib/components/form/YesNoInput";
import * as React from "react";
import {UnderskjemaArrow} from "./UnderskjemaArrow";

interface Props {
    legend: string;
}

export const SkattbarInntekt = ({legend}: Props) => {
    const {samtykke, setSamtykke} = useSkatteetatenData();
    const {t} = useTranslation("skjema");

    // TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt

    return (
        <>
            <YesNoInput
                legend={legend}
                value={samtykke}
                onChange={setSamtykke}
                name={"skattbar-inntekt-samtykke"}
                trueLabel={t("utbetalinger.inntekt.skattbar.avbryt.ja")}
                falseLabel={t("utbetalinger.inntekt.skattbar.avbryt.nei")}
            />
            {samtykke && (
                <div>
                    <UnderskjemaArrow />
                    <div className={"bg-lightblue-50 border-l-[var(--a-surface-info)] p-4 space-y-4 rounded-md"}>
                        <Skatteetaten />
                    </div>
                </div>
            )}
        </>
    );
};
