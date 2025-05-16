import {useTranslation} from "react-i18next";
import * as React from "react";
import {SkatteetatenAmount} from "./SkatteetatenAmount";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";
import {UtbetalingFraSkatteetatenDto} from "../../../generated/new/model/utbetalingFraSkatteetatenDto.ts";

// This will throw an error once i18n is more strongly typed
const LABELS: Record<"brutto" | "trekk" | "netto", DigisosLanguageKey> = {
    brutto: "utbetalinger.inntekt.skattbar.bruttoinntekt",
    trekk: "utbetalinger.inntekt.skattbar.forskuddstrekk",
    netto: "utbetalinger.inntekt.skattbar.nettoinntekt",
} as const;

export const SkatteetatenUtbetalingView = ({
    utbetaling: {brutto, forskuddstrekk},
}: {
    utbetaling: UtbetalingFraSkatteetatenDto;
}) => {
    const {t} = useTranslation("skjema");
    const netto = brutto && forskuddstrekk;

    return (
        <>
            {brutto && <SkatteetatenAmount label={t(LABELS["brutto"])} amount={brutto} />}
            {forskuddstrekk && <SkatteetatenAmount label={t(LABELS["trekk"])} amount={forskuddstrekk} />}
            {netto && <SkatteetatenAmount label={t(LABELS["netto"])} amount={brutto - Math.abs(forskuddstrekk)} />}
        </>
    );
};
