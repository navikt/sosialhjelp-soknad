import * as React from "react";
import Bosted from "./BostedContainer";
import "./start.css";

class Start extends React.Component<{}, {}> {
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

export default Start;
