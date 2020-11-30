import * as React from "react";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import EkspanderbartPanel from "nav-frontend-ekspanderbartpanel";
import {bekreftOppsummering, hentOppsummering} from "../../redux/oppsummering/oppsummeringActions";
import {Oppsummering} from "../../redux/oppsummering/oppsummeringTypes";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import {State} from "../../redux/reducers";
import {DispatchProps} from "../../redux/reduxTypes";
import {finnOgOppdaterSoknadsmottakerStatus} from "../../redux/soknad/soknadActions";
import {Link} from "react-router-dom";
import BehandlingAvPersonopplysningerModal from "../../informasjon/BehandlingAvPersonopplysningerModal";
import SoknadsmottakerInfoPanel from "./SoknadsmottakerInfoPanel";
import {Soknadsdata} from "../../redux/soknadsdata/soknadsdataReducer";
import {NavEnhet} from "../personopplysninger/adresse/AdresseTypes";
import BekreftCheckboksPanel from "nav-frontend-skjema/lib/bekreft-checkboks-panel";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import NavFrontendSpinner from "nav-frontend-spinner";
import {getIntlTextOrKey, IntlProps} from "../../../nav-soknad/utils";

interface StateProps {
    oppsummering: Oppsummering | null;
    bekreftet: boolean | undefined;
    visBekreftMangler: boolean | undefined;
    restStatus: REST_STATUS;
    brukerbehandlingId: string | undefined;
    soknadsdata: Soknadsdata;
    valgtSoknadsmottaker: NavEnhet | undefined;
}

type Props = DispatchProps & StateProps & IntlProps;

class OppsummeringView extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.getOppsummering = this.getOppsummering.bind(this);
    }

    componentDidMount() {
        const {brukerbehandlingId, dispatch} = this.props;
        if (brukerbehandlingId) {
            dispatch(finnOgOppdaterSoknadsmottakerStatus(brukerbehandlingId));
            dispatch(hentOppsummering());
        }
    }

    getOppsummering() {
        return {
            __html: this.props.oppsummering || "",
        };
    }

    render() {
        const {oppsummering, brukerbehandlingId, intl, restStatus} = this.props;

        const bolker = oppsummering
            ? oppsummering.bolker.map((bolk, idx) => (
                  <div className="blokk-xs bolk" key={idx}>
                      <EkspanderbartPanel tittel={bolk.tittel} apen={false}>
                          <div>
                              <div className="bolk__rediger">
                                  <Link to={`/skjema/${brukerbehandlingId}/${idx + 1}`}>
                                      {getIntlTextOrKey(this.props.intl, "oppsummering.gatilbake")}
                                  </Link>
                              </div>
                              <div dangerouslySetInnerHTML={{__html: bolk.html}} />
                          </div>
                      </EkspanderbartPanel>
                  </div>
              ))
            : null;

        const skjemaOppsummering = oppsummering ? <div className="skjema-oppsummering">{bolker}</div> : null;

        const bekreftOpplysninger: string = intl.formatMessage({
            id: "soknadsosialhjelp.oppsummering.harLestSamtykker",
        });

        if (restStatus === REST_STATUS.OK) {
            return (
                <DigisosSkjemaSteg steg={DigisosSteg.oppsummering}>
                    <div>{skjemaOppsummering}</div>

                    <div className="infopanel-oppsummering skjema-sporsmal">
                        <SoknadsmottakerInfoPanel />
                    </div>

                    <div className="bekreftOpplysningerPanel blokk-xs bolk">
                        <BekreftCheckboksPanel
                            label={bekreftOpplysninger}
                            checked={this.props.bekreftet ? this.props.bekreftet : false}
                            onChange={() => this.props.dispatch(bekreftOppsummering())}
                            feil={
                                this.props.visBekreftMangler
                                    ? intl.formatHTMLMessage({
                                          id: "oppsummering.feilmelding.bekreftmangler",
                                      })
                                    : ""
                            }
                        >
                            <p style={{marginTop: "0"}}>
                                <FormattedMessage id="soknadsosialhjelp.oppsummering.bekreftOpplysninger" />
                            </p>
                        </BekreftCheckboksPanel>
                    </div>
                    <BehandlingAvPersonopplysningerModal />
                </DigisosSkjemaSteg>
            );
        }

        return (
            <div className="application-spinner">
                <NavFrontendSpinner type="XXL" />
            </div>
        );
    }
}

export default connect((state: State) => {
    return {
        oppsummering: state.oppsummering.oppsummering,
        bekreftet: state.oppsummering.bekreftet,
        visBekreftMangler: state.oppsummering.visBekreftMangler,
        restStatus: state.oppsummering.restStatus,
        brukerbehandlingId: state.soknad.behandlingsId,
        valgtSoknadsmottaker: state.soknad.valgtSoknadsmottaker,
        soknadsdata: state.soknadsdata,
    };
})(injectIntl(OppsummeringView));
