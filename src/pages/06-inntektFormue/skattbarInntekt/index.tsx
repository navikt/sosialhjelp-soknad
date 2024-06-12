import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder";
import {SkattbarinntektForskuddstrekk} from "./SkattbarinntektForskuddstrekk";
import {Alert} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useSkattData} from "../../../lib/hooks/data/useSkattData";
import {YesNoInput} from "../../../lib/components/form/YesNoInput";

export const SkattbarInntekt = () => {
    const {inntekt, isError, samtykke, isLoading, setSamtykke} = useSkattData();
    const {t} = useTranslation("skjema");

    // TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
    if (isLoading) return <TextPlaceholder lines={3} />;
    if (isError) return <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>;

    return (
        <>
            <YesNoInput
                legend={t("utbetalinger.inntekt.skattbar.samtykke_sporsmal_v2")}
                defaultValue={samtykke}
                onChange={setSamtykke}
                name={"skattbar-inntekt-samtykke"}
            />
            {samtykke && (
                <div className={"space-y-4"}>
                    <SkattbarinntektForskuddstrekk inntektOgForskuddstrekk={inntekt} />
                </div>
            )}
        </>
    );
};
