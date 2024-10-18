import {Skatteetaten} from "./Skatteetaten";
import {useTranslation} from "react-i18next";
import {useSkatteetatenData} from "../../../lib/hooks/data/useSkatteetatenData";
import {YesNoInput} from "../../../lib/components/form/YesNoInput";
import * as React from "react";
import {UnderskjemaArrow} from "./UnderskjemaArrow";
import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder.tsx";
import {Box} from "@navikt/ds-react";

interface Props {
    legend: string;
}

export const SkattbarInntekt = ({legend}: Props) => {
    const {samtykke, setSamtykke, isPending} = useSkatteetatenData();
    const {t} = useTranslation("skjema");

    // TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt

    if (isPending && (samtykke === undefined || samtykke === null)) {
        return <TextPlaceholder lines={3} />;
    }
    return (
        <Box>
            <YesNoInput
                key={`skattbar-inntekt-samtykke-${samtykke}`}
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
                    <div className={"bg-lightblue-50 border-l-[var(--a-surface-info)] rounded-md"}>
                        <Skatteetaten />
                    </div>
                </div>
            )}
        </Box>
    );
};
