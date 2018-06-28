import * as React from "react";
import { connect } from "react-redux";
import { RouterProps } from "react-router";
import {
	FormattedHTMLMessage,
	InjectedIntlProps,
	injectIntl,
	FormattedMessage,
} from "react-intl";
import DocumentTitle from "react-document-title";
import { State } from "../redux/reducers";
import { Undertittel } from "nav-frontend-typografi";
import Knapp from "nav-frontend-knapper";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import Infoblokk from "../../nav-soknad/components/infoblokk";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
// import { tilSteg } from "../../nav-soknad/redux/navigasjon/navigasjonActions";
import { FeatureToggles } from "../../featureToggles";
// import { Horten } from "../data/kommuner";
import IkkeTilgang from "./IkkeTilgang";
import { TilgangSperrekode } from "../../nav-soknad/redux/tilgang/tilgangTypes";
import {
	setVisSamtykkeInfo
} from "../../nav-soknad/redux/init/initActions";
import SamtykkeInfoForsidenModal from "./samtykkeInfoForsidenModal";
import { skjulToppMeny } from "../../nav-soknad/utils/domUtils";
import { opprettSoknad } from "../../nav-soknad/redux/soknad/soknadActions";

interface StateProps {
	harTilgang: boolean;
	sperrekode: TilgangSperrekode;
	soknadErLive: string;
	startSoknadPending: boolean;
	visVelgBosted: boolean;
}

type Props = StateProps & InjectedIntlProps & RouterProps & DispatchProps;

class Informasjon extends React.Component<Props, {}> {

	componentDidMount() {
		skjulToppMeny();
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

		const classNames = "ekspanderbartPanel skjema-oppsummering__bekreft";

		return (
			<div>
				<DocumentTitle title={title} />
				<AppTittel />
				{soknadErLive === "true" && harTilgang ? (
					<div>
						<div className="skjema-content">
							<Infoblokk
								className="blokk-s"
								tittel={getIntlTextOrKey(intl, "informasjon.start.tittel")}
							>
								<p className="blokk-s">
									<FormattedHTMLMessage id="informasjon.start.tekst" />
								</p>

								<Undertittel key="informasjon.nodsituasjon.undertittel">
									{getIntlTextOrKey(
										intl,
										"informasjon.nodsituasjon.undertittel"
									)}
								</Undertittel>
								<p className="blokk-s">
									<FormattedHTMLMessage id="informasjon.nodsituasjon.tekst" />
								</p>
							</Infoblokk>

							<div className="blokk-xs bolk">
								<div className={classNames} >
									<p style={{marginTop: "0"}}>
										<FormattedMessage id="soknadsosialhjelp.forstesiden.rettigheterPlikter"/>
										&nbsp;
										<a
											className="lenke"
											onClick={(event: React.MouseEvent<HTMLElement>) => {
												this.props.dispatch(setVisSamtykkeInfo(true));
										}}
										>
											<FormattedMessage id="soknadsosialhjelp.forstesiden.rettigheterPlikterLinktekst"/>
										</a>
									</p>
								</div>
							</div>
							<SamtykkeInfoForsidenModal/>

						</div>

						<Knapp
							id="start_soknad_button"
							type="hoved"
							spinner={startSoknadPending}
							disabled={startSoknadPending}
							onClick={() => this.startSoknad()}
						>
							{getIntlTextOrKey(intl, "skjema.knapper.start")}
						</Knapp>
					</div>
				) : (
					<div className="skjema-content">
						<IkkeTilgang sperrekode={sperrekode} />
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
