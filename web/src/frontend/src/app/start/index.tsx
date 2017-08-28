import * as React from "react";
import Bosted from "./Bosted";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { opprettSoknad } from "../../redux/soknad/actions";
import "./start.css";

class Start extends React.Component<DispatchToProps, {}> {

	componentDidMount() {
		this.props.action.opprettSoknad();
	}

	render() {
		return (
			<div className="skjema-start">
				<p className="blokk-l">
					For at vi skal kunne sende din søknad til riktig kommune trenger vi å
					vite hvor du bor og-/eller oppholder deg nå.
				</p>
				<Bosted />
			</div>
		);
	}
}

interface DispatchToProps {
	action: {
		opprettSoknad: () => {}
	};
}
const mapStateToProps = (state: any): {} => ({
});

const mapDispatchToProps = (dispatch: any): DispatchToProps => ({
	action: bindActionCreators({opprettSoknad}, dispatch)
});

export default connect<{}, DispatchToProps, {}>(mapStateToProps, mapDispatchToProps)(Start);
