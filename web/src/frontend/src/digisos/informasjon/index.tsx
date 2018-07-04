import * as React from "react";
import { connect } from "react-redux";
import { RouterProps } from "react-router";
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl, } from "react-intl";
import DocumentTitle from "react-document-title";
import { State } from "../redux/reducers";
import { Element } from "nav-frontend-typografi";
import Knapp from "nav-frontend-knapper";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { FeatureToggles } from "../../featureToggles";
import IkkeTilgang from "./IkkeTilgang";
import { TilgangSperrekode } from "../../nav-soknad/redux/tilgang/tilgangTypes";
import { skjulToppMeny } from "../../nav-soknad/utils/domUtils";
import Ella from "../../nav-soknad/components/svg/Ella";
import Snakkeboble from "../../nav-soknad/components/snakkeboble/Snakkeboble";
import Personopplysninger from "./Personopplysninger";
import { fetchToJson } from "../../nav-soknad/utils/rest-utils";
import { loggFeil } from "../../nav-soknad/redux/navlogger/navloggerActions";
import { Panel } from "nav-frontend-paneler";
import Banner from "../../nav-soknad/components/banner/Banner";
import { opprettSoknad } from "../../nav-soknad/redux/soknad/soknadActions";

interface StateProps {
	harTilgang: boolean;
	sperrekode: TilgangSperrekode;
	soknadErLive: string;
	startSoknadPending: boolean;
	visVelgBosted: boolean;
}

type Props = StateProps & InjectedIntlProps & RouterProps & DispatchProps;

class Informasjon extends React.Component<Props, {fornavn: string}> {

	constructor(props: Props) {
		super(props);
		this.state = {
			fornavn: ""
		};
	}

	componentDidMount() {
		skjulToppMeny();
		fetchToJson("informasjon/personalia").then((result: any) => {
			const FORNAVN = "fornavn";
			this.setState({fornavn: result[FORNAVN]});
		}).catch((e: any) => {
			loggFeil("Feil ved uthenting av personalia: " + e.toString());
		});
	}

	renderHilsen(): React.ReactNode {
		if (this.state.fornavn && this.state.fornavn.length > 0) {
			return (
				<h3>
					<FormattedHTMLMessage id="informasjon.hilsen.hei" values={{fornavn: this.state.fornavn}}/>
				</h3>);
		}
		return null;
	}
	startSoknad() {
		this.props.dispatch(opprettSoknad(this.props.intl));
	}

	render() {
		const {
			intl,
			harTilgang,
			startSoknadPending,
			soknadErLive,
			sperrekode
		} = this.props;
		const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");

		return (
			<div className="ettersendelse informasjon-side">
				<Banner>
					<FormattedMessage id="skjema.tittel" />
				</Banner>
				<DocumentTitle title={title}/>
				{soknadErLive === "true" && harTilgang ? (
					<span>
						<div>
							<div className="skjema-content informasjon-innhold">
								<span className="informasjon-fra-ella">
									<Snakkeboble>
										{this.renderHilsen()}
										<FormattedMessage id="informasjon.hilsen.tittel"/>
									</Snakkeboble>
									<Ella />
								</span>

								<Panel className="informasjon-viktig">
									<Element>
										<FormattedMessage id="informasjon.start.undertittel"/>
									</Element>

									<p className="blokk-s">
										<FormattedHTMLMessage id="informasjon.start.tekst"/>
									</p>

									<Element>
										<FormattedMessage id="informasjon.nodsituasjon.undertittel"/>
									</Element>
									<p className="blokk-s">
										<FormattedHTMLMessage id="informasjon.nodsituasjon.tekst"/>
									</p>
								</Panel>
							</div>
						</div>

						<div className="zebra-stripe graa">
							<div className="skjema-content">
								<Personopplysninger/>
							</div>

							<div className="skjema-content">
								<span className="informasjon-start-knapp">
									<Knapp
										id="start_soknad_button"
										type="hoved"
										spinner={startSoknadPending}
										disabled={startSoknadPending}
										onClick={() => this.startSoknad()}
									>
										{getIntlTextOrKey(intl, "skjema.knapper.start")}
									</Knapp>
								</span>
							</div>
						</div>
					</span>
				) : (
					<div className="skjema-content">
						<IkkeTilgang sperrekode={sperrekode}/>
					</div>
				)}
			</div>
		);
	}

}

export default connect((state: State) => ({
	harTilgang: state.tilgang.harTilgang,
	sperrekode: state.tilgang.sperrekode,
	soknadErLive: state.featuretoggles.data[FeatureToggles.soknadErLive],
	visVelgBosted:
	state.featuretoggles.data[FeatureToggles.visVelgBosted] === "true",
	startSoknadPending: state.soknad.startSoknadPending
}))(injectIntl(Informasjon));
