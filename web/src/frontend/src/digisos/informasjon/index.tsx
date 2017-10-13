import * as React from "react";
import { InjectedIntlProps, injectIntl, FormattedHTMLMessage } from "react-intl";
import DocumentTitle from "react-document-title";
import { getIntlTextOrKey } from "../../nav-soknad/utils/intlUtils";
import AppTittel from "../../nav-soknad/components/apptittel/AppTittel";
import { Undertittel } from "nav-frontend-typografi";
import { Checkbox } from "nav-frontend-skjema";
import Knapp from "nav-frontend-knapper";
import { RouterProps } from "react-router";

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
		const title = getIntlTextOrKey(intl, "");
		return (
			<DocumentTitle title={title}>
				<span>
					<AppTittel/>
					<div className="skjema-content">
						<p className="blokk-l">
							<Undertittel>
								{ getIntlTextOrKey(intl, "informasjon.start.undertittel") }
							</Undertittel>
							<p>
								<FormattedHTMLMessage id="informasjon.start.tekst"/>
							</p>
						</p>
						<p className="blokk-l">
							<Undertittel key="informasjon.nodsituasjon.undertittel">
								{ getIntlTextOrKey(intl, "informasjon.nodsituasjon.undertittel") }
							</Undertittel>
							<p>
								<FormattedHTMLMessage id="informasjon.nodsituasjon.tekst"/>
							</p>
						</p>
						<Checkbox
							onChange={ this.handleToggleChecked }
							label={ getIntlTextOrKey(intl, "informasjon.bekreftelse") }
						/>
					</div>
					{ checked &&
						<Knapp
							type="hoved"
							onClick={ this.handleGaVidere }
						>
							{ getIntlTextOrKey(intl, "skjema.knapper.gaavidere") }
						</Knapp>
					}
				</span>
			</DocumentTitle>
		);
	}
}

export default injectIntl(Informasjon);
