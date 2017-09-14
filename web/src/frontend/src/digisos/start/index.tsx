import * as React from "react";
import Bosted from "./Bosted";
import "./start.css";
const DocumentTitle = require("react-document-title");

class Start extends React.Component<{}, {}> {
	render() {
		return (
			<DocumentTitle title="Søknad om økonomisk sosialhjelp">
				<div className="skjema-content">
					<p className="blokk-l">
						For at vi skal kunne sende din søknad til riktig kommune trenger vi å
						vite hvor du bor og-/eller oppholder deg nå.
					</p>
					<Bosted />
				</div>
			</DocumentTitle>
		);
	}
}

export default Start;
