import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl, FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { State } from "../../redux/reducers";
import * as React from "react";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { SynligeFaktaProps } from "../../redux/synligefakta/synligeFaktaTypes";
import { Faktum } from "../../../nav-soknad/types";
import Icon from "nav-frontend-ikoner-assets";
import NavFrontendChevron from "nav-frontend-chevron";
import { Collapse } from "react-collapse";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import Knapp from "nav-frontend-knapper";
import BannerEttersendelse from "./bannerEttersendelse";
import { FeatureToggles } from "../../../featureToggles";
import EttersendelseVedlegg from "./ettersendelseVedlegg";
import { lagEttersendelse, sendEttersendelse } from "../../../nav-soknad/redux/ettersendelse/ettersendelseActions";
import { REST_STATUS } from "../../../nav-soknad/types/restTypes";
import EttersendelseBunntekst from "./ettersendelseBunntekst";

interface OwnProps {
	fakta: Faktum[];
	visEttersendelse: boolean;
	manglendeVedlegg: any[];
	brukerbehandlingskjedeId: string;
	brukerbehandlingId: string;
	restStatus: REST_STATUS;
	opplastingStatus: REST_STATUS;
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

						<div className="avsnitt_med_marger">
							<div className="venstremarg">
								<Icon kind="stegindikator__hake" className="ettersendelse__ikon"/>
							</div>
							<div className="avsnitt">
								<h3><FormattedHTMLMessage id="ettersendelse.soknad_sendt"/> Horten kommune</h3>
								<p>07.02.2018</p>
							</div>

							<div
								className="hoyremarg hoyremarg__ikon hoyremarg__ikon__hover"
								onClick={() => this.skrivUt()}
							>
								<DigisosIkon navn="printer" className="ettersendelse__ikon"/>
							</div>
						</div>

						<div className={"avsnitt_med_marger " + (sendVedleggOk ? " " : "vedlegg_mangler_avsnitt ")
						+ (this.state.vedleggEkspandert ? "" : "vedlegg_mangler_avsnitt__kollaps")}>
							<div className="venstremarg">
								{!sendVedleggOk && (<DigisosIkon navn="advarselSirkel" className="ettersendelse__ikon"/>)}
								{sendVedleggOk && (<Icon kind="stegindikator__hake" className="ettersendelse__ikon"/>)}
							</div>
							<div className="avsnitt">
								{sendVedleggOk && (<h3>{this.antallOpplastedeFiler()} vedlegg er sendt</h3>)}
								{!sendVedleggOk && (<h3 onClick={() => this.toggleVedlegg()} style={{ cursor: "pointer" }}>3 vedlegg
									mangler</h3>)}
								<div>09.04.2018</div>
							</div>
							{!sendVedleggOk && (
							<div
								className="hoyremarg hoyremarg__ikon"
								onClick={() => this.toggleVedlegg()}
							>
								<NavFrontendChevron
									className="ettersendelse__chevron"
									type={this.state.vedleggEkspandert ? "opp" : "ned"}
								/>
							</div>
							)}
							{sendVedleggOk && (<div className="hoyremarg" />)}
						</div>

						<Collapse
							isOpened={expanded}
							className={"ettersendelse__vedlegg " +
							(this.state.vedleggEkspandert ? "ettersendelse__vedlegg__ekspandert " : " ")}
						>
							<div className="avsnitt_med_marger">
								<div className="venstremarg"/>
								<div className="avsnitt">
									<p>
										<FormattedHTMLMessage id="ettersendelse.mangler_info"/>r
									</p>
								</div>
								<div className="hoyremarg"/>
							</div>

							<div
								className={"ettersendelse__vedlegg__innhold " +
								(this.state.advarselManglerVedlegg ? "ettersendelse__vedlegg__feil " : "")}
							>
								{this.props.manglendeVedlegg && this.props.manglendeVedlegg.map((vedlegg) => {
									const tittelKey = `vedlegg.${vedlegg.skjemaNummer}.${vedlegg.skjemanummerTillegg}.tittel`;
									const infoKey   = `vedlegg.${vedlegg.skjemaNummer}.${vedlegg.skjemanummerTillegg}.info`;
									let info;
									if (!!this.props.intl.messages[ infoKey ]) {
										info = this.props.intl.formatMessage({ id: infoKey });
									}
									return (
										<EttersendelseVedlegg
											dispatch={this.props.dispatch}
											vedlegg={vedlegg}
											key={vedlegg.vedleggId}
											restStatus={this.props.opplastingStatus}
										>
											<h3>
												<FormattedMessage id={tittelKey}/>
											</h3>
											{info && (<p>{info}</p>)}
										</EttersendelseVedlegg>
									);
								})}

								{this.state.advarselManglerVedlegg && (
									<div className="avsnitt_med_marger">
										<div className="venstremarg"/>
										<div className="skjema__feilmelding">
											<FormattedHTMLMessage id="ettersendelse.feilmelding.ingen_vedlegg"/>
										</div>
										<div className="hoyremarg"/>
									</div>
								)}

								<div className="avsnitt_med_marger">
									<div className="venstremarg"/>
									<div className="avsnitt avsnitt_knapp">
										<Knapp
											spinner={this.props.restStatus === REST_STATUS.PENDING}
											disabled={this.props.restStatus === REST_STATUS.PENDING}
											type="hoved"
											htmlType="submit"
											onClick={() => this.sendEttersendelse()}
										>
											<FormattedMessage id="ettersendelse.knapp.tittel"/>
										</Knapp>
									</div>
									<div className="hoyremarg"/>
								</div>
							</div>
						</Collapse>

						<EttersendelseBunntekst/>

					</div>
				)}
			</div>
		);
	}
}

export default connect((state: State, {}) => {
	return {
		fakta: state.fakta.data,
		synligefakta: state.synligefakta,
		brukerbehandlingskjedeId: state.soknad.data.brukerBehandlingId,
		visEttersendelse: state.featuretoggles.data[ FeatureToggles.ettersendvedlegg ] === "true",
		manglendeVedlegg: state.ettersendelse.data,
		brukerbehandlingId: state.ettersendelse.brukerbehandlingId,
		opplastingStatus: state.ettersendelse.opplastingStatus,
		restStatus: state.ettersendelse.restStatus
	};
})(injectIntl(Ettersendelse));
