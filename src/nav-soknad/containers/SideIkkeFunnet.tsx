import * as React from "react";
import Feilside from "../components/feilside/Feilside";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { NavigasjonActions } from "../redux/navigasjon/navigasjonTypes";
import { tilbakeEllerForsiden } from "../redux/navigasjon/navigasjonActions";

interface Props {
	onClick: () => NavigasjonActions;
}

const IkkeFunnet: React.StatelessComponent<Props> = ({onClick}) => {
	const intl = useIntl();
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
)(IkkeFunnet);
