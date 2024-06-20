import {Utbetaling} from "../../../generated/model";
import {useTranslation} from "react-i18next";
import * as React from "react";
import {SkateetatenAmount} from "./SkateetatenAmount";

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
            {brutto && <SkateetatenAmount label={t(LABELS["brutto"])} amount={brutto} />}
            {forskuddstrekk && <SkateetatenAmount label={t(LABELS["trekk"])} amount={forskuddstrekk} />}
            {netto && <SkateetatenAmount label={t(LABELS["netto"])} amount={brutto - forskuddstrekk} />}
        </>
    );
};
