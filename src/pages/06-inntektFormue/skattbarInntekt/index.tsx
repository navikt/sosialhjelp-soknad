import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder";
import {SkattbarinntektForskuddstrekk} from "./SkattbarinntektForskuddstrekk";
import {Detail, Alert, Button} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useSkattData} from "../../../lib/hooks/data/useSkattData";
import {YesNoInput} from "../../../lib/components/form/YesNoInput";

export const SkattbarInntekt = () => {
    const {data, samtykke, samtykkeTidspunkt, isLoading, setSamtykke} = useSkattData();
    const {t} = useTranslation("skjema");

    // TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
    const inntektFraSkatteetaten = data?.inntektFraSkatteetaten;
    const inntektFraSkatteetatenFeilet = data?.inntektFraSkatteetatenFeilet;

    if (isLoading) return <TextPlaceholder lines={3} />;
    if (inntektFraSkatteetatenFeilet)
        return <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>;
    if (samtykke && samtykkeTidspunkt === "")
        return <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>;

    return (
        <>
            {!samtykke ? (
                <YesNoInput
                    legend={t("utbetalinger.inntekt.skattbar.samtykke_sporsmal")}
                    description={t("utbetalinger.inntekt.skattbar.samtykke_info")}
                    defaultValue={samtykke}
                    onChange={(checked) => setSamtykke(checked)}
                    name={"skattbar-inntekt-samtykke"}
                />
            ) : (
                <div className={"space-y-4"}>
                    <Detail>{t("utbetalinger.inntekt.skattbar.beskrivelse")}</Detail>
                    <SkattbarinntektForskuddstrekk inntektOgForskuddstrekk={inntektFraSkatteetaten} />
                    <Button
                        variant={"secondary"}
                        size={"small"}
                        id="ta_bort_bostotte_samtykke"
                        onClick={() => setSamtykke(false)}
                    >
                        {t("utbetalinger.inntekt.skattbar.ta_bort_samtykke")}
                    </Button>
                </div>
            )}
        </>
    );
};
