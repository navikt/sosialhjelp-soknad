import * as React from "react";
import { Link } from "react-router-dom";

class Start extends React.Component<{}, {}> {
	render() {
		return (
			<div>
				<h1>StartSteg</h1>
				<Link to="skjema/steg1">Start</Link>
			</div>
		);
	}
}

export default Start;
