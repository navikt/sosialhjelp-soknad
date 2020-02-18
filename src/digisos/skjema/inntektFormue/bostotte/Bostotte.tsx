import * as React from "react";
import {useEffect, useState} from "react";
import {FormattedDate, FormattedMessage, FormattedNumber, useIntl,} from "react-intl";
import {useDispatch, useSelector} from "react-redux";

import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, getIntlTextOrKey} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {oppdaterSoknadsdataSti, SoknadsSti,} from "../../../redux/soknadsdata/soknadsdataReducer";
import {Bostotte} from "./bostotteTypes";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import Dato from "../../../../nav-soknad/components/tidspunkt/Dato";
import {State} from "../../../redux/reducers";
import {
    hentSoknadsdata,
    lagreSoknadsdata,
    settSamtykkeOgOppdaterData,
} from "../../../redux/soknadsdata/soknadsdataActions";
import Knapp from "nav-frontend-knapper";
import AlertStripe from "nav-frontend-alertstriper";

const FAKTUM_BOSTOTTE = "inntekt.bostotte.sporsmal";

const BostotteView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const dispatch = useDispatch();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector(
        (state: State) => state.soknad.behandlingsId
    );

    const intl = useIntl();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(hentSoknadsdata(behandlingsId, SoknadsSti.BOSTOTTE));
        }
    }, [behandlingsId, dispatch]);

    useEffect(() => {
        if (
            oppstartsModus &&
            soknadsdata.restStatus.inntekt.bostotte === REST_STATUS.OK
        ) {
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
                if (!verdi) { // Fjern samtykke når bruker svarer nei.
                    responseHandler = () => {
                        handleSettBostotteSamtykke(false)
                    };
                }
                dispatch(
                    lagreSoknadsdata(
                        behandlingsId,
                        SoknadsSti.BOSTOTTE,
                        bostotte,
                        responseHandler,
                    )
                );
            }
        }
    };

    const handleSettBostotteSamtykke = (harSamtykke: boolean) => {
        if (!oppstartsModus && behandlingsId) {
            dispatch(settSamtykkeOgOppdaterData(
                behandlingsId,
                SoknadsSti.BOSTOTTE_SAMTYKKE,
                harSamtykke,
                SoknadsSti.BOSTOTTE
            ))
        }
    };

    const renderUtbetaling = (
        netto: number,
        dato: string,
        mottaker: string,
        index: number
    ) => {
        let key = "bostotteUtbetaling_" + index;
        return (
            <div className="utbetalinger blokk-xs" key={key}>
                <div>
                    <FormattedMessage
                        id={"inntekt.bostotte.husbanken.mottaker"}
                        values={{mottaker: mottaker}}
                    />
                </div>
                <div className="utbetaling">
                    <span>
                        <FormattedMessage id="utbetalinger.utbetaling.erutbetalt.label"/>
                        <span className="dato">
                            &nbsp;
                            <Dato tidspunkt={dato}/>
                        </span>
                    </span>
                    <span className="verdi detaljeliste__verdi">
                        <FormattedNumber
                            value={netto}
                            minimumFractionDigits={2}
                            maximumFractionDigits={2}
                        />{" "}
                        kr
                    </span>
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
            status === "VEDTATT" ? (
                <FormattedMessage
                    id={"inntekt.bostotte.husbanken.vedtaksstatus"}
                    values={{status: vedtaksstatus}}
                />
            ) : (
                <FormattedMessage
                    id={"inntekt.bostotte.husbanken.status"}
                    values={{status: status}}
                />
            );
        let formatertDato = (
            <FormattedDate value={dato} month="long" year="numeric"/>
        );
        return (
            <div key={`${key}-${index}`} className="sak blokk-xs">
                <span className="bostotte-dato">{formatertDato}</span>
                {status !== "VEDTATT" && <span>{visningstatus}</span>}
                {status === "VEDTATT" && (
                    <span className="bostotte-visningstatus">
                        {visningstatus}
                    </span>
                )}
                {status === "VEDTATT" && (
                    <>
                        <div className="bostotte-vedtaksbeskrivelse-innrykk">
                            {vedtaksbeskrivelse}
                        </div>
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
    const requestToHusbankenFeilet: boolean =
        bostotte.stotteFraHusbankenFeilet === true;
    const harSamtykke: boolean =
        bostotte.samtykke === true;
    const harBostotterUtbetalinger: boolean =
        bostotte.utbetalinger && bostotte.utbetalinger.length > 0;
    const harBostotterSaker: boolean =
        bostotte.saker && bostotte.saker.length > 0;
    return (
        <div className="blokk-xs">
            <JaNeiSporsmal
                visPlaceholder={oppstartsModus}
                tekster={getFaktumSporsmalTekst(intl, FAKTUM_BOSTOTTE)}
                faktumKey={FAKTUM_BOSTOTTE}
                verdi={bostotte ? bostotte.bekreftelse : null}
                onChange={(verdi: boolean) =>
                    handleClickJaNeiSpsm(verdi)
                }
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <Sporsmal
                    tekster={{
                        sporsmal: requestToHusbankenFeilet || !harSamtykke?getIntlTextOrKey(intl, "inntekt.bostotte.gi_samtykke.overskrift"):""
                    }}
                >
                    {(requestToHusbankenFeilet || !harSamtykke) && (
                        <>
                            {bostotte && bostotte.bekreftelse && (
                                <>
                                    {getIntlTextOrKey(intl, "inntekt.bostotte.gi_samtykke.tekst")}
                                    <Knapp
                                        id="gi_bostotte_samtykke"
                                        type="standard"
                                        spinner={oppstartsModus}
                                        onClick={() => {
                                            handleSettBostotteSamtykke(true)
                                        }}
                                        className="samtykke_knapp_padding"
                                    >
                                        {getIntlTextOrKey(intl, "inntekt.bostotte.gi_samtykke")}
                                    </Knapp>
                                    {requestToHusbankenFeilet && (
                                        <AlertStripe type={"feil"}>
                                            {getIntlTextOrKey(intl, "inntekt.bostotte.nedlasting_feilet")}
                                        </AlertStripe>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {!requestToHusbankenFeilet && harSamtykke && (
                        <>
                            <div>
                                <FormattedMessage id="inntekt.bostotte.husbanken.info"/>
                            </div>
                            <h4 className="blokk-null">
                                <FormattedMessage id="inntekt.bostotte.husbanken.utbetalinger"/>
                            </h4>
                            {!harBostotterUtbetalinger && (
                                <div className="utbetalinger">
                                    <FormattedMessage id="inntekt.bostotte.husbanken.ingenutbetalingerfunnet"/>
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
                            <h4 className="blokk-null saksoverskrift">
                                <FormattedMessage id="inntekt.bostotte.husbanken.saker"/>
                            </h4>
                            {!harBostotterSaker && (
                                <div className="sak blokk-xs">
                                    <FormattedMessage id="inntekt.bostotte.husbanken.ingensakerfunnet"/>
                                </div>
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
                                <a
                                    href="https://kundeforhold-bostotte.husbanken.no/esoknad-bostotte/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FormattedMessage
                                        id={"inntekt.bostotte.husbanken.lenkeText"}
                                    />
                                </a>
                            )}
                            <br/>
                            <Knapp
                                id="ta_bort_bostotte_samtykke"
                                type="flat"
                                spinner={oppstartsModus}
                                mini={true}
                                onClick={() => {
                                    handleSettBostotteSamtykke(false)
                                }}
                                className="samtykke_knapp_padding"
                            >
                                {getIntlTextOrKey(intl, "inntekt.bostotte.ta_bort_samtykke")}
                            </Knapp>
                        </>
                    )}
                </Sporsmal>
            </JaNeiSporsmal>
        </div>
    );
};

export default BostotteView;
