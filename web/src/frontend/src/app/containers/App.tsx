import * as React from "react";
import "../styles/app.css";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div>
				<Link to="/">
					<FormattedMessage id="skjema.tittel"/>
				</Link>
				{this.props.children}
			</div>
		);
	}
}

export default App;
