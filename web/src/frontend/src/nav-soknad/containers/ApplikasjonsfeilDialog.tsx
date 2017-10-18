import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps } from "../redux/reduxTypes";

import Dialog from "../components/dialog/Dialog";
import { SoknadAppState } from "../redux/reduxTypes";
import { clearApplikasjonsfeil } from "../redux/applikasjonsfeil/applikasjonsfeilActions";

interface StateProps {
	feil?: any;
	visDialog?: boolean;
}

type Props = StateProps & DispatchProps;

class ApplikasjonsfeilDialog extends React.Component<Props, {}> {
	render() {
		return (
			<Dialog
				isOpen={this.props.visDialog}
				icon="advarsel-trekant"
				overskrift="Overskriften"
				dialogtittel="Navn på dialogen"
				okLabel="ok"
				onClose={() => this.props.dispatch(clearApplikasjonsfeil())}
			>
				{this.props.feil}
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

export default connect<StateProps, {}, {}>(mapStateToProps)(
	ApplikasjonsfeilDialog
);
