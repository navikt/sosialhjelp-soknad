import * as React from "react";
import "../styles/app.css";
import { Link } from "react-router-dom";
import Frontend from "../frontend/Frontend";

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div className="app-form">
				<Link to="/">Søknad</Link>
				{this.props.children}
				<Frontend />
			</div>
		);
	}
}

export default App;
