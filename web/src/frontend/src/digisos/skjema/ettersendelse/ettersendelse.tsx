import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl, FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { State } from "../../redux/reducers";
import * as React from "react";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { SynligeFaktaProps } from "../../redux/synligefakta/synligeFaktaTypes";
import BannerEttersendelse from "./bannerEttersendelse";
import { FeatureToggles } from "../../../featureToggles";
import { lagEttersendelse, sendEttersendelse } from "../../../nav-soknad/redux/ettersendelse/ettersendelseActions";
import { REST_STATUS } from "../../../nav-soknad/types/restTypes";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseEkspanderbart from "./ettersendelseEkspanderbart";
import { MargIkoner } from "./margIkoner";

interface OwnProps {
	visEttersendelse: boolean;
	manglendeVedlegg: any[];
	brukerbehandlingskjedeId: string;
	brukerbehandlingId: string;
	restStatus: REST_STATUS;
}

type Props = OwnProps & SynligeFaktaProps & DispatchProps & InjectedIntlProps;

interface OwnState {
	vedleggEkspandert: boolean;
	advarselManglerVedlegg: boolean;
}

class Ettersendelse extends React.Component<Props, OwnState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			vedleggEkspandert: false,
			advarselManglerVedlegg: false
		};
	}

	componentDidMount() {
		let brukerbehandlingskjedeId = this.props.brukerbehandlingskjedeId;
		if (!brukerbehandlingskjedeId) {
			// Under utvikling er ikke brukerbehandlingId på redux state, så vi leser den fra url:
			const match = window.location.pathname.match(/\/skjema\/(.*)\/ettersendelse/);
			if (match) {
				brukerbehandlingskjedeId = match[ 1 ];
			}
		}
		this.props.dispatch(lagEttersendelse(brukerbehandlingskjedeId));
		// Hent ut søknad så vi får kommune søknaden er sendt til og tidspunkter
		// this.props.dispatch(hentSoknad(brukerbehandlingskjedeId));
	}

	toggleVedlegg() {
		this.setState({ vedleggEkspandert: !this.state.vedleggEkspandert });
	}

	sendEttersendelse() {
		const antallOpplastedeFiler = this.antallOpplastedeFiler();
		this.setState({ advarselManglerVedlegg: (antallOpplastedeFiler === 0) });
		if (antallOpplastedeFiler > 0) {
			this.props.dispatch(sendEttersendelse(this.props.brukerbehandlingId));
		}
	}

	antallOpplastedeFiler() {
		return this.props.manglendeVedlegg
			.map((vedlegg: any) => vedlegg.filer.length)
			.reduce((a: number, b: number) => a + b);
	}

	skrivUt() {
		window.print();
	}

	render() {
		const visEttersendeFeatureToggle = this.props.visEttersendelse && (this.props.visEttersendelse === true);
		let expanded: boolean = this.state.vedleggEkspandert;
		const sendVedleggOk = this.props.restStatus === REST_STATUS.OK;
		if ( sendVedleggOk && expanded ) {
			expanded = false;
		}
		return (
			<div className="ettersendelse">

				<BannerEttersendelse>
					<FormattedMessage id="applikasjon.sidetittel"/>
				</BannerEttersendelse>

				{!visEttersendeFeatureToggle && (
					<div className="blokk-center">
						<p className="ettersendelse ingress">
							<FormattedHTMLMessage id="ettersendelse.ikke_tilgjengelig"/>
						</p>
					</div>
				)}

				{visEttersendeFeatureToggle && (
					<div className="blokk-center">
						<p className="ettersendelse ingress">
							<FormattedHTMLMessage id="ettersendelse.ingress"/>
						</p>

						<AvsnittMedMarger
							venstreIkon={MargIkoner.OK}
							hoyreIkon={MargIkoner.PRINTER}
							onClickHoyreIkon={() => this.skrivUt()}
						>
							<h3><FormattedHTMLMessage id="ettersendelse.soknad_sendt"/> Horten kommune</h3>
							<p>Sendt 07.02.2018</p>
						</AvsnittMedMarger>

						<EttersendelseEkspanderbart
							onVedleggSendt={() => console.warn("Ettersendelse er sendt inn!")}
						>
							<h3>4 vedlegg mangler</h3>
							<div>09.04.2018</div>
						</EttersendelseEkspanderbart>

						<AvsnittMedMarger venstreIkon={MargIkoner.SNAKKEBOBLER}>
							<h3><FormattedHTMLMessage id="ettersendelse.samtale.tittel" /></h3>
							<p><FormattedHTMLMessage id="ettersendelse.samtale.info" /></p>
						</AvsnittMedMarger>

						<AvsnittMedMarger venstreIkon={MargIkoner.KONVOLUTT}>
							<h3><FormattedHTMLMessage id="ettersendelse.vedtak.tittel" /></h3>
							<p><FormattedHTMLMessage id="ettersendelse.vedtak.info" /></p>
						</AvsnittMedMarger>

					</div>
				)}
			</div>
		);
	}
}

export default connect((state: State, {}) => {
	return {
		brukerbehandlingskjedeId: state.soknad.data.brukerBehandlingId,
		visEttersendelse: state.featuretoggles.data[ FeatureToggles.ettersendvedlegg ] === "true",
		manglendeVedlegg: state.ettersendelse.data,
		brukerbehandlingId: state.ettersendelse.brukerbehandlingId,
		restStatus: state.ettersendelse.restStatus
	};
})(injectIntl(Ettersendelse));
