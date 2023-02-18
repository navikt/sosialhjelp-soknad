import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {formatTidspunkt, getFaktumSporsmalTekst, getIntlTextOrKey} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {Bostotte} from "./bostotteTypes";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import Dato from "../../../../nav-soknad/components/tidspunkt/Dato";
import {State} from "../../../redux/reducers";
import {
    hentSoknadsdata,
    lagreSoknadsdata,
    settSamtykkeOgOppdaterData,
} from "../../../redux/soknadsdata/soknadsdataActions";
import {UndertekstBold} from "nav-frontend-typografi";
import {Alert, BodyShort, Button, Heading, Link, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {fmtCurrency} from "../../../../lib/fmtCurrency";
import {useBehandlingsId} from "../../../../nav-soknad/hooks/useBehandlingsId";

const FAKTUM_BOSTOTTE = "inntekt.bostotte.sporsmal";

const BostotteView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const dispatch = useDispatch();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useBehandlingsId();
    const {t, i18n} = useTranslation("skjema");

    useEffect(() => {
        if (behandlingsId) {
            hentSoknadsdata(behandlingsId, SoknadsSti.BOSTOTTE, dispatch);
        }
    }, [behandlingsId, dispatch]);

    useEffect(() => {
        if (oppstartsModus && soknadsdata.restStatus.inntekt.bostotte === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.inntekt.bostotte]);

    const handleClickJaNeiSpsm = (verdi: boolean) => {
        const restStatus = soknadsdata.restStatus.inntekt.bostotte;
        if (restStatus === REST_STATUS.OK && behandlingsId) {
            const bostotte: Bostotte | undefined = soknadsdata.inntekt.bostotte;
            if (bostotte) {
                bostotte.bekreftelse = verdi;
                dispatch(oppdaterSoknadsdataSti(SoknadsSti.BOSTOTTE, bostotte));
                let responseHandler = undefined;
                if (!verdi) {
                    // Fjern samtykke når bruker svarer nei.
                    responseHandler = () => {
                        handleSettBostotteSamtykke(false);
                    };
                }
                lagreSoknadsdata(behandlingsId, SoknadsSti.BOSTOTTE, bostotte, dispatch, responseHandler);
            }
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
                            <Dato>{dato}</Dato>
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
        samtykkeTidspunktStreng = formatTidspunkt(samtykkeTidspunkt.toString());
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
                            {bostotte && bostotte.bekreftelse && (
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
                                <UndertekstBold>{samtykkeTidspunktStreng}</UndertekstBold>
                                <p>{t("inntekt.bostotte.husbanken.info")}</p>
                            </div>
                            <UndertekstBold className="blokk-null">
                                {t("inntekt.bostotte.husbanken.utbetalinger")}
                            </UndertekstBold>
                            {!harBostotterUtbetalinger && (
                                <div className="utbetalinger">
                                    {t("inntekt.bostotte.husbanken.ingenutbetalingerfunnet")}
                                </div>
                            )}
                            {bostotte.utbetalinger.map((utbetaling, index) => {
                                return renderUtbetaling(
                                    utbetaling.netto,
                                    utbetaling.utbetalingsdato,
                                    utbetaling.mottaker,
                                    index
                                );
                            })}
                            <UndertekstBold className="blokk-null saksoverskrift">
                                {t("inntekt.bostotte.husbanken.saker")}
                            </UndertekstBold>
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
