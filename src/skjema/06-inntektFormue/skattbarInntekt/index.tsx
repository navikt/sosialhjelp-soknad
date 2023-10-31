import TextPlaceholder from "../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import SkattbarinntektForskuddstrekk from "./SkattbarinntektForskuddstrekk";
import {Detail, Alert, Button} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useSkattData} from "./useSkattData";
import {YesNoInput} from "../../../nav-soknad/components/form/YesNoInput";

const SkattbarInntekt = () => {
    const {data, samtykke, samtykkeTidspunkt, isLoading, setSamtykke} = useSkattData();
    const {t} = useTranslation("skjema");

    // TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
    const inntektFraSkatteetaten = data?.inntektFraSkatteetaten;
    const inntektFraSkatteetatenFeilet = data?.inntektFraSkatteetatenFeilet;

    if (isLoading) return <TextPlaceholder lines={3} />;
    if (inntektFraSkatteetatenFeilet) throw new Error("Kunne ikke hente inntekt fra skatteetaten");
    if (samtykke && samtykkeTidspunkt === "")
        return <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>;

    return (
        <>
            {!samtykke ? (
                <YesNoInput
                    legend={t("utbetalinger.inntekt.skattbar.samtykke_sporsmal")}
                    description={t("utbetalinger.inntekt.skattbar.samtykke_info")}
                    defaultValue={samtykke}
                    onChange={({target: {checked}}) => setSamtykke(checked)}
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

export {SkattbarInntekt};

export default SkattbarInntekt;
