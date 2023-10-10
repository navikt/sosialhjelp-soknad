import TextPlaceholder from "../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import SkattbarinntektForskuddstrekk from "./SkattbarinntektForskuddstrekk";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import {Detail, Alert, BodyShort, Label, Link} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import JaNeiSporsmal from "../../../nav-soknad/faktum/JaNeiSporsmal";
import {useSkattData} from "./useSkattData";

const SkattbarInntekt = () => {
    const {data, samtykke, samtykkeTidspunkt, isLoading, setSamtykke} = useSkattData();
    const {t} = useTranslation("skjema");

    // TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
    const inntektFraSkatteetaten = data?.inntektFraSkatteetaten;
    const inntektFraSkatteetatenFeilet = data?.inntektFraSkatteetatenFeilet;

    return (
        <>
            {samtykke && inntektFraSkatteetatenFeilet && (
                <div className={"ytelser_panel"}>
                    <div>
                        <Label spacing as="p">
                            {t("utbetalinger.inntekt.skattbar.samtykke_sporsmal")}
                        </Label>
                        <BodyShort spacing>{t("utbetalinger.inntekt.skattbar.samtykke_info")}</BodyShort>
                    </div>
                    <br />
                    <JaNeiSporsmal
                        faktumKey="utbetalinger.inntekt.skattbar.gi_samtykke"
                        tekster={{
                            true: getIntlTextOrKey(t, "utbetalinger.inntekt.skattbar.gi_samtykke.true"),
                            false: getIntlTextOrKey(t, "utbetalinger.inntekt.skattbar.gi_samtykke.false"),
                        }}
                        verdi={samtykke}
                        onChange={setSamtykke}
                    />
                    {samtykkeTidspunkt === "" && (
                        <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>
                    )}
                </div>
            )}
            {isLoading && <TextPlaceholder lines={3} />}
            {!isLoading && !!inntektFraSkatteetaten?.length && (
                <div className={"ytelser_panel"}>
                    <Detail>{samtykkeTidspunkt}</Detail>
                    {t("utbetalinger.inntekt.skattbar.beskrivelse")}
                    <div className="utbetalinger">
                        <SkattbarinntektForskuddstrekk inntektOgForskuddstrekk={inntektFraSkatteetaten} />
                    </div>
                    <Link
                        id="ta_bort_bostotte_samtykke"
                        onClick={(event: any) => {
                            setSamtykke(false);
                            event.preventDefault();
                        }}
                        href="/ta_bort_samtykke"
                    >
                        {getIntlTextOrKey(t, "utbetalinger.inntekt.skattbar.ta_bort_samtykke")}
                    </Link>
                </div>
            )}
            {!isLoading && inntektFraSkatteetaten?.length === 0 && (
                <div className={"ytelser_panel"}>
                    {samtykke ? (
                        <>
                            <div>{t("utbetalinger.inntekt.skattbar.ingen")}</div>
                            <Link
                                id="ta_bort_bostotte_samtykke"
                                onClick={(event: any) => {
                                    setSamtykke(false);
                                    event.preventDefault();
                                }}
                                href="/ta_bort_samtykke"
                            >
                                {getIntlTextOrKey(t, "utbetalinger.inntekt.skattbar.ta_bort_samtykke")}
                            </Link>
                        </>
                    ) : (
                        <>
                            <div>
                                <Label spacing as="p">
                                    {t("utbetalinger.inntekt.skattbar.samtykke_sporsmal")}
                                </Label>
                                <BodyShort spacing>{t("utbetalinger.inntekt.skattbar.samtykke_info")}</BodyShort>
                            </div>
                            <br />
                            <JaNeiSporsmal
                                faktumKey="utbetalinger.inntekt.skattbar.gi_samtykke"
                                tekster={{
                                    true: getIntlTextOrKey(t, "utbetalinger.inntekt.skattbar.gi_samtykke.true"),
                                    false: getIntlTextOrKey(t, "utbetalinger.inntekt.skattbar.gi_samtykke.false"),
                                }}
                                verdi={samtykke}
                                onChange={(verdi: boolean) => setSamtykke(verdi)}
                            />
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export {SkattbarInntekt};

export default SkattbarInntekt;
