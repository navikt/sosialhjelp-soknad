import * as React from "react";
import {RouteComponentProps, useHistory, withRouter} from "react-router";
import {FormattedMessage, useIntl} from "react-intl";
import {useSelector, useDispatch} from "react-redux";
import {Innholdstittel} from "nav-frontend-typografi";
import {useEffect} from "react";
import Stegindikator from "nav-frontend-stegindikator/lib/stegindikator";

import Feiloppsummering from "../components/validering/Feiloppsummering";
import Knapperad from "../components/knapperad";
import {REST_STATUS, SkjemaConfig, SkjemaSteg, SkjemaStegType} from "../../digisos/redux/soknad/soknadTypes";
import {ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";
import {setVisBekreftMangler} from "../../digisos/redux/oppsummering/oppsummeringActions";
import {getIntlTextOrKey, getStegUrl, scrollToTop} from "../utils";
import {
    avbrytSoknad,
    resetSendSoknadServiceUnavailable,
    sendSoknad,
    sendSoknadPending,
} from "../../digisos/redux/soknad/soknadActions";
import AppBanner from "../components/appHeader/AppHeader";
import {
    clearAllValideringsfeil,
    setValideringsfeil,
    visValideringsfeilPanel,
} from "../../digisos/redux/validering/valideringActions";
import {NavEnhet} from "../../digisos/skjema/personopplysninger/adresse/AdresseTypes";
import {State} from "../../digisos/redux/reducers";
import {erPaStegEnOgValgtNavEnhetErUgyldig, sjekkOmValgtNavEnhetErGyldig} from "./containerUtils";
import {createSkjemaEventData, logAmplitudeEvent} from "../utils/amplitude";
import {useTitle} from "../hooks/useTitle";
import {logInfo} from "../utils/loggerUtils";
import {Alert, Link} from "@navikt/ds-react";
import {WhiteBackground} from "../components/WhiteBackground";

const stopEvent = (evt: React.FormEvent<any>) => {
    evt.stopPropagation();
    evt.preventDefault();
};

const StegMedNavigasjon = (
    props: {
        stegKey: string;
        skjemaConfig: SkjemaConfig;
        pending?: boolean;
        ikon?: React.ReactNode;
        children?: any;
    } & RouteComponentProps
) => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const soknad = useSelector((state: State) => state.soknad);
    const validering = useSelector((state: State) => state.validering);
    const oppsummering = useSelector((state: State) => state.oppsummering.nyOppsummering);
    const oppsummeringBekreftet = useSelector((state: State) => state.oppsummering.bekreftet);
    const lastOppVedleggPending = useSelector((state: State) => state.okonomiskeOpplysninger.enFilLastesOpp);

    const dispatch = useDispatch();

    const history = useHistory();

    const intl = useIntl();

    useEffect(() => {
        scrollToTop();
    }, []);

    const nedetidstart = soknad.nedetid ? soknad.nedetid.nedetidStartText : "";
    const nedetidslutt = soknad.nedetid ? soknad.nedetid.nedetidSluttText : "";
    const isNedetid = soknad.nedetid ? soknad.nedetid.isNedetid : false;
    const adresseValgRestStatus = soknadsdata.restStatus.personalia.adresser;
    const isAdresseValgRestPending =
        adresseValgRestStatus === REST_STATUS.INITIALISERT || adresseValgRestStatus === REST_STATUS.PENDING;

    const loggAdresseTypeTilGrafana = () => {
        const adresseTypeValg = soknadsdata.personalia.adresser.valg;
        if (adresseTypeValg) {
            logInfo("klikk--" + adresseTypeValg);
        }
    };

    const getAttributesForSkjemaFullfortEvent = () => {
        const attributes: Record<string, any> = {};
        oppsummering.forEach((steg) => {
            return steg.avsnitt.forEach((avsnitt) => {
                return avsnitt.sporsmal.forEach((sporsmal) => {
                    if (sporsmal.tittel === "bosituasjon.sporsmal") {
                        attributes["valgtBosted"] = !!sporsmal.felt && sporsmal.felt.length > 0;
                    }
                    if (sporsmal.tittel === "arbeidsforhold.infotekst") {
                        attributes["harArbeidsforhold"] = !!sporsmal.felt && sporsmal.felt.length > 0;
                    }
                    if (sporsmal.tittel === "utbetalinger.inntekt.skattbar.har_gitt_samtykke") {
                        attributes["skattSamtykke"] = true;
                    }
                    if (sporsmal.tittel === "utbetalinger.inntekt.skattbar.mangler_samtykke") {
                        attributes["skattSamtykke"] = false;
                    }
                });
            });
        });
        return attributes;
    };

    const handleGaTilSkjemaSteg = (aktivtSteg: SkjemaSteg | undefined, steg: number) => {
        if (aktivtSteg && behandlingsId) {
            const {feil} = validering;

            const valgtNavEnhet = finnSoknadsMottaker();
            if (erPaStegEnOgValgtNavEnhetErUgyldig(aktivtSteg.stegnummer, valgtNavEnhet)) {
                handleNavEnhetErUgyldigFeil(valgtNavEnhet);
            } else {
                if (feil.length === 0) {
                    dispatch(clearAllValideringsfeil());
                    history.push(getStegUrl(behandlingsId, steg));
                } else {
                    dispatch(visValideringsfeilPanel());
                }
            }
        }
    };

    const kanGaTilSkjemasteg = (aktivtSteg: SkjemaSteg | undefined): boolean => {
        if (aktivtSteg && behandlingsId) {
            const valgtNavEnhet = finnSoknadsMottaker();
            if (erPaStegEnOgValgtNavEnhetErUgyldig(aktivtSteg.stegnummer, valgtNavEnhet)) {
                handleNavEnhetErUgyldigFeil(valgtNavEnhet);
                return false;
            }
        }
        return true;
    };

    const handleGaVidere = (aktivtSteg: SkjemaSteg) => {
        if (behandlingsId) {
            if (aktivtSteg.type === SkjemaStegType.oppsummering) {
                if (oppsummeringBekreftet) {
                    logAmplitudeEvent("skjema fullført", createSkjemaEventData(getAttributesForSkjemaFullfortEvent()));
                    loggAdresseTypeTilGrafana();
                    dispatch(sendSoknadPending());
                    dispatch(sendSoknad(behandlingsId, history));
                } else {
                    dispatch(setVisBekreftMangler(true));
                }
                return;
            }

            const {feil} = validering;
            const valgtNavEnhet = finnSoknadsMottaker();

            if (erPaStegEnOgValgtNavEnhetErUgyldig(aktivtSteg.stegnummer, valgtNavEnhet)) {
                handleNavEnhetErUgyldigFeil(valgtNavEnhet);
            } else {
                if (feil.length === 0) {
                    sjekkOmValgtNavEnhetErGyldig(behandlingsId, dispatch, () => {
                        logAmplitudeEvent("skjemasteg fullført", {
                            ...createSkjemaEventData(),
                            steg: aktivtSteg.stegnummer,
                        });
                        history.push(getStegUrl(behandlingsId, aktivtSteg.stegnummer + 1));
                    });
                } else {
                    dispatch(visValideringsfeilPanel());
                }
            }
        }
    };

    const handleNavEnhetErUgyldigFeil = (valgtNavEnhet: NavEnhet | null) => {
        dispatch(setValideringsfeil(ValideringsFeilKode.SOKNADSMOTTAKER_PAKREVD, "soknadsmottaker"));
        if (!valgtNavEnhet || (!valgtNavEnhet.enhetsnavn && !valgtNavEnhet.enhetsnr)) {
            logInfo("Ingen navenhet valgt");
        } else {
            logInfo(`Ugyldig navenhet valgt: ${valgtNavEnhet.enhetsnr} ${valgtNavEnhet.enhetsnavn}`);
        }
        dispatch(visValideringsfeilPanel());
    };

    const finnSoknadsMottaker = () => {
        return soknadsdata.personalia.navEnhet as NavEnhet | null;
    };

    const finnKommunenavn = () => {
        const valgtNavEnhet = soknadsdata.personalia.navEnhet as NavEnhet | null;
        if (valgtNavEnhet === null) {
            return "Din";
        }
        return valgtNavEnhet.kommunenavn;
    };

    const handleGaTilbake = (aktivtSteg: number) => {
        if (behandlingsId) {
            dispatch(clearAllValideringsfeil());
            dispatch(resetSendSoknadServiceUnavailable());
            history.push(getStegUrl(behandlingsId, aktivtSteg - 1));
        }
    };

    const {skjemaConfig, stegKey, ikon, children} = props;

    const {feil, visValideringsfeil} = validering;

    const aktivtStegConfig: SkjemaSteg | undefined = skjemaConfig.steg.find((s) => s.key === stegKey);

    const nextButtonPending =
        soknad.sendSoknadPending || (aktivtStegConfig?.key === "kontakt" ? isAdresseValgRestPending : false);

    const erOppsummering: boolean = aktivtStegConfig ? aktivtStegConfig.type === SkjemaStegType.oppsummering : false;
    const stegTittel = getIntlTextOrKey(intl, `${stegKey}.tittel`);
    const documentTitle = intl.formatMessage({
        id: skjemaConfig.tittelId,
    });
    const synligeSteg = skjemaConfig.steg.filter((s) => s.type === SkjemaStegType.skjema);

    const aktivtSteg: number = aktivtStegConfig ? aktivtStegConfig.stegnummer : 1;

    useTitle(`${stegTittel} - ${documentTitle}`);

    return (
        <WhiteBackground className="app-digisos">
            <AppBanner />
            {isNedetid && (
                <Alert variant="error" style={{justifyContent: "center"}}>
                    <FormattedMessage
                        id="nedetid.alertstripe.infoside"
                        values={{
                            nedetidstart: nedetidstart,
                            nedetidslutt: nedetidslutt,
                        }}
                    />
                </Alert>
            )}

            <div className="skjema-steg skjema-content">
                <div className="skjema-steg__feiloppsummering">
                    <Feiloppsummering
                        skjemanavn={skjemaConfig.skjemanavn}
                        valideringsfeil={feil}
                        visFeilliste={visValideringsfeil}
                    />
                </div>
                {!erOppsummering && (
                    <div className="skjema__stegindikator">
                        <Stegindikator
                            autoResponsiv={true}
                            kompakt={false}
                            aktivtSteg={aktivtSteg - 1}
                            steg={synligeSteg.map((s) => {
                                return {
                                    label: intl.formatMessage({
                                        id: `${s.key}.tittel`,
                                    }),
                                    index: s.stegnummer - 1,
                                };
                            })}
                            onBeforeChange={() => kanGaTilSkjemasteg(aktivtStegConfig)}
                            onChange={(s: number) => handleGaTilSkjemaSteg(aktivtStegConfig, s + 1)}
                        />
                    </div>
                )}
                <form id="soknadsskjema" onSubmit={stopEvent}>
                    <div className="skjema-steg__ikon">{ikon}</div>
                    <div className="skjema-steg__tittel" tabIndex={-1}>
                        <Innholdstittel className="sourceSansProBold">{stegTittel}</Innholdstittel>
                    </div>

                    {children}

                    {soknad.visMidlertidigDeaktivertPanel && aktivtSteg !== 1 && !(aktivtSteg === 9 && isNedetid) && (
                        <Alert variant="error">
                            <FormattedMessage
                                id="adresse.alertstripe.feil.v2"
                                values={{
                                    kommuneNavn: finnKommunenavn(),
                                    a: (msg: string) => (
                                        <Link href="https://www.nav.no/sosialhjelp/sok-papir" target="_blank">
                                            {msg}
                                        </Link>
                                    ),
                                }}
                            />
                        </Alert>
                    )}
                    {soknad.visIkkePakobletPanel && aktivtSteg !== 1 && !(aktivtSteg === 9 && isNedetid) && (
                        <Alert variant="warning">
                            <FormattedMessage
                                id="adresse.alertstripe.advarsel.v2"
                                values={{
                                    kommuneNavn: finnKommunenavn(),
                                    a: (msg: string) => (
                                        <Link
                                            href="https://husbanken.no/bostotte"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            {msg}
                                        </Link>
                                    ),
                                }}
                            />
                        </Alert>
                    )}

                    {aktivtStegConfig && (
                        <Knapperad
                            gaViderePending={nextButtonPending}
                            gaVidereLabel={erOppsummering ? getIntlTextOrKey(intl, "skjema.knapper.send") : undefined}
                            gaVidere={() => handleGaVidere(aktivtStegConfig)}
                            gaTilbake={
                                aktivtStegConfig.stegnummer > 1
                                    ? () => handleGaTilbake(aktivtStegConfig.stegnummer)
                                    : undefined
                            }
                            avbryt={() => dispatch(avbrytSoknad())}
                            sendSoknadServiceUnavailable={soknad.sendSoknadServiceUnavailable}
                            lastOppVedleggPending={lastOppVedleggPending}
                        />
                    )}

                    {soknad.showSendingFeiletPanel && aktivtSteg === 9 && (
                        <div role="alert">
                            <Alert variant="error" style={{marginTop: "1rem"}}>
                                Vi klarte ikke sende søknaden din, grunnet en midlertidig teknisk feil. Vi ber deg prøve
                                igjen. Søknaden din er lagret og dersom problemet fortsetter kan du forsøke igjen
                                senere. Kontakt ditt NAV kontor dersom du er i en nødsituasjon.
                            </Alert>
                        </div>
                    )}

                    {soknad.visMidlertidigDeaktivertPanel && isNedetid && aktivtSteg === 9 && (
                        <Alert variant="error" style={{marginTop: "1rem"}}>
                            <FormattedMessage
                                id="nedetid.alertstripe.send"
                                values={{
                                    nedetidstart: nedetidstart,
                                    nedetidslutt: nedetidslutt,
                                }}
                            />
                        </Alert>
                    )}
                </form>
            </div>
        </WhiteBackground>
    );
};

export default withRouter(StegMedNavigasjon);
