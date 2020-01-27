import * as React from "react";
import {RouteComponentProps, RouterProps, withRouter} from "react-router";
import {FormattedHTMLMessage, injectIntl} from "react-intl";
import {Location} from "history";
import {connect} from "react-redux";
import DocumentTitle from "react-document-title";
import {Innholdstittel} from "nav-frontend-typografi";
import Feiloppsummering from "../components/validering/Feiloppsummering";
import Knapperad from "../components/knapperad";
import {
    SkjemaConfig,
    SkjemaSteg,
    SkjemaStegType,
    SoknadState} from "../../digisos/redux/soknad/soknadTypes";
import {DispatchProps, ValideringsFeilKode} from "../../digisos/redux/reduxTypes";
import {setVisBekreftMangler} from "../../digisos/redux/oppsummering/oppsummeringActions";
import {getIntlTextOrKey, IntlProps, scrollToTop} from "../utils";
import {
    avbrytSoknad,
    resetSendSoknadServiceUnavailable,
    sendSoknad
} from "../../digisos/redux/soknad/soknadActions";
import {gaTilbake, gaVidere, tilSteg} from "../../digisos/redux/navigasjon/navigasjonActions";
import {loggInfo} from "../../digisos/redux/navlogger/navloggerActions";
import AppBanner from "../components/appHeader/AppHeader";
import {
    Soknadsdata,
} from "../../digisos/redux/soknadsdata/soknadsdataReducer";
import {
    clearAllValideringsfeil,
    setValideringsfeil,
    visValideringsfeilPanel
} from "../../digisos/redux/validering/valideringActions";
import {ValideringState} from "../../digisos/redux/validering/valideringReducer";
import {NavEnhet} from "../../digisos/skjema/personopplysninger/adresse/AdresseTypes";
import {State} from "../../digisos/redux/reducers";
import Stegindikator from "nav-frontend-stegindikator/lib/stegindikator";
import {
    erPaStegEnOgValgtNavEnhetErUgyldig, sjekkOmValgtNavEnhetErGyldig,
} from "./containerUtils";
import AlertStripe from "nav-frontend-alertstriper";

const stopEvent = (evt: React.FormEvent<any>) => {
    evt.stopPropagation();
    evt.preventDefault();
};

const stopKeyCodeEvent = (evt: any) => {
    const key = evt.key;
    if (key === 'Enter') {
        evt.stopPropagation();
        evt.preventDefault();
    }
};

interface OwnProps {
    stegKey: string;
    skjemaConfig: SkjemaConfig;
    pending?: boolean;
    ikon?: React.ReactNode;
}

interface InjectedRouterProps {
    location: Location;
    match: {
        params: {
            behandlingsId: string;
        };
        url: string;
    };
}

interface StateProps {
    behandlingsId: string | undefined;
    validering: ValideringState;
    nextButtonPending?: boolean;
    oppsummeringBekreftet?: boolean;
    fodselsnummer: string;
    soknadsdata: Soknadsdata;
    soknad: SoknadState;
    nedetidstart: string | undefined;
    nedetidslutt: string | undefined;
    isNedetid: boolean;
    isPlanlagtNedetid: boolean;
}

type Props = OwnProps &
    StateProps &
    RouterProps &
    InjectedRouterProps &
    IntlProps &
    DispatchProps & RouteComponentProps;

class StegMedNavigasjon extends React.Component<Props, {}> {
    stegTittel!: HTMLElement;

    constructor(props: Props) {
        super(props);
        this.handleGaVidere = this.handleGaVidere.bind(this);
    }

    componentDidMount() {
        scrollToTop();
        if (this.stegTittel) {
            this.stegTittel.focus();
        }
    }

    loggAdresseTypeTilGrafana() {
        const adresseTypeValg = this.props.soknadsdata.personalia.adresser.valg;
        if (adresseTypeValg) {
            this.props.dispatch(loggInfo("klikk--" + adresseTypeValg));
        }
    }

    handleGaTilSkjemaSteg(aktivtSteg: SkjemaSteg | undefined, steg: number) {
        const {behandlingsId} = this.props;
        if (aktivtSteg && behandlingsId) {
            const {feil} = this.props.validering;

            const valgtNavEnhet = this.finnSoknadsMottaker();
            if (erPaStegEnOgValgtNavEnhetErUgyldig(aktivtSteg.stegnummer, valgtNavEnhet)) {
                this.props.dispatch(setValideringsfeil(ValideringsFeilKode.SOKNADSMOTTAKER_PAKREVD, "soknadsmottaker"));
                this.props.dispatch(visValideringsfeilPanel());
            } else {
                if (feil.length === 0) {
                    this.props.dispatch(clearAllValideringsfeil());
                    this.props.dispatch(tilSteg(steg, behandlingsId));
                } else {
                    this.props.dispatch(visValideringsfeilPanel());
                }
            }
        }
    }

    handleGaVidere(aktivtSteg: SkjemaSteg) {
        const {behandlingsId, dispatch} = this.props;
        if (behandlingsId) {
            if (aktivtSteg.type === SkjemaStegType.oppsummering) {
                if (this.props.oppsummeringBekreftet) {
                    this.loggAdresseTypeTilGrafana();
                    dispatch(sendSoknad(behandlingsId));
                } else {
                    dispatch(setVisBekreftMangler(true));
                }
                return;
            }

            const {feil} = this.props.validering;
            const valgtNavEnhet = this.finnSoknadsMottaker();

            if (erPaStegEnOgValgtNavEnhetErUgyldig(aktivtSteg.stegnummer, valgtNavEnhet)) {
                dispatch(setValideringsfeil(ValideringsFeilKode.SOKNADSMOTTAKER_PAKREVD, "soknadsmottaker"));
                dispatch(visValideringsfeilPanel());
            } else {
                if (feil.length === 0) {
                    sjekkOmValgtNavEnhetErGyldig(behandlingsId, dispatch, () => {
                        dispatch(gaVidere(aktivtSteg.stegnummer, behandlingsId));
                    });
                } else {
                    this.props.dispatch(visValideringsfeilPanel());
                }
            }
        }
    }

    finnSoknadsMottaker() {
        return this.props.soknadsdata.personalia.navEnhet as (NavEnhet | null);
    }

    finnKommunenavn() {
        const valgtNavEnhet = this.props.soknadsdata.personalia.navEnhet as (NavEnhet | null);
        if (valgtNavEnhet === null) {
            return "Din";
        }
        return valgtNavEnhet.kommunenavn;
    }

    handleGaTilbake(aktivtSteg: number) {
        const {behandlingsId} = this.props;
        if (behandlingsId) {
            this.props.dispatch(clearAllValideringsfeil());
            this.props.dispatch(resetSendSoknadServiceUnavailable());
            this.props.dispatch(gaTilbake(aktivtSteg, behandlingsId));
        }
    }

    render() {
        const {
            skjemaConfig,
            intl,
            children,
            validering,
            soknad,
            stegKey,
            ikon,
            nextButtonPending,
            nedetidstart,
            nedetidslutt,
            isNedetid,
        } = this.props;
        const {feil, visValideringsfeil} = validering;

        const aktivtStegConfig: SkjemaSteg | undefined = skjemaConfig.steg.find(
            s => s.key === stegKey
        );

        const erOppsummering: boolean = aktivtStegConfig ? aktivtStegConfig.type === SkjemaStegType.oppsummering : false;
        const stegTittel = getIntlTextOrKey(intl, `${stegKey}.tittel`);
        const documentTitle = intl.formatMessage({
            id: skjemaConfig.tittelId
        });
        const synligeSteg = skjemaConfig.steg.filter(
            s => s.type === SkjemaStegType.skjema
        );

        const aktivtSteg: number = aktivtStegConfig ? aktivtStegConfig.stegnummer : 1;

        return (
            <div className="app-digisos informasjon-side">
                <AppBanner/>
                <DocumentTitle title={`${stegTittel} - ${documentTitle}`}/>
                {isNedetid && (
                    <AlertStripe type="feil" style={{justifyContent: "center"}}>
                        <FormattedHTMLMessage
                            id="nedetid.alertstripe.infoside"
                            values={
                                {
                                    nedetidstart: nedetidstart,
                                    nedetidslutt: nedetidslutt
                                }}
                        />
                    </AlertStripe>
                )}


                <div className="skjema-steg skjema-content">
                    <div className="skjema-steg__feiloppsummering">
                        <Feiloppsummering
                            skjemanavn={skjemaConfig.skjemanavn}
                            valideringsfeil={feil}
                            visFeilliste={visValideringsfeil}
                        />
                    </div>
                    <form id="soknadsskjema"
                          onSubmit={stopEvent}
                          onKeyPress={stopKeyCodeEvent}
                    >
                        {!erOppsummering ? (
                            <div className="skjema__stegindikator">
                                <Stegindikator
                                    autoResponsiv={true}
                                    kompakt={false}
                                    aktivtSteg={aktivtSteg - 1}
                                    steg={synligeSteg.map((s) => {
                                        return {
                                            label: intl.formatMessage({id: `${s.key}.tittel`}),
                                            index: s.stegnummer - 1,
                                        }
                                    })}
                                    onChange={(s: number) => this.handleGaTilSkjemaSteg(aktivtStegConfig, s + 1)}
                                />
                            </div>
                        ) : null}
                        <div className="skjema-steg__ikon">
                            {ikon}
                        </div>
                        <div
                            className="skjema-steg__tittel"
                            tabIndex={-1}
                            ref={c => {
                                if (c) {
                                    this.stegTittel = c
                                }
                            }}
                        >
                            <Innholdstittel className="sourceSansProBold">{stegTittel}</Innholdstittel>
                        </div>

                        {children}

                        {soknad.visMidlertidigDeaktivertPanel && aktivtSteg !== 1 &&
                        !(aktivtSteg === 9 && isNedetid) && (
                            <AlertStripe type="feil">
                                <FormattedHTMLMessage
                                    id="adresse.alertstripe.feil.utenurl"
                                    values={
                                        {
                                            kommuneNavn: this.finnKommunenavn()
                                        }}
                                />
                            </AlertStripe>
                        )}
                        {soknad.visIkkePakobletPanel && aktivtSteg !== 1 &&
                        !(aktivtSteg === 9 && isNedetid) && (
                            <AlertStripe type="advarsel">
                                <FormattedHTMLMessage
                                    id="adresse.alertstripe.advarsel.utenurl"
                                    values={
                                        {
                                            kommuneNavn: this.finnKommunenavn()
                                        }}
                                />
                            </AlertStripe>
                        )}

                        {aktivtStegConfig && (
                            <Knapperad
                                gaViderePending={nextButtonPending}
                                gaVidereLabel={
                                    erOppsummering
                                        ? getIntlTextOrKey(intl, "skjema.knapper.send")
                                        : undefined
                                }
                                gaVidere={() =>
                                    this.handleGaVidere(aktivtStegConfig)}
                                gaTilbake={
                                    aktivtStegConfig.stegnummer > 1
                                        ? () => this.handleGaTilbake(aktivtStegConfig.stegnummer)
                                        : undefined
                                }
                                avbryt={() => this.props.dispatch(avbrytSoknad())}
                                sendSoknadServiceUnavailable={soknad.sendSoknadServiceUnavailable}
                            />
                        )}

                        {soknad.showSendingFeiletPanel && aktivtSteg === 9 && (
                            <AlertStripe type="feil" style={{marginTop: "1rem"}}>
                                Vi klarte ikke sende søknaden din, grunnet en midlertidig teknsik feil.
                                Vi ber deg prøve igjen. Søknaden din er lagret og dersom problemet fortsetter kan du forsøke igjen senere. Kontakt ditt NAV kontor dersom du er i en nødsituasjon.
                            </AlertStripe>
                        )}

                        {soknad.visMidlertidigDeaktivertPanel && isNedetid && aktivtSteg === 9 && (
                            <AlertStripe type="feil" style={{marginTop: "1rem"}}>
                                <FormattedHTMLMessage
                                    id="nedetid.alertstripe.send"
                                    values={
                                        {
                                            nedetidstart: nedetidstart,
                                            nedetidslutt: nedetidslutt
                                        }}
                                />
                            </AlertStripe>
                        )}
                    </form>
                </div>
            </div>
        );
    }
}

export default connect((state: State) => {
    return {
        behandlingsId: state.soknad.behandlingsId,
        validering: state.validering,
        nextButtonPending: state.soknad.sendSoknadPending,
        oppsummeringBekreftet: state.oppsummering.bekreftet,
        fodselsnummer: state.soknadsdata.personalia.basisPersonalia.fodselsnummer,
        soknadsdata: state.soknadsdata,
        soknad: state.soknad,
        nedetidstart: state.soknad.nedetid ? state.soknad.nedetid.nedetidStartText : "",
        nedetidslutt: state.soknad.nedetid ? state.soknad.nedetid.nedetidSluttText : "",
        isNedetid: state.soknad.nedetid ? state.soknad.nedetid.isNedetid : false,
        isPlanlagtNedetid: state.soknad.nedetid ? state.soknad.nedetid.isPlanlagtNedetid : false,
    };
})(injectIntl(withRouter(StegMedNavigasjon)));
