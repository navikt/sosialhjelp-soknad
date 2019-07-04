import * as React from "react";
import {connect} from "react-redux";
import {FormattedMessage, InjectedIntlProps, injectIntl} from "react-intl";
import EkspanderbartPanel from "nav-frontend-ekspanderbartpanel";
import {REST_STATUS} from "../../../nav-soknad/types";
import LoadContainer from "../../../nav-soknad/components/loadContainer/LoadContainer";
import {bekreftOppsummering, hentOppsummering,} from "../../../nav-soknad/redux/oppsummering/oppsummeringActions";
import {Oppsummering} from "../../../nav-soknad/redux/oppsummering/oppsummeringTypes";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import {State} from "../../redux/reducers";
import {DispatchProps} from "../../../nav-soknad/redux/reduxTypes";
import {finnOgOppdaterSoknadsmottakerStatus, settInfofaktum} from "../../../nav-soknad/redux/soknad/soknadActions";
import {getIntlTextOrKey} from "../../../nav-soknad/utils/intlUtils";
import {Link} from "react-router-dom";
import BehandlingAvPersonopplysningerModal from "../../informasjon/BehandlingAvPersonopplysningerModal";
import SoknadsmottakerInfoPanel from "./SoknadsmottakerInfoPanel";
import {Soknadsdata} from "../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import {NavEnhet} from "../personopplysninger/adresse/AdresseTypes";
import BekreftCheckboksPanel from "nav-frontend-skjema/lib/bekreft-checkboks-panel";

interface StateProps {
	oppsummering: Oppsummering | null;
	bekreftet: boolean | undefined;
	visBekreftMangler: boolean | undefined;
	restStatus: REST_STATUS;
	brukerbehandlingId: string;
	soknadsdata: Soknadsdata;
	valgtSoknadsmottaker: NavEnhet | undefined;
}

type Props = DispatchProps & StateProps & InjectedIntlProps;

class OppsummeringView extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.getOppsummering = this.getOppsummering.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(finnOgOppdaterSoknadsmottakerStatus(this.props.brukerbehandlingId));
		this.props.dispatch(hentOppsummering());
		this.props.dispatch(
			settInfofaktum({
				faktumKey: "informasjon.tekster",
				properties: {
					"1": getIntlTextOrKey(this.props.intl, "informasjon.start.tittel"),
					"2": getIntlTextOrKey(this.props.intl, "informasjon.start.tekst"),
					"3": getIntlTextOrKey(
						this.props.intl,
						"informasjon.nodsituasjon.undertittel"
					),
					"4": getIntlTextOrKey(
						this.props.intl,
						"informasjon.nodsituasjon.tekst"
					)
				}
			})
		);
	}

	getOppsummering() {
		return {
			__html: this.props.oppsummering || ""
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
								<Link
									to={`/skjema/${brukerbehandlingId}/${idx + 1}`}
								>
									{getIntlTextOrKey(
										this.props.intl,
										"oppsummering.gatilbake"
									)}
								</Link>
							</div>
							<div dangerouslySetInnerHTML={{__html: bolk.html}}/>
						</div>
					</EkspanderbartPanel>
				</div>
			))
			: null;

		const skjemaOppsummering = oppsummering ? (
			<div className="skjema-oppsummering">{bolker}</div>
		) : null;

		const bekreftOpplysninger: string = intl.formatMessage({
			id: "soknadsosialhjelp.oppsummering.harLestSamtykker"
		});

		let restStatusUpdated = restStatus;
		if(!this.props.valgtSoknadsmottaker){
			restStatusUpdated = REST_STATUS.PENDING
		}

		return (
			<LoadContainer restStatus={restStatusUpdated}>
				<DigisosSkjemaSteg steg={DigisosSteg.oppsummering}>
					<div>
						{skjemaOppsummering}
					</div>

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
									? {
										feilmelding: intl.formatHTMLMessage({
											id: "oppsummering.feilmelding.bekreftmangler"
										})
									}
									: undefined
							}
						>
							<p style={{marginTop: "0"}}>
								<FormattedMessage id="soknadsosialhjelp.oppsummering.bekreftOpplysninger"/>
							</p>
						</BekreftCheckboksPanel>
					</div>
					<BehandlingAvPersonopplysningerModal/>
				</DigisosSkjemaSteg>
			</LoadContainer>
		);
	}
}

export default connect((state: State) => {
	return {
		oppsummering: state.oppsummering.oppsummering,
		bekreftet: state.oppsummering.bekreftet,
		visBekreftMangler: state.oppsummering.visBekreftMangler,
		restStatus: state.oppsummering.restStatus,
		brukerbehandlingId: state.soknad.data.brukerBehandlingId,
		valgtSoknadsmottaker: state.soknad.valgtSoknadsmottaker,
		soknadsdata: state.soknadsdata
	};
})(injectIntl(OppsummeringView));
