import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {formatTidspunkt, getFaktumSporsmalTekst, getIntlTextOrKey} from "../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../nav-soknad/faktum/JaNeiSporsmal";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {Bostotte} from "./bostotteTypes";
import {settSamtykkeOgOppdaterData} from "../../../digisos/redux/soknadsdata/soknadsdataActions";
import {Alert, BodyShort, Button, Detail, Heading, Link, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {fmtCurrency} from "../../../lib/fmtCurrency";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import LocalizedDate from "../../../components/LocalizedDate";

const FAKTUM_BOSTOTTE = "inntekt.bostotte.sporsmal";

const BostotteView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const dispatch = useDispatch();

    const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.BOSTOTTE);
    const behandlingsId = useBehandlingsId();
    const {t, i18n} = useTranslation("skjema");

    useEffect(() => {
        if (oppstartsModus && soknadsdata.restStatus.inntekt.bostotte === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.inntekt.bostotte]);

    const handleClickJaNeiSpsm = (verdi: boolean) => {
        if (soknadsdata.restStatus.inntekt.bostotte === REST_STATUS.OK && soknadsdata.inntekt.bostotte) {
            const bostotte = soknadsdata.inntekt.bostotte;
            bostotte.bekreftelse = verdi;
            oppdater(bostotte);
            // Fjern samtykke når bruker svarer nei.
            const callback = !verdi ? () => handleSettBostotteSamtykke(false) : undefined;
            lagre(bostotte, callback);
        }
    };

    const handleSettBostotteSamtykke = (nyttHarSamtykke: boolean) => {
        if (!oppstartsModus && behandlingsId) {
            settSamtykkeOgOppdaterData(
                behandlingsId,
                SoknadsSti.BOSTOTTE_SAMTYKKE,
                nyttHarSamtykke,
                SoknadsSti.BOSTOTTE,
                true,
                dispatch
            );
        }
    };

    const renderUtbetaling = (netto: number, dato: string, mottaker: string, index: number) => {
        const key = "bostotteUtbetaling_" + index;
        return (
            <div className="utbetalinger blokk-xs" key={key}>
                <div>{t(`inntekt.bostotte.husbanken.mottaker.${mottaker.toLowerCase()}`)}</div>
                <div className="utbetaling">
                    <span>
                        {t("utbetalinger.utbetaling.erutbetalt.label")}
                        <span className="dato">
                            &nbsp;
                            <LocalizedDate date={dato} />
                        </span>
                    </span>
                    <span className="verdi detaljeliste__verdi">{fmtCurrency(i18n.language, netto)}</span>
                </div>
            </div>
        );
    };

    const renderSak = (
        key: string,
        dato: string,
        status: string,
        vedtaksstatus: string,
        vedtaksbeskrivelse: string,
        index: number
    ) => {
        const visningstatus =
            status === "VEDTATT"
                ? t(`inntekt.bostotte.husbanken.vedtaksstatus.${vedtaksstatus.toLowerCase()}`)
                : t(`inntekt.bostotte.husbanken.status.${status.toLowerCase()}`, {status});
        const formatertDato = new Intl.DateTimeFormat(i18n.language, {month: "long", year: "numeric"}).format(
            new Date(dato)
        );
        return (
            <div key={`${key}-${index}`} className="sak blokk-xs">
                <span className="bostotte-dato">{formatertDato}</span>
                {status !== "VEDTATT" && <span>{visningstatus}</span>}
                {status === "VEDTATT" && <span className="bostotte-visningstatus">{visningstatus}</span>}
                {status === "VEDTATT" && (
                    <>
                        <div className="bostotte-vedtaksbeskrivelse-innrykk">{vedtaksbeskrivelse}</div>
                    </>
                )}
            </div>
        );
    };

    const bostotte: Bostotte | undefined = soknadsdata.inntekt.bostotte;
    const restStatus = soknadsdata.restStatus.inntekt.bostotte;
    if (oppstartsModus && restStatus === REST_STATUS.OK) {
        setOppstartsModus(false);
    }
    const requestToHusbankenFeilet: boolean = bostotte.stotteFraHusbankenFeilet === true;
    const harSamtykke = bostotte.samtykke;
    const samtykkeTidspunkt: Date | null = bostotte.samtykkeTidspunkt;
    let samtykkeTidspunktStreng = "";
    if (samtykkeTidspunkt) {
        samtykkeTidspunktStreng = formatTidspunkt(samtykkeTidspunkt.toString(), t);
    }
    const harBostotterUtbetalinger: boolean = bostotte.utbetalinger && bostotte.utbetalinger.length > 0;
    const harBostotterSaker: boolean = bostotte.saker && bostotte.saker.length > 0;
    return (
        <div className="blokk-xs">
            <Heading size="medium" level="2">
                {getIntlTextOrKey(t, "inntekt.bostotte.overskrift")}
            </Heading>
            <JaNeiSporsmal
                visPlaceholder={oppstartsModus}
                tekster={getFaktumSporsmalTekst(t, FAKTUM_BOSTOTTE)}
                faktumKey={FAKTUM_BOSTOTTE}
                verdi={bostotte ? bostotte.bekreftelse : null}
                onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <Sporsmal
                    tekster={{
                        sporsmal:
                            requestToHusbankenFeilet || !harSamtykke
                                ? getIntlTextOrKey(t, "inntekt.bostotte.gi_samtykke.overskrift")
                                : "",
                    }}
                >
                    {(requestToHusbankenFeilet || !harSamtykke) && (
                        <>
                            {bostotte?.bekreftelse && (
                                <>
                                    <BodyShort spacing>
                                        {getIntlTextOrKey(t, "inntekt.bostotte.gi_samtykke.tekst")}
                                    </BodyShort>
                                    <Button
                                        variant="secondary"
                                        id="gi_bostotte_samtykke"
                                        onClick={() => {
                                            handleSettBostotteSamtykke(true);
                                        }}
                                    >
                                        {getIntlTextOrKey(t, "inntekt.bostotte.gi_samtykke")}
                                        {oppstartsModus && <Loader />}
                                    </Button>
                                    {samtykkeTidspunktStreng === "" && requestToHusbankenFeilet && (
                                        <Alert variant="error">
                                            {getIntlTextOrKey(t, "inntekt.bostotte.nedlasting_feilet")}
                                        </Alert>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {samtykkeTidspunktStreng !== "" && harSamtykke && (
                        <>
                            <div>
                                <Detail>{samtykkeTidspunktStreng}</Detail>
                                <BodyShort>{t("inntekt.bostotte.husbanken.info")}</BodyShort>
                            </div>
                            <Detail>{t("inntekt.bostotte.husbanken.utbetalinger")}</Detail>
                            {!harBostotterUtbetalinger && (
                                <BodyShort>{t("inntekt.bostotte.husbanken.ingenutbetalingerfunnet")}</BodyShort>
                            )}
                            {bostotte.utbetalinger.map((utbetaling, index) => {
                                return renderUtbetaling(
                                    utbetaling.netto,
                                    utbetaling.utbetalingsdato,
                                    utbetaling.mottaker,
                                    index
                                );
                            })}
                            <Detail>{t("inntekt.bostotte.husbanken.saker")}</Detail>
                            {!harBostotterSaker && (
                                <div className="sak blokk-xs">{t("inntekt.bostotte.husbanken.ingensakerfunnet")}</div>
                            )}
                            {bostotte.saker.map((sak, index) => {
                                return renderSak(
                                    "BostotteSak_" + index,
                                    sak.dato,
                                    sak.status,
                                    sak.vedtaksstatus,
                                    sak.beskrivelse,
                                    index
                                );
                            })}
                            {(harBostotterUtbetalinger || harBostotterSaker) && (
                                <Link
                                    href={t("inntekt.bostotte.husbanken.url")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t("inntekt.bostotte.husbanken.lenkeText")}
                                </Link>
                            )}
                            <div className="bostotte-luft-over-ta-bort-knapp-lenke">
                                <Link
                                    id="ta_bort_bostotte_samtykke"
                                    onClick={(event: any) => {
                                        handleSettBostotteSamtykke(false);
                                        event.preventDefault();
                                    }}
                                    href="/ta_bort_samtykke"
                                >
                                    {getIntlTextOrKey(t, "inntekt.bostotte.ta_bort_samtykke")}
                                </Link>
                            </div>
                        </>
                    )}
                </Sporsmal>
            </JaNeiSporsmal>
        </div>
    );
};

export default BostotteView;
