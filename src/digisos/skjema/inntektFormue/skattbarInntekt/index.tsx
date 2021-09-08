import * as React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";

import {SkattbarInntektInfo, SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {SkattbarInntekt} from "./inntektTypes";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import SkattbarinntektForskuddstrekk from "./SkattbarinntektForskuddstrekk";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata, settSamtykkeOgOppdaterData} from "../../../redux/soknadsdata/soknadsdataActions";
import Knapp from "nav-frontend-knapper";
import {formatTidspunkt, getIntlTextOrKey} from "../../../../nav-soknad/utils";
import {UndertekstBold} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import {Alert} from "@navikt/ds-react";

const Skatt = () => {
    const dispatch = useDispatch();
    const intl = useIntl();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

    React.useEffect(() => {
        if (behandlingsId) {
            hentSoknadsdata(behandlingsId, SoknadsSti.SKATTBARINNTEKT, dispatch);
        }
    }, [behandlingsId, dispatch]);

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
                dispatch
            );
        }
    }

    return (
        <div className={"skatt-wrapper"}>
            <h2>{getIntlTextOrKey(intl, "utbetalinger.inntekt.skattbar.tittel")}</h2>
            {harSamtykke && inntektFraSkatteetatenFeilet && (
                <div className={"ytelser_panel"}>
                    <div>
                        <UndertekstBold>
                            <FormattedMessage id="utbetalinger.inntekt.skattbar.samtykke_sporsmal" />
                        </UndertekstBold>
                        <FormattedMessage id="utbetalinger.inntekt.skattbar.samtykke_info" />
                    </div>
                    <Knapp
                        id="gi_bostotte_samtykke"
                        type="standard"
                        htmlType="button"
                        mini={false}
                        onClick={() => {
                            handleSettSkatteetatenSamtykke(true);
                        }}
                        className="samtykke_knapp_padding"
                    >
                        {getIntlTextOrKey(intl, "utbetalinger.inntekt.skattbar.gi_samtykke")}
                    </Knapp>
                    {samtykkeTidspunktStreng === "" && (
                        <Alert variant="error">
                            <FormattedMessage id="utbetalinger.skattbar.kontaktproblemer" />
                        </Alert>
                    )}
                </div>
            )}
            {!visAnimerteStreker && inntektFraSkatteetaten && inntektFraSkatteetaten.length > 0 && (
                <div className={"ytelser_panel"}>
                    <UndertekstBold>{samtykkeTidspunktStreng}</UndertekstBold>
                    <FormattedMessage id="utbetalinger.inntekt.skattbar.beskrivelse" />
                    <div className="utbetalinger">
                        <SkattbarinntektForskuddstrekk skattbarinntektogforskuddstrekk={inntektFraSkatteetaten} />
                    </div>
                    <Lenke
                        id="ta_bort_bostotte_samtykke"
                        onClick={(event: any) => {
                            handleSettSkatteetatenSamtykke(false);
                            event.preventDefault();
                        }}
                        href="/ta_bort_samtykke"
                    >
                        {getIntlTextOrKey(intl, "utbetalinger.inntekt.skattbar.ta_bort_samtykke")}
                    </Lenke>
                </div>
            )}
            {!visAnimerteStreker && inntektFraSkatteetaten && inntektFraSkatteetaten.length === 0 && (
                <div className={"ytelser_panel"}>
                    {harSamtykke && (
                        <>
                            <div>
                                <FormattedMessage id="utbetalinger.inntekt.skattbar.ingen" />
                            </div>
                            <Lenke
                                id="ta_bort_bostotte_samtykke"
                                onClick={(event: any) => {
                                    handleSettSkatteetatenSamtykke(false);
                                    event.preventDefault();
                                }}
                                href="/ta_bort_samtykke"
                            >
                                {getIntlTextOrKey(intl, "utbetalinger.inntekt.skattbar.ta_bort_samtykke")}
                            </Lenke>
                        </>
                    )}
                    {!harSamtykke && (
                        <>
                            <div>
                                <UndertekstBold>
                                    <FormattedMessage id="utbetalinger.inntekt.skattbar.samtykke_sporsmal" />
                                </UndertekstBold>
                                <FormattedMessage id="utbetalinger.inntekt.skattbar.samtykke_info" />
                            </div>
                            <Knapp
                                id="gi_bostotte_samtykke"
                                type="standard"
                                htmlType="button"
                                mini={false}
                                onClick={() => {
                                    handleSettSkatteetatenSamtykke(true);
                                }}
                                className="samtykke_knapp_padding"
                            >
                                {getIntlTextOrKey(intl, "utbetalinger.inntekt.skattbar.gi_samtykke")}
                            </Knapp>
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
