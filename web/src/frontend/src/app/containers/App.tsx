import * as React from "react";
import "../styles/app.css";
import { FormattedMessage } from "react-intl";

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div className="app-digisos">
				<h1>
					<FormattedMessage id="skjema.tittel" />
				</h1>
				{this.props.children}
			</div>
		);
	}
}

export default App;
