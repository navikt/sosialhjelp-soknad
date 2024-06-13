import {Skatteetaten} from "./Skatteetaten";
import {useTranslation} from "react-i18next";
import {useSkatteetatenData} from "../../../lib/hooks/data/useSkatteetatenData";
import {YesNoInput} from "../../../lib/components/form/YesNoInput";
import * as React from "react";
import {UnderskjemaArrow} from "./UnderskjemaArrow";

export const SkattbarInntekt = () => {
    const {samtykke, setSamtykke} = useSkatteetatenData();
    const {t} = useTranslation("skjema");

    // TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt

    return (
        <>
            <YesNoInput
                legend={t("utbetalinger.inntekt.skattbar.samtykke_sporsmal_v2")}
                defaultValue={samtykke}
                onChange={setSamtykke}
                name={"skattbar-inntekt-samtykke"}
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
