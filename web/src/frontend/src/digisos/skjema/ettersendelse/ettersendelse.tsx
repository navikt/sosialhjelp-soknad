import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl, FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { State } from "../../redux/reducers";
import * as React from "react";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { SynligeFaktaProps } from "../../redux/synligefakta/synligeFaktaTypes";
import BannerEttersendelse from "./bannerEttersendelse";
import { FeatureToggles } from "../../../featureToggles";
import {
	lesEttersendelser, opprettEttersendelse,
	sendEttersendelse
} from "../../../nav-soknad/redux/ettersendelse/ettersendelseActions";
import { REST_STATUS } from "../../../nav-soknad/types/restTypes";
import AvsnittMedMarger from "./avsnittMedMarger";
import EttersendelseEkspanderbart from "./ettersendelseEkspanderbart";
import { MargIkoner } from "./margIkoner";
import { getNavEnhetMedOrgnr, NavEnhet } from "../../data/kommuner";
import { lesKommuner } from "../../../nav-soknad/redux/kommuner/kommuneActions";

interface OwnProps {
	visEttersendelse: boolean;
	manglendeVedlegg: any[];
	brukerbehandlingskjedeId: string;
	brukerbehandlingId: string;
	restStatus: REST_STATUS;
	originalSoknad: any;
	ettersendelser: any;
	navEnheter: NavEnhet[];
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
		const brukerbehandlingskjedeId = this.lesBrukerbehandlingskjedeId();
		this.props.dispatch(opprettEttersendelse(brukerbehandlingskjedeId));
		this.props.dispatch(lesEttersendelser(brukerbehandlingskjedeId));
		this.props.dispatch(lesKommuner());
	}

	lesBrukerbehandlingskjedeId() {
		let brukerbehandlingskjedeId = this.props.brukerbehandlingskjedeId;
		if (!brukerbehandlingskjedeId) {
			const match = window.location.pathname.match(/\/skjema\/(.*)\/ettersendelse/);
			if (match) {
				brukerbehandlingskjedeId = match[ 1 ];
			}
		}
		return brukerbehandlingskjedeId;
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

	onEttersendelseSendt() {
		const brukerbehandlingskjedeId = this.lesBrukerbehandlingskjedeId();
		this.props.dispatch(opprettEttersendelse(brukerbehandlingskjedeId));
		this.props.dispatch(lesEttersendelser(brukerbehandlingskjedeId));
	}

	manglendeVedleggDato() {
		const { originalSoknad, ettersendelser } = this.props;
		let datoManglendeVedlegg: string = "";
		if ( originalSoknad ) {
			datoManglendeVedlegg = originalSoknad.innsendtDato;
		}
		if ( ettersendelser && ettersendelser.length > 0) {
			datoManglendeVedlegg = ettersendelser[ ettersendelser.length - 1 ].innsendtDato;
		}
		return datoManglendeVedlegg;
	}

	antallManglendeVedlegg() {
		return this.props.manglendeVedlegg.filter((item: any) => {
			return !(item.skjemaNummer === "annet" && item.skjemanummerTillegg === "annet");
		}).length;
	}

	isEttersendelseAktivert() {
		if (this.props.originalSoknad != null && this.props.originalSoknad.orgnummer != null) {
			const navEnhet = getNavEnhetMedOrgnr(this.props.navEnheter, this.props.originalSoknad.orgnummer);
			if (navEnhet != null && navEnhet.features.ettersendelse) {
				return true;
			}
		}
		return false;
	}

	render() {
		const { originalSoknad, ettersendelser, visEttersendelse } = this.props;
		const visEttersendeFeatureToggle = visEttersendelse && (visEttersendelse === true);
		const antallManglendeVedlegg = this.antallManglendeVedlegg();
		const datoManglendeVedlegg = this.manglendeVedleggDato();
		const ettersendelseAktivert = this.isEttersendelseAktivert();

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
					<div className="blokk-center panel ettersendelse__panel">
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
										<h3>
											{ettersendelse.innsendteVedlegg.length} &nbsp;
											<FormattedHTMLMessage id="ettersendelse.vedlegg_sendt"/></h3>
										<p>
											<FormattedHTMLMessage
												id="ettersendelse.dato_tid"
												values={
													{
														dato: ettersendelse.innsendtDato,
														tid: ettersendelse.innsendtTidspunkt
													}}
											/>
										</p>
									</AvsnittMedMarger>
								);
							}
						)}

						<EttersendelseEkspanderbart
							kunGenerellDokumentasjon={antallManglendeVedlegg === 0}
							ettersendelseAktivert={ettersendelseAktivert}
							onEttersendelse={() => this.onEttersendelseSendt()}
						>
							{antallManglendeVedlegg > 0 && (
								<span>
									<h3>{antallManglendeVedlegg} vedlegg mangler</h3>
									<div>{datoManglendeVedlegg}</div>
								</span>
							)}
							{antallManglendeVedlegg === 0 && (
								<h3>Last opp generell dokumentasjon</h3>
							)}
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
		originalSoknad: state.ettersendelse.innsendte.originalSoknad,
		ettersendelser: state.ettersendelse.innsendte.ettersendelser,
		restStatus: state.ettersendelse.restStatus,
		navEnheter: state.kommuner.data
	};
})(injectIntl(Ettersendelse));
