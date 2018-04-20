import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl, FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { State } from "../../redux/reducers";
import * as React from "react";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { SynligeFaktaProps } from "../../redux/synligefakta/synligeFaktaTypes";
import BannerEttersendelse from "./bannerEttersendelse";
import { FeatureToggles } from "../../../featureToggles";
import {
	lagEttersendelse, lesEttersendelser,
	sendEttersendelse
} from "../../../nav-soknad/redux/ettersendelse/ettersendelseActions";
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
	originalSoknad: any;
	ettersendelser: any;
}

type Props = OwnProps & SynligeFaktaProps & DispatchProps & InjectedIntlProps;

interface OwnState {
	vedleggEkspandert: boolean;
	advarselManglerVedlegg: boolean;
}

class Ettersendelse extends React.Component<Props, OwnState> {

	leggTilGenereltVedleggKnapp: HTMLInputElement;

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
		this.props.dispatch(lesEttersendelser(brukerbehandlingskjedeId));
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

	handleFileUpload(files: FileList) {
		if (files.length !== 1) {
			return;
		}
		const formData = new FormData();
		formData.append("file", files[ 0 ], files[ 0 ].name);
		console.warn("Last opp generelt vedlegg ikke implementert.");
		// this.setState({filnavn: files[ 0 ].name});
		// const vedleggId = this.props.vedlegg.vedleggId;
		// this.props.dispatch(lastOppEttersendelseVedlegg(vedleggId, formData));
	}

	handleEttersendelseSendt() {
		let brukerbehandlingskjedeId = this.props.brukerbehandlingskjedeId;
		if (!brukerbehandlingskjedeId) {
			// Under utvikling er ikke brukerbehandlingId på redux state, så vi leser den fra url:
			const match = window.location.pathname.match(/\/skjema\/(.*)\/ettersendelse/);
			if (match) {
				brukerbehandlingskjedeId = match[ 1 ];
			}
		}
		this.props.dispatch(lagEttersendelse(brukerbehandlingskjedeId));
		this.props.dispatch(lesEttersendelser(brukerbehandlingskjedeId));
	}

	render() {
		const { originalSoknad, ettersendelser, restStatus, visEttersendelse} = this.props;
		const visEttersendeFeatureToggle = visEttersendelse && (visEttersendelse === true);
		let expanded: boolean = this.state.vedleggEkspandert;
		const sendVedleggOk = restStatus === REST_STATUS.OK;
		if ( sendVedleggOk && expanded ) {
			expanded = false;
		}

		let antallManglendeVedlegg: number = 0;
		let datoManglendeVedlegg: string = "";
		if ( originalSoknad ) {
			antallManglendeVedlegg = originalSoknad.ikkeInnsendteVedlegg.length;
		}
		if ( ettersendelser && ettersendelser.length > 0) {
			antallManglendeVedlegg = ettersendelser[ ettersendelser.length - 1 ].ikkeInnsendteVedlegg.length;
			datoManglendeVedlegg = ettersendelser[ ettersendelser.length - 1 ].innsendtDato;
		}

		console.warn(" ===> antallManglendeVedlegg: " + antallManglendeVedlegg);

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

						{originalSoknad && (
							<AvsnittMedMarger
								venstreIkon={MargIkoner.OK}
								hoyreIkon={MargIkoner.PRINTER}
								onClickHoyreIkon={() => this.skrivUt()}
							>
								<h3><FormattedHTMLMessage id="ettersendelse.soknad_sendt"/> {originalSoknad.navenhet}</h3>
								<p>Innsendt {originalSoknad.innsendtDato} kl. {originalSoknad.innsendtTidspunkt}</p>
							</AvsnittMedMarger>
						)}

						{ettersendelser && ettersendelser.length > 0 && ettersendelser.map((ettersendelse: any) => {
								return (
									<AvsnittMedMarger
										venstreIkon={MargIkoner.OK}
										key={ettersendelse.behandlingsId}
									>
										<h3>{ettersendelse.innsendteVedlegg.length} vedlegg er sendt til NAV</h3>
										<p>Ettersendt {originalSoknad.innsendtDato} kl. {originalSoknad.innsendtTidspunkt}</p>
									</AvsnittMedMarger>
								);
							}
						)}

						{antallManglendeVedlegg > 0 && (
							<EttersendelseEkspanderbart
								onVedleggSendt={() => this.handleEttersendelseSendt()}
							>
								<h3>{antallManglendeVedlegg} vedlegg mangler</h3>
								<div>{datoManglendeVedlegg}</div>
							</EttersendelseEkspanderbart>
						)}

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
		originalSoknad: state.ettersendelse.innsendte.originalSoknad,
		ettersendelser: state.ettersendelse.innsendte.ettersendelser,
		restStatus: state.ettersendelse.restStatus
	};
})(injectIntl(Ettersendelse));
