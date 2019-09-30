import * as React from "react";
import Feilside from "../components/feilside/Feilside";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { NavigasjonActions } from "../../digisos/redux/navigasjon/navigasjonTypes";
import { tilbakeEllerForsiden } from "../../digisos/redux/navigasjon/navigasjonActions";
import EllaBlunk from "../components/animasjoner/ellaBlunk";

interface OwnProps {
	onClick: () => NavigasjonActions;
}

const IkkeFunnet: React.StatelessComponent<OwnProps & InjectedIntlProps> = ({
	intl,
	onClick
}) => {
	return (
		<Feilside onClick={onClick} visKnapp={true}>
			<p>{intl.formatMessage({ id: "feilside.ikkefunnet.feilmelding" })}</p>
		</Feilside>
	);
};

export default connect(
	() => ({}),
	dispatch => {
		return {
			onClick: () => dispatch(tilbakeEllerForsiden())
		};
	}
)(injectIntl(IkkeFunnet));
