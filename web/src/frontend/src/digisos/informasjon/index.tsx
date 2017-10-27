import * as React from "react";
import { connect } from "react-redux";
import { RouterProps } from "react-router";
import {
	InjectedIntlProps,
	injectIntl,
	FormattedHTMLMessage
} from "react-intl";
import DocumentTitle from "react-document-title";
import { Undertittel } from "nav-frontend-typografi";
import Knapp from "nav-frontend-knapper";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import Infoblokk from "../../nav-soknad/components/infoblokk";
import { State } from "../redux/reducers";

interface StateProps {
	harTilgang: boolean;
}

type Props = StateProps & InjectedIntlProps & RouterProps;

class Informasjon extends React.Component<Props, {}> {
	render() {
		const { intl, history } = this.props;
		const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");
		const handleGaVidere = () => history.push("/bosted");
		return (
			<DocumentTitle title={title}>
				<span>
					<AppTittel />
					<div className="skjema-content">
						<Infoblokk
							className="blokk-s"
							tittel={getIntlTextOrKey(intl, "informasjon.start.tittel")}
						>
							<p className="blokk-s">
								<FormattedHTMLMessage id="informasjon.start.tekst" />
							</p>

							<Undertittel key="informasjon.nodsituasjon.undertittel">
								{getIntlTextOrKey(intl, "informasjon.nodsituasjon.undertittel")}
							</Undertittel>
							<p className="blokk-s">
								<FormattedHTMLMessage id="informasjon.nodsituasjon.tekst" />
							</p>
						</Infoblokk>
					</div>
					<Knapp type="hoved" onClick={handleGaVidere}>
						{getIntlTextOrKey(intl, "skjema.knapper.start")}
					</Knapp>
				</span>
			</DocumentTitle>
		);
	}
}

export default connect((state: State) => ({
	harTilgang: state.tilgang.harTilgang
}))(injectIntl(Informasjon));
