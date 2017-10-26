import * as React from "react";
import Feilside from "./Feilside";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { NavigasjonActions } from "../../redux/navigasjon/navigasjonTypes";
import { tilbakeEllerNavNO } from "../../redux/navigasjon/navigasjonActions";

interface OwnProps {
	onClick: () => NavigasjonActions;
}

const IkkeFunnet: React.StatelessComponent<OwnProps & InjectedIntlProps> = ({ intl, onClick }) => {
	return (
		<Feilside
			onClick={ onClick }
			visKnapp={true}
		>
			<p>{intl.formatMessage({ id: "feilside.ikkefunnet.feilmelding" })}</p>
		</Feilside>
	);
};

export default connect(() => ({}), dispatch => {
	return {
		onClick: () => dispatch(tilbakeEllerNavNO())
	};
})(injectIntl(IkkeFunnet));
