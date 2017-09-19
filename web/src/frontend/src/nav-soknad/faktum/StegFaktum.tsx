import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getIntlTextOrKey } from "../utils";
import Feiloppsummering from "../components/validering/Feiloppsummering";
import { SoknadAppState } from "../redux/faktaReducer";
import { Valideringsfeil } from "../validering/types";
import StegMedNavigasjon from "../../digisos/skjema/stegMedNavigasjon";
import AppTittel from "../components/apptittel/appTittel";
import { Innholdstittel } from "nav-frontend-typografi";
const DocumentTitle = require("react-document-title");

interface OwnProps extends React.Props<any> {
	tittelId: string;
}

interface StateProps {
	valideringsfeil?: Valideringsfeil[];
	visFeilmeldinger?: boolean;
	stegValidertCounter?: number;
}

class StegFaktum extends React.Component<
	OwnProps & StateProps & InjectedIntlProps,
	{}
> {
	componentDidMount() {
		document.body.scrollTop = 0;
	}

	render() {
		const {
			tittelId,
			valideringsfeil,
			visFeilmeldinger,
			stegValidertCounter,
			intl,
			children
		} = this.props;
		const title =
			getIntlTextOrKey(intl, tittelId)
			" - " +
			getIntlTextOrKey(intl, "applikasjon.sidetittel.kortnavn") +
		return (
			<DocumentTitle title={title}>
				<span>
					<AppTittel/>
					<StegMedNavigasjon>
						<div className="skjema-steg skjema-content">
							<div className="skjema-steg__feiloppsummering">
								<Feiloppsummering
									skjemanavn="digisos"
									valideringsfeil={valideringsfeil}
									stegValidertCounter={stegValidertCounter}
									visFeilliste={visFeilmeldinger}
								/>
							</div>
							<div className="skjema-steg__tittel">
								<Innholdstittel>{getIntlTextOrKey(intl, tittelId)}</Innholdstittel>
							</div>
							{children}
						</div>
					</StegMedNavigasjon>
				</span>
			</DocumentTitle>
		);
	}
}

export default injectIntl(
	connect<
		StateProps,
		{},
		OwnProps & InjectedIntlProps
	>((state: SoknadAppState, props: OwnProps): StateProps => {
		return {
			visFeilmeldinger: state.validering.visValideringsfeil,
			valideringsfeil: state.validering.feil,
			stegValidertCounter: state.validering.stegValidertCounter
		};
	})(StegFaktum)
);
