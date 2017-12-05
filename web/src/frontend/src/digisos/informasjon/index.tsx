import * as React from "react";
import { connect } from "react-redux";
import { RouterProps } from "react-router";
import {
	FormattedHTMLMessage,
	InjectedIntlProps,
	injectIntl
} from "react-intl";
import DocumentTitle from "react-document-title";
import { State } from "../redux/reducers";
import { Undertittel } from "nav-frontend-typografi";
import Knapp from "nav-frontend-knapper";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import Infoblokk from "../../nav-soknad/components/infoblokk";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { tilBostedEllerStartSoknad } from "../../nav-soknad/redux/navigasjon/navigasjonActions";
import { FeatureToggles } from "../../featureToggles";
import { Horten } from "../data/kommuner";

interface StateProps {
	harTilgang: boolean;
	soknadErLive: string;
	startSoknadPending: boolean;
	visVelgBosted: boolean;
}

type Props = StateProps & InjectedIntlProps & RouterProps & DispatchProps;

class Informasjon extends React.Component<Props, {}> {
	render() {
		const {
			intl,
			dispatch,
			harTilgang,
			startSoknadPending,
			visVelgBosted,
			soknadErLive
		} = this.props;
		const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");
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
						</div>
						<Knapp
							type="hoved"
							spinner={startSoknadPending}
							disabled={startSoknadPending}
							onClick={() =>
								dispatch(
									tilBostedEllerStartSoknad(visVelgBosted ? Horten : null)
								)
							}
						>
							{getIntlTextOrKey(intl, "skjema.knapper.start")}
						</Knapp>
					</div>
				) : (
					<div className="skjema-content">
						<Infoblokk
							className="blokk-s"
							tittel={getIntlTextOrKey(intl, "informasjon.ikketilgang.tittel")}
						>
							<p className="blokk-s">
								<FormattedHTMLMessage id="informasjon.ikketilgang.tekst" />
							</p>
						</Infoblokk>
					</div>
				)}
			</div>
		);
	}
}

export default connect((state: State) => ({
	harTilgang: state.tilgang.harTilgang,
	soknadErLive: state.featuretoggles.data[FeatureToggles.soknadErLive],
	visVelgBosted: state.featuretoggles.data[FeatureToggles.visVelgBosted],
	startSoknadPending: state.soknad.startSoknadPending
}))(injectIntl(Informasjon));
