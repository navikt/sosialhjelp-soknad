import {Utbetaling} from "../../../generated/model";
import {useTranslation} from "react-i18next";
import * as React from "react";
import {SkatteetatenAmount} from "./SkatteetatenAmount";

// This will throw an error once i18n is more strongly typed
const LABELS: Record<"brutto" | "trekk" | "netto", string> = {
    brutto: "utbetalinger.inntekt.skattbar.bruttoinntekt",
    trekk: "utbetalinger.inntekt.skattbar.forskuddstrekk",
    netto: "utbetalinger.inntekt.skattbar.nettoinntekt",
};

export const SkatteetatenUtbetalingView = ({utbetaling: {brutto, forskuddstrekk}}: {utbetaling: Utbetaling}) => {
    const {t} = useTranslation("skjema");
    const netto = brutto && forskuddstrekk;

    return (
        <>
            {brutto && <SkatteetatenAmount label={t(LABELS["brutto"])} amount={brutto} />}
            {forskuddstrekk && <SkatteetatenAmount label={t(LABELS["trekk"])} amount={forskuddstrekk} />}
            {netto && <SkatteetatenAmount label={t(LABELS["netto"])} amount={brutto - forskuddstrekk} />}
        </>
    );
};
