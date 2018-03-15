import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
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

		const bekreftOpplysningTekst: string = intl.formatMessage({
			id: "soknadsosialhjelp.oppsummering.bekreftOpplysninger"
		});
		const bekreftOpplysninger = this.bekreftOpplysninger(bekreftOpplysningTekst);

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
							<Checkbox
								id="bekreft_oppsummering_checkbox"
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

	/* Legg på lenke i tekst fra stash som ser slik ut "Tekst [lenketekst] mer tekst" */
	private bekreftOpplysninger(bekreftOpplysningTekst: string) {
		const bekreftOpplysningTekster = bekreftOpplysningTekst.split(/[\[\]]/);
		let bekreftOpplysninger = <span/>;
		if (bekreftOpplysningTekster.length > 2) {
			bekreftOpplysninger = (
				<span>
					{bekreftOpplysningTekster[ 0 ]}
					<a
						id="vis_samtykke_info_link"
						className="lenke"
						onClick={(event: React.MouseEvent<HTMLElement>) => {
								this.props.dispatch(setVisBekreftInfo(true));
								event.preventDefault();
							}
						}>
					{bekreftOpplysningTekster[ 1 ]}
					</a>
					{bekreftOpplysningTekster.slice(2, bekreftOpplysningTekster.length).join("|")}
				</span>);
		}
		return bekreftOpplysninger;
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
