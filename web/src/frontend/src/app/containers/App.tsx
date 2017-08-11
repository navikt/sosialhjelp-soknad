import * as React from "react";
import "../styles/app.css";
import { FormattedMessage } from "react-intl";

class App extends React.Component<{}> {
	render() {
		return (
			<div>
				ReactSkall
				<br/>
				<FormattedMessage id="skjema.tittel"/>
			</div>
		);
	}
}

export default App;
