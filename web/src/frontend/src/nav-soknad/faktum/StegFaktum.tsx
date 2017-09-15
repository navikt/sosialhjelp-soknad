import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getIntlTextOrKey } from "../utils";
import Feiloppsummering from "../components/validering/Feiloppsummering";
import { SoknadAppState } from "../redux/faktaReducer";
import { Valideringsfeil } from "../validering/types";

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
	render() {
		const {
			tittelId,
			valideringsfeil,
			visFeilmeldinger,
			stegValidertCounter,
			intl,
			children
		} = this.props;
		return (
			<div className="skjema-steg skjema-content">
				<div className="skjema-steg__feiloppsummering">
					<Feiloppsummering
						skjemanavn="digisos"
						valideringsfeil={valideringsfeil}
						stegValidertCounter={stegValidertCounter}
						visFeilliste={visFeilmeldinger}
					/>
				</div>
				<h2 className="skjema-steg__tittel">
					{getIntlTextOrKey(intl, tittelId)}
				</h2>
				{children}
			</div>
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
			valideringsfeil: state.validering.feil,
			visFeilmeldinger: true,
			stegValidertCounter: state.validering.stegValidertCounter
		};
	})(StegFaktum)
);
