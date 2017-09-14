import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getIntlTextOrKey } from "../utils";
import Steg from "../components/steg";
import { SoknadAppState } from "../redux/faktaReducer";
import { Valideringsfeil } from "../validering/types";
const DocumentTitle = require("react-document-title");

interface OwnProps extends React.Props<any> {
	tittelId: string;
}

interface StateProps {
	feilmeldinger?: Valideringsfeil[];
	visFeilmeldinger?: boolean;
}

class StegFaktum extends React.Component<
	OwnProps & StateProps & InjectedIntlProps,
	{}
> {
	render() {
		const {
			tittelId,
			feilmeldinger,
			visFeilmeldinger,
			intl,
			children
		} = this.props;
		return (
			<DocumentTitle title={"Søknad - " + getIntlTextOrKey(intl, tittelId)}>
				<Steg
					tittel={getIntlTextOrKey(intl, tittelId)}
					feilmeldinger={feilmeldinger}
					visFeilmeldinger={visFeilmeldinger}>
					{children}
				</Steg>
			</DocumentTitle>
		);
	}
}

export default injectIntl(
	connect<
		StateProps,
		{},
		OwnProps & InjectedIntlProps
	>((state: SoknadAppState, props: OwnProps) => {
		return {
			feilmeldinger: state.validering.feil,
			visFeilmeldinger: true
		};
	})(StegFaktum)
);
