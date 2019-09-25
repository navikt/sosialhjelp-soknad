import * as React from "react";
import {RouteComponentProps, RouterProps, withRouter} from "react-router";
import {InjectedIntlProps, injectIntl} from "react-intl";
import {Location} from "history";
import {connect} from "react-redux";
import DocumentTitle from "react-document-title";
import {Innholdstittel} from "nav-frontend-typografi";
import ApplikasjonsfeilDialog from "./ApplikasjonsfeilDialog";
import Feiloppsummering from "../components/validering/Feiloppsummering";
import Knapperad from "../components/knapperad";
import {SkjemaConfig, SkjemaSteg, SkjemaStegType} from "../types";
import {DispatchProps, ValideringsFeilKode} from "../../digisos/redux/reduxTypes";
import {setVisBekreftMangler} from "../../digisos/redux/oppsummering/oppsummeringActions";
import {getIntlTextOrKey, scrollToTop} from "../utils";
import {avbrytSoknad, sendSoknad} from "../../digisos/redux/soknad/soknadActions";
import {gaTilbake, gaVidere, tilSteg} from "../../digisos/redux/navigasjon/navigasjonActions";
import {loggInfo} from "../../digisos/redux/navlogger/navloggerActions";
import AppBanner from "../components/appHeader/AppHeader";
import {Soknadsdata} from "../../digisos/redux/soknadsdata/soknadsdataReducer";
import {clearAllValideringsfeil, setValideringsfeil, visValideringsfeilPanel} from "../../digisos/redux/validering/valideringActions";
import {ValideringState} from "../../digisos/redux/validering/valideringReducer";
import {NavEnhet} from "../../digisos/skjema/personopplysninger/adresse/AdresseTypes";
import {State} from "../../digisos/redux/reducers";
import Stegindikator from "nav-frontend-stegindikator/lib/stegindikator";

const stopEvent = (evt: React.FormEvent<any>) => {
    evt.stopPropagation();
    evt.preventDefault();
};

const stopKeyCodeEvent = (evt: any) => {
    const key = evt.key;
    if (key === 'Enter'){
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
            brukerBehandlingId: string;
        };
        url: string;
    };
}

interface StateProps {
    validering: ValideringState;
    nextButtonPending?: boolean;
    oppsummeringBekreftet?: boolean;
    fodselsnummer: string;
    soknadsdata: Soknadsdata;
}

type Props = OwnProps &
    StateProps &
    RouterProps &
    InjectedRouterProps &
    InjectedIntlProps &
    DispatchProps & RouteComponentProps;

class StegMedNavigasjon extends React.Component<Props, {}> {
    stegTittel!: HTMLElement;

    constructor(props: Props) {
        super(props);
        this.handleGaVidere = this.handleGaVidere.bind(this);
        this.sendSoknad = this.sendSoknad.bind(this);
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

    sendSoknad(brukerBehandlingId: string) {
        this.props.dispatch(sendSoknad(brukerBehandlingId));
    }

    handleGaTilSkjemaSteg(aktivtSteg: SkjemaSteg | undefined, steg: number) {
        if (aktivtSteg) {
            const {feil} = this.props.validering;

            const valgtNavEnhet = this.finnSoknadsMottaker();
            if (aktivtSteg.stegnummer === 1 && !valgtNavEnhet) {
                this.props.dispatch(setValideringsfeil(ValideringsFeilKode.SOKNADSMOTTAKER_PAKREVD, "soknadsmottaker"));
                this.props.dispatch(visValideringsfeilPanel());
            } else {
                if (feil.length === 0) {
                    this.props.dispatch(clearAllValideringsfeil());
                    this.props.dispatch(tilSteg(steg));
                } else {
                    this.props.dispatch(visValideringsfeilPanel());
                }
            }
        }
    }

    handleGaVidere(aktivtSteg: SkjemaSteg, brukerBehandlingId: string) {
        if (aktivtSteg.type === SkjemaStegType.oppsummering) {
            if (this.props.oppsummeringBekreftet) {
                this.loggAdresseTypeTilGrafana();
                this.sendSoknad(brukerBehandlingId);
            } else {
                this.props.dispatch(setVisBekreftMangler(true));
            }
            return;
        }

        const {feil} = this.props.validering;

        const valgtNavEnhet = this.finnSoknadsMottaker();
        if (aktivtSteg.stegnummer === 1 && !valgtNavEnhet) {
            this.props.dispatch(setValideringsfeil(ValideringsFeilKode.SOKNADSMOTTAKER_PAKREVD, "soknadsmottaker"));
            this.props.dispatch(visValideringsfeilPanel());
        } else {
            if (feil.length === 0) {
                this.props.dispatch(clearAllValideringsfeil());
                this.props.dispatch(gaVidere(aktivtSteg.stegnummer));
            } else {
                this.props.dispatch(visValideringsfeilPanel());
            }
        }
    }

    finnSoknadsMottaker() {
        const valgtNavEnhet: NavEnhet | undefined = this.props.soknadsdata.personalia.navEnheter.find((navenhet: NavEnhet) => navenhet.valgt);
        return valgtNavEnhet;
    }

    handleGaTilbake(aktivtSteg: number) {
        this.props.dispatch(clearAllValideringsfeil());
        this.props.dispatch(gaTilbake(aktivtSteg));
    }

    render() {
        const {skjemaConfig, intl, children, validering} = this.props;
        const aktivtStegConfig: SkjemaSteg | undefined = skjemaConfig.steg.find(
            s => s.key === this.props.stegKey
        );
        const brukerBehandlingId = this.props.match.params.brukerBehandlingId;
        const erOppsummering: boolean = aktivtStegConfig ? aktivtStegConfig.type === SkjemaStegType.oppsummering : false;
        const stegTittel = getIntlTextOrKey(intl, `${this.props.stegKey}.tittel`);
        const documentTitle = intl.formatMessage({
            id: this.props.skjemaConfig.tittelId
        });
        const synligeSteg = skjemaConfig.steg.filter(
            s => s.type === SkjemaStegType.skjema
        );

        const {feil, visValideringsfeil} = validering;

        const aktivtSteg: number = aktivtStegConfig ? aktivtStegConfig.stegnummer - 1 : 0;

        return (
            <div className="app-digisos informasjon-side">
                <AppBanner/>
                <ApplikasjonsfeilDialog/>
                <DocumentTitle title={`${stegTittel} - ${documentTitle}`}/>

                <div className="skjema-steg skjema-content">
                    <div className="skjema-steg__feiloppsummering">
                        <Feiloppsummering
                            skjemanavn={this.props.skjemaConfig.skjemanavn}
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
                                    aktivtSteg={aktivtSteg}
                                    steg={synligeSteg.map((s) => {
                                        return {
                                            label: intl.formatMessage({id: `${s.key}.tittel`}),
                                            index: s.stegnummer,
                                        }
                                    })}
                                    onChange={(s: number) => this.handleGaTilSkjemaSteg(aktivtStegConfig, s + 1)}
                                />
                            </div>
                        ) : null}
                        <div className="skjema-steg__ikon">
                            {this.props.ikon}
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
                        {aktivtStegConfig &&
                        <Knapperad
                            gaViderePending={this.props.nextButtonPending}
                            gaVidereLabel={
                                erOppsummering
                                    ? getIntlTextOrKey(intl, "skjema.knapper.send")
                                    : undefined
                            }
                            gaVidere={() =>
                                this.handleGaVidere(aktivtStegConfig, brukerBehandlingId)}
                            gaTilbake={
                                aktivtStegConfig.stegnummer > 1
                                    ? () => this.handleGaTilbake(aktivtStegConfig.stegnummer)
                                    : undefined
                            }
                            avbryt={() => this.props.dispatch(avbrytSoknad())}
                        />
                        }
                    </form>
                </div>
            </div>
        );
    }
}

export default connect((state: State) => {
    return {
        validering: state.validering,
        nextButtonPending: state.soknad.sendSoknadPending,
        oppsummeringBekreftet: state.oppsummering.bekreftet,
        fodselsnummer: state.soknadsdata.personalia.basisPersonalia.fodselsnummer,
        soknadsdata: state.soknadsdata
    };
})(injectIntl(withRouter(StegMedNavigasjon)));
