import * as React from "react";
import {useDispatch} from "react-redux";

import {SkattbarInntektInfo, SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import TextPlaceholder from "../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {SkattbarInntekt} from "./inntektTypes";
import SkattbarinntektForskuddstrekk from "./SkattbarinntektForskuddstrekk";
import {settSamtykkeOgOppdaterData} from "../../../digisos/redux/soknadsdata/soknadsdataActions";
import {formatTidspunkt, getIntlTextOrKey} from "../../../nav-soknad/utils";
import {UndertekstBold} from "nav-frontend-typografi";
import {Alert, BodyShort, Button, Heading, Label, Link} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";

const Skatt = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    const {soknadsdata} = useSoknadsdata(SoknadsSti.SKATTBARINNTEKT);
    const behandlingsId = useBehandlingsId();

    const restStatus = soknadsdata.restStatus.inntekt.skattbarinntektogforskuddstrekk;
    const skattbarinntektogforskuddstrekk: SkattbarInntektInfo = soknadsdata.inntekt.skattbarinntektogforskuddstrekk;
    const harSamtykke: boolean = soknadsdata.inntekt.skattbarinntektogforskuddstrekk.samtykke;
    const samtykkeTidspunkt: Date | undefined = soknadsdata.inntekt.skattbarinntektogforskuddstrekk.samtykkeTidspunkt;
    const samtykkeTidspunktStreng: string = samtykkeTidspunkt ? formatTidspunkt(samtykkeTidspunkt.toString()) : "";
    const visAnimerteStreker = restStatus !== REST_STATUS.OK;

    // TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
    const inntektFraSkatteetaten: SkattbarInntekt[] = skattbarinntektogforskuddstrekk.inntektFraSkatteetaten;
    const inntektFraSkatteetatenFeilet: boolean = skattbarinntektogforskuddstrekk.inntektFraSkatteetatenFeilet;

    function handleSettSkatteetatenSamtykke(nyttHarSamtykke: boolean) {
        if (!visAnimerteStreker && behandlingsId) {
            settSamtykkeOgOppdaterData(
                behandlingsId,
                SoknadsSti.SKATTBARINNTEKT_SAMTYKKE,
                nyttHarSamtykke,
                SoknadsSti.SKATTBARINNTEKT,
                false,
                dispatch
            );
        }
    }

    return (
        <div className={"skatt-wrapper"}>
            <Heading size="medium" level="2">
                {getIntlTextOrKey(t, "utbetalinger.inntekt.skattbar.tittel")}
            </Heading>
            {harSamtykke && inntektFraSkatteetatenFeilet && (
                <div className={"ytelser_panel"}>
                    <div>
                        <Label spacing>{t("utbetalinger.inntekt.skattbar.samtykke_sporsmal")}</Label>
                        <BodyShort spacing>{t("utbetalinger.inntekt.skattbar.samtykke_info")}</BodyShort>
                    </div>
                    <Button
                        variant="secondary"
                        id="gi_skatteetaten_samtykke"
                        onClick={() => {
                            handleSettSkatteetatenSamtykke(true);
                        }}
                    >
                        {getIntlTextOrKey(t, "utbetalinger.inntekt.skattbar.gi_samtykke")}
                    </Button>
                    {samtykkeTidspunktStreng === "" && (
                        <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>
                    )}
                </div>
            )}
            {!visAnimerteStreker && inntektFraSkatteetaten && inntektFraSkatteetaten.length > 0 && (
                <div className={"ytelser_panel"}>
                    <UndertekstBold>{samtykkeTidspunktStreng}</UndertekstBold>
                    {t("utbetalinger.inntekt.skattbar.beskrivelse")}
                    <div className="utbetalinger">
                        <SkattbarinntektForskuddstrekk skattbarinntektogforskuddstrekk={inntektFraSkatteetaten} />
                    </div>
                    <Link
                        id="ta_bort_bostotte_samtykke"
                        onClick={(event: any) => {
                            handleSettSkatteetatenSamtykke(false);
                            event.preventDefault();
                        }}
                        href="/ta_bort_samtykke"
                    >
                        {getIntlTextOrKey(t, "utbetalinger.inntekt.skattbar.ta_bort_samtykke")}
                    </Link>
                </div>
            )}
            {!visAnimerteStreker && inntektFraSkatteetaten && inntektFraSkatteetaten.length === 0 && (
                <div className={"ytelser_panel"}>
                    {harSamtykke && (
                        <>
                            <div>{t("utbetalinger.inntekt.skattbar.ingen")}</div>
                            <Link
                                id="ta_bort_bostotte_samtykke"
                                onClick={(event: any) => {
                                    handleSettSkatteetatenSamtykke(false);
                                    event.preventDefault();
                                }}
                                href="/ta_bort_samtykke"
                            >
                                {getIntlTextOrKey(t, "utbetalinger.inntekt.skattbar.ta_bort_samtykke")}
                            </Link>
                        </>
                    )}
                    {!harSamtykke && (
                        <>
                            <div>
                                <Label spacing>{t("utbetalinger.inntekt.skattbar.samtykke_sporsmal")}</Label>
                                <BodyShort spacing>{t("utbetalinger.inntekt.skattbar.samtykke_info")}</BodyShort>
                            </div>
                            <Button
                                variant="secondary"
                                id="gi_skatteetaten_samtykke"
                                onClick={() => {
                                    handleSettSkatteetatenSamtykke(true);
                                }}
                            >
                                {getIntlTextOrKey(t, "utbetalinger.inntekt.skattbar.gi_samtykke")}
                            </Button>
                        </>
                    )}
                </div>
            )}
            {visAnimerteStreker && <TextPlaceholder lines={3} />}
        </div>
    );
};

export {Skatt};

export default Skatt;
