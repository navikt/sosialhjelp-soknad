import * as React from "react";
import Steg1 from "./skjema/Steg1";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import StegIndikator from "../components/StegIndikator";

class Skjema extends React.Component<{ match: any }, {}> {
	render() {
		const { match } = this.props;
		return (
			<div>
				<h1>
					<Link to="/skjema">Skjema</Link>
				</h1>
				<StegIndikator antallSteg={7} aktivtSteg={1} />
				<Route path={`${match.url}/steg1`} component={Steg1} />
			</div>
		);
	}
}

export default Skjema;
