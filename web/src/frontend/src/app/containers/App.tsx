import * as React from "react";
import "../styles/app.css";
import { Link } from "react-router-dom";

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div>
				<Link to="/">Søknad</Link>
				{this.props.children}
			</div>
		);
	}
}

export default App;
