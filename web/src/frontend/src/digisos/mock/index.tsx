import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import "whatwg-fetch";

import EgendefinertBruker from "./EgendefinertBruker";

export interface StateProps {
	router: any
}

type Props = StateProps & DispatchProps;

class Mock extends React.Component<Props, {}> {

	render() {
		return (
			<div>
				<div className="mock-body">
					<EgendefinertBruker />
				</div>
			</div>
		);
	}
}

export default connect((state: StateProps) => ({
	router: state.router
}))(Mock);

