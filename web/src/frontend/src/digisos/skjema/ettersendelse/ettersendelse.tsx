import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { State } from "../../redux/reducers";
import * as React from "react";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { SynligeFaktaProps } from "../../redux/synligefakta/synligeFaktaTypes";
import { Faktum } from "../../../nav-soknad/types";
import Icon from "nav-frontend-ikoner-assets";
import SVG from "react-inlinesvg";
import NavFrontendChevron from "nav-frontend-chevron";
import { Collapse } from "react-collapse";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import Knapp from "nav-frontend-knapper";
import BannerEttersendelse from "./bannerEttersendelse";
import { FeatureToggles } from "../../../featureToggles";
import EttersendelseVedlegg from "./ettersendelseVedlegg";
import { lagEttersendelse, sendEttersendelse } from "../../../nav-soknad/redux/ettersendelse/ettersendelseActions";

interface OwnProps {
	fakta: Faktum[];
	visEttersendelse: boolean;
	manglendeVedlegg: any[];
	brukerbehandlingskjedeId: string;
	brukerbehandlingId: string;
}

type Props = OwnProps & SynligeFaktaProps & DispatchProps & InjectedIntlProps;

interface OwnState {
	vedleggEkspandert: boolean;
}

class Ettersendelse extends React.Component<Props, OwnState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			vedleggEkspandert: false
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
		this.props.dispatch(sendEttersendelse(this.props.brukerbehandlingId));
	}

	render() {
		const visEttersendeFeatureToggle = this.props.visEttersendelse && (this.props.visEttersendelse === true);
		return (
			<div className="ettersendelse">

				<BannerEttersendelse>
					<span>Søknad om økonomisk sosialhjelp</span>
				</BannerEttersendelse>

				{!visEttersendeFeatureToggle && (
					<div className="blokk-center">
						<p className="ettersendelse ingress">
							Ettersendelse av vedlegg er ikke tilgjengelig
						</p>
					</div>
				)}

				{visEttersendeFeatureToggle && (
					<div className="blokk-center">
						<p className="ettersendelse ingress">
							Du må gi beskjed hvis den økonomiske situasjonen din endrer seg etter at du har sendt
							søknaden.
						</p>

						<div className="avsnitt_med_marger">
							<div className="venstremarg">
								<Icon kind="stegindikator__hake" className="ettersendelse__ikon"/>
							</div>
							<div className="avsnitt">
								<h3>Søknaden er sendt til Horten kommune</h3>
								<p>07.02.2018</p>
							</div>

							<div className="hoyremarg hoyremarg__ikon hoyremarg__ikon__hover">
								<DigisosIkon navn="printer" className="ettersendelse__ikon"/>
							</div>
						</div>

						<div className="avsnitt_med_marger vedlegg_mangler_avsnitt">
							<div className="venstremarg">
								<DigisosIkon navn="advarselSirkel" className="ettersendelse__ikon"/>
							</div>
							<div className="avsnitt">
								<h3 onClick={() => this.toggleVedlegg()} style={{ cursor: "pointer" }}>3 vedlegg
									mangler</h3>
							</div>
							<div
								className="hoyremarg hoyremarg__ikon"
								onClick={() => this.toggleVedlegg()}
							>
								<NavFrontendChevron
									className="ettersendelse__chevron"
									type={this.state.vedleggEkspandert ? "opp" : "ned"}
								/>
							</div>
						</div>

						<Collapse
							isOpened={this.state.vedleggEkspandert}
							className={"ettersendelse__vedlegg " +
							(this.state.vedleggEkspandert ? "ettersendelse__vedlegg__ekspandert" : "")}
						>
							{this.props.manglendeVedlegg && this.props.manglendeVedlegg.map((vedlegg) => {
								return (
									<EttersendelseVedlegg
										dispatch={this.props.dispatch}
										vedlegg={vedlegg}
										key={vedlegg.vedleggId}
									>
										<h3>{vedlegg.skjemaNummer}</h3>
									</EttersendelseVedlegg>
								);
							})}

							<div className="avsnitt_med_marger">
								<div className="venstremarg"/>
								<div className="avsnitt avsnitt__sentrert">
									<Knapp
										type="hoved"
										htmlType="submit"
										onClick={() => this.sendEttersendelse()}
									>
										Send vedlegg
									</Knapp>
								</div>
								<div className="hoyremarg"/>
							</div>
						</Collapse>

						<div className="avsnitt_med_marger">
							<div className="venstremarg">
								<DigisosIkon navn="snakkebobler" className="ettersendelse__ikon"/>
							</div>
							<div className="avsnitt">
								<h3>Du blir innkalt til en samtale</h3>
								<p>
									Hvis du søker om økonomisk sosialhjelp, blir du vanligvis innkalt til en
									samtale med en veileder. Du kan også kontakte NAV-kontoret ditt og avtale et møte.
									Les mer om hvordan et møte foregår.
								</p>
							</div>
							<div className="hoyremarg"/>
						</div>

						<div className="avsnitt_med_marger">
							<div className="venstremarg">
								<SVG
									className="ettersendelse__ikon"
									src={"/soknadsosialhjelp/statisk/bilder/ikon_konvolutt.svg"}
								/>
							</div>
							<div className="avsnitt">
								<h3>Du får beskjed om vedtak</h3>
								<p>
									Saksbehandlingstiden varierer fra kommune til kommune.
									Når vi har behandlet søknaden din, får du et vedtak. Hvis det går mer enn én måned,
									skal du få et foreløpig svar. Hvis vi mangler opplysninger eller du ikke har levert
									all nødvendig dokumentasjon, kan det ta lengre tid før du får svar på søknaden din.
								</p>
							</div>
							<div className="hoyremarg"/>
						</div>

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
		brukerbehandlingId: state.ettersendelse.brukerbehandlingId
	};
})(injectIntl(Ettersendelse));
