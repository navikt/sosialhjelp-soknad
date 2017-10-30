import * as React from "react";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import {
	InjectedIntlProps,
	injectIntl,
	FormattedHTMLMessage
} from "react-intl";
import { Undertittel } from "nav-frontend-typografi";
import Knapp from "nav-frontend-knapper";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import Infoblokk from "../../nav-soknad/components/infoblokk";
import { tilBosted } from "../../nav-soknad/redux/navigasjon/navigasjonActions";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";

type Props = InjectedIntlProps & DispatchProps;

class Informasjon extends React.Component<Props, {}> {
	render() {
		const { intl, dispatch } = this.props;
		const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");
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
					<Knapp type="hoved" onClick={() => dispatch(tilBosted())}>
						{getIntlTextOrKey(intl, "skjema.knapper.start")}
					</Knapp>
				</span>
			</DocumentTitle>
		);
	}
}

export default connect()(injectIntl(Informasjon));
