import * as React from "react";
import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";

import { DispatchProps } from "../redux/reduxTypes";
import Dialog from "../components/dialog/Dialog";
import { SoknadAppState } from "../redux/reduxTypes";
import { clearApplikasjonsfeil } from "../redux/applikasjonsfeil/applikasjonsfeilActions";
import { Applikasjonsfeil } from "../redux/applikasjonsfeil/applikasjonsfeilTypes";

interface StateProps {
	feil?: Applikasjonsfeil;
	visDialog?: boolean;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

class ApplikasjonsfeilDialog extends React.Component<Props, {}> {
	render() {
		return (
			<Dialog
				isOpen={this.props.visDialog}
				icon="advarsel-sirkel-fyll"
				overskrift={this.props.visDialog && this.props.feil ? this.props.feil.tittel : ""}
				dialogtittel={
					this.props.visDialog
						? this.props.intl.formatMessage({
								id: "applikasjonsfeil.dialogtittel"
							})
						: ""
				}
				okLabel="ok"
				onClose={() => this.props.dispatch(clearApplikasjonsfeil())}
			>
				{this.props.visDialog && this.props.feil ? this.props.feil.innhold : ""}
			</Dialog>
		);
	}
}

const mapStateToProps = (state: SoknadAppState): StateProps => {
	return {
		feil: state.applikasjonsfeil.feil,
		visDialog: state.applikasjonsfeil.visDialog
	};
};

export default connect(mapStateToProps)(
	injectIntl(ApplikasjonsfeilDialog)
);
