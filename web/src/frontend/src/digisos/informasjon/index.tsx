import * as React from "react";
import { connect } from "react-redux";
import { RouterProps } from "react-router";
import {
	InjectedIntlProps,
	injectIntl,
	FormattedHTMLMessage
} from "react-intl";
import DocumentTitle from "react-document-title";
import { State } from "../redux/reducers";
import { Undertittel } from "nav-frontend-typografi";
import Knapp from "nav-frontend-knapper";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import Infoblokk from "../../nav-soknad/components/infoblokk";
import { startSoknad } from "../../nav-soknad/redux/soknad/soknadActions";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { Horten } from "../data/kommuner";

interface StateProps {
	harTilgang: boolean;
	startSoknadPending: boolean;
}

type Props = StateProps & InjectedIntlProps & RouterProps & DispatchProps;

class Informasjon extends React.Component<Props, {}> {
	render() {
		const { intl, dispatch, harTilgang, startSoknadPending } = this.props;
		const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");
		return (
			<div>
				<DocumentTitle title={title} />
				<AppTittel />
				{harTilgang ? (
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
							onClick={() => dispatch(startSoknad(Horten.id))}
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
	startSoknadPending: state.soknad.startSoknadPending
}))(injectIntl(Informasjon));
