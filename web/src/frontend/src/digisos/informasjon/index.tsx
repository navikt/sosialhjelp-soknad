import * as React from "react";
import { InjectedIntlProps, injectIntl, FormattedHTMLMessage } from "react-intl";
import DocumentTitle from "react-document-title";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import { Undertittel } from "nav-frontend-typografi";
import { Checkbox } from "nav-frontend-skjema";
import Knapp from "nav-frontend-knapper";
import { RouterProps } from "react-router";
import Infoblokk from "../../nav-soknad/components/infoblokk";

interface StateProps {
	checked: boolean;
}

class Informasjon extends React.Component<
	InjectedIntlProps &
	RouterProps,
	StateProps
> {

	constructor(props: any) {
		super(props);
		this.state = {
			checked: false
		};
		this.handleToggleChecked = this.handleToggleChecked.bind(this);
		this.handleGaVidere = this.handleGaVidere.bind(this);
	}

	handleToggleChecked() {
		this.setState({checked: !this.state.checked});
	}

	handleGaVidere() {
		this.props.history.push(`/bosted`);
	}

	render() {
		const { checked } = this.state;
		const { intl } = this.props;
		const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");
		return (
			<DocumentTitle title={title}>
				<span>
					<AppTittel/>
					<div className="skjema-content">
						<Infoblokk
							className="blokk-s"
							tittel={ getIntlTextOrKey(intl, "informasjon.start.tittel") }
						>

							<p className="blokk-s">
								<FormattedHTMLMessage id="informasjon.start.tekst"/>
							</p>

							<Undertittel key="informasjon.nodsituasjon.undertittel">
								{ getIntlTextOrKey(intl, "informasjon.nodsituasjon.undertittel") }
							</Undertittel>
							<p className="blokk-s">
								<FormattedHTMLMessage id="informasjon.nodsituasjon.tekst"/>
							</p>
						</Infoblokk>
						<Checkbox
							className="blokk-s"
							onChange={ this.handleToggleChecked }
							label={ getIntlTextOrKey(intl, "informasjon.bekreftelse") }
						/>
					</div>
					{ checked &&
						<Knapp
							type="hoved"
							onClick={ this.handleGaVidere }
						>
							{ getIntlTextOrKey(intl, "skjema.knapper.start") }
						</Knapp>
					}
				</span>
			</DocumentTitle>
		);
	}
}

export default injectIntl(Informasjon);
