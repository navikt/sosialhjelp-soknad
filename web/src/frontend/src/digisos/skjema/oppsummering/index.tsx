import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import { Checkbox } from "nav-frontend-skjema";
import EkspanderbartPanel from "nav-frontend-ekspanderbartpanel";

import { REST_STATUS } from "../../../nav-soknad/types";
import LoadContainer from "../../../nav-soknad/components/loadContainer/LoadContainer";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import {
	hentOppsummering,
	bekreftOppsummering, setVisBekreftInfo
} from "../../../nav-soknad/redux/oppsummering/oppsummeringActions";
import { Oppsummering } from "../../../nav-soknad/redux/oppsummering/oppsummeringTypes";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { State } from "../../redux/reducers";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { settInfofaktum } from "../../../nav-soknad/redux/soknad/soknadActions";
import { getIntlTextOrKey } from "../../../nav-soknad/utils/intlUtils";
import { Link } from "react-router-dom";
import SamtykkeInfoModal from "./samtykkeInfoModal";

interface StateProps {
	oppsummering: Oppsummering;
	bekreftet: boolean;
	visBekreftMangler: boolean;
	restStatus: REST_STATUS;
	brukerbehandlingId: number;
}

type Props = FaktumComponentProps &
	DispatchProps &
	StateProps &
	InjectedIntlProps;

class OppsummeringView extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.getOppsummering = this.getOppsummering.bind(this);
	}

	componentDidMount() {
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
		const { oppsummering, brukerbehandlingId, intl } = this.props;

		const bolker = oppsummering
			? this.props.oppsummering.bolker.map((bolk, idx) => (
					<div className="blokk-xs bolk" key={idx}>
						<EkspanderbartPanel tittel={bolk.tittel} apen={false}>
							<div>
								<div className="bolk__rediger">
									<Link
										className="lenke"
										to={`/skjema/${brukerbehandlingId}/${idx + 1}`}
									>
										{getIntlTextOrKey(
											this.props.intl,
											"oppsummering.gatilbake"
										)}
									</Link>
								</div>
								<div dangerouslySetInnerHTML={{ __html: bolk.html }} />
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
		// const bekreftOpplysninger = this.bekreftOpplysninger(bekreftOpplysningTekst);

		let classNames = "ekspanderbartPanel skjema-oppsummering__bekreft";
		if (this.props.visBekreftMangler) {
			classNames += " skjema-oppsummering__bekreft___feil";
		}
		return (
			<LoadContainer restStatus={this.props.restStatus}>
				<DigisosSkjemaSteg steg={DigisosSteg.oppsummering}>
					{skjemaOppsummering}
					<div className="blokk-xs bolk">
						<div className={classNames}>
							<p style={{marginTop: "0"}}>
								<FormattedMessage id="soknadsosialhjelp.oppsummering.bekreftOpplysninger"/>
								&nbsp;
								<a
									className="lenke"
									onClick={(event: React.MouseEvent<HTMLElement>) => {
										this.props.dispatch(setVisBekreftInfo(true));
										event.preventDefault();
									}
								}>
									<FormattedMessage id="soknadsosialhjelp.oppsummering.infoSamtykke"/>
								</a>.
							</p>

							<Checkbox
								label={bekreftOpplysninger}
								checked={this.props.bekreftet}
								feil={
									this.props.visBekreftMangler
										? {
											feilmelding: intl.formatHTMLMessage({
												id: "oppsummering.feilmelding.bekreftmangler"
											})
										}
										: null
								}
								onChange={() => this.props.dispatch(bekreftOppsummering())}
							/>
						</div>
					</div>
					<SamtykkeInfoModal/>
				</DigisosSkjemaSteg>
			</LoadContainer>
		);
	}

}

export default connect((state: State, props: any) => {
	return {
		oppsummering: state.oppsummering.oppsummering,
		bekreftet: state.oppsummering.bekreftet,
		visBekreftMangler: state.oppsummering.visBekreftMangler,
		restStatus: state.oppsummering.restStatus,
		brukerbehandlingId: state.soknad.data.brukerBehandlingId
	};
})(injectIntl(OppsummeringView));
