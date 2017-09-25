import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Innholdstittel } from "nav-frontend-typografi";
import DocumentTitle from "react-document-title";
import { getIntlTextOrKey } from "../utils";
import Feiloppsummering from "../components/validering/Feiloppsummering";
import { SoknadAppState } from "../redux/faktaReducer";
import { Valideringsfeil } from "../validering/types";
import StegMedNavigasjon from "../containers/StegMedNavigasjon";
import AppTittel from "../components/apptittel/AppTittel";
import { animateScroll } from "react-scroll";

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
		animateScroll.scrollToTop({ duration: 500 });
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
			getIntlTextOrKey(intl, tittelId) +
			" - " +
			getIntlTextOrKey(intl, "applikasjon.sidetittel.kortnavn");
		return (
			<DocumentTitle title={title}>
				<span>
					<AppTittel />
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
								<Innholdstittel>
									{getIntlTextOrKey(intl, tittelId)}
								</Innholdstittel>
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
