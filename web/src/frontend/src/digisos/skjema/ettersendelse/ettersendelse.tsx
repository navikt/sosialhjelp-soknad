import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { State } from "../../redux/reducers";
import * as React from "react";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { SynligeFaktaProps } from "../../redux/synligefakta/synligeFaktaTypes";
import { Faktum } from "../../../nav-soknad/types";
import Icon from "nav-frontend-ikoner-assets";
import SVG from "react-inlinesvg";

interface OwnProps {
	fakta: Faktum[];
}

type Props = OwnProps & SynligeFaktaProps & DispatchProps & InjectedIntlProps;

/*
TODO: Legg inn banneret som svg i stedet for png.
<SVG
	className="banner__forside-illustrasjon"
	src="/soknadsosialhjelp/statisk/bilder/william.svg"
/>
 */
class Ettersendelse extends React.Component<Props, {}> {
	render() {
		return <div className="ettersendelse maincontent">
			<div className="banner banner__forside">
				<div className="blokk-center">
					<div className="banner__forside-wrapper">
						<div className="banner__tittel-tekst">
							<h1 className="typo-sidetittel">
								<span>Søknad om økonomisk sosialhjelp</span>
							</h1>
						</div>
						<img
							className="banner__william-illustrasjon"
							src="/soknadsosialhjelp/statisk/bilder/william_laptop.png" />
					</div>
				</div>
			</div>

			<div className="blokk-center">
				<p className="ettersendelse ingress">
					Du må gi beskjed hvis den økonomiske situasjonen din endrer seg etter at du har sendt søknaden.
				</p>

				{/* ---- start --- */}
				<div className="avsnitt_med_marger">
					<div className="venstemarg">
						<Icon kind="stegindikator__hake" className="ettersendelse__ikon" />
					</div>
					<div className="avsnitt">
						<h3>Søknaden er sendt til Horten kommune</h3>
						<p>07.02.2018</p>
					</div>

					<div className="hoyremarg">
						<span style={{display: "block"}}>
							<SVG
								className="ettersendelse__ikon"
								src="/soknadsosialhjelp/statisk/bilder/iconUpload.svg"
							/>
						</span>
					</div>
				</div>
				{/* ---- slutt --- */}

				{/* ---- start --- */}
				<div className="avsnitt_med_marger">
					<div className="venstemarg">
						<SVG
							className="ettersendelse__ikon"
							src="/soknadsosialhjelp/statisk/bilder/advarsel-sirkel.svg"
						/>
					</div>
					<div className="avsnitt">
						<h3>3 vedlegg mangler</h3>
					</div>

					<div className="hoyremarg">
						<span style={{display: "block"}}>
							<span className="chevron__nedover"/>
						</span>
					</div>
				</div>
				{/* ---- slutt --- */}

				<br/>
				<br/>
				<div>
					<div className="" style={{float: "left", width: "88px", display: "block"}}>
						<SVG
							className="ettersendelse__ikon"
							src="/soknadsosialhjelp/statisk/bilder/snakkebobler.svg"
						/>
					</div>
					<b style={{display: "block", paddingTop: "12px"}}>Du blir innkalt til en samtale</b>
					<br/>
					<br/>
					<p>
						Hvis du søker om økonomisk sosialhjelp, blir du vanligvis innkalt til en
						samtale med en veileder. Du kan også kontakte NAV-kontoret ditt og avtale et møte.
						Les mer om hvordan et møte foregår.
					</p>
					<SVG
						className="ettersendelse__ikon"
						src="/soknadsosialhjelp/statisk/bilder/trashcan.svg"
					/>

					<SVG
						className="ettersendelse__ikon"
						src="/soknadsosialhjelp/statisk/bilder/iconUpload.svg"
					/>
					<p>
						Saksbehandlingstiden varierer fra kommune til kommune.
						Når vi har behandlet søknaden din, får du et vedtak. Hvis det går mer enn én måned,
						skal du få et foreløpig svar. Hvis vi mangler opplysninger eller du ikke har levert
						all nødvendig dokumentasjon, kan det ta lengre tid før du får svar på søknaden din.
					</p>
				</div>

			</div>
		</div>
	;
	}
}

export default connect((state: State) => {
	return {
		fakta: state.fakta.data,
		synligefakta: state.synligefakta
	};
})(injectIntl(Ettersendelse));
