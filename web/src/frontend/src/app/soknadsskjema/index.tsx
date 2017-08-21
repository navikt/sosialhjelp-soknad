import * as React from "react";
import Steg1 from "./Steg1";
import Steg2 from "./Steg2";
import Steg3 from "./Steg3";
import Steg4 from "./Steg4";
import Steg5 from "./Steg5";
import Steg6 from "./Steg6";
import Steg7 from "./Steg7";
import { Route, Switch } from "react-router";
import StegIndikator from "../components/stegIndikator";
import Knapperad from "./Knapperad";
import { finnStegFraLocation } from "./utils";

import { Location } from "history";

const stopEvent = (evt: React.FormEvent<any>) => {
	evt.stopPropagation();
	evt.preventDefault();
};

class Skjema extends React.Component<{ match: any; location: Location }, {}> {
	render() {
		const aktivtSteg = finnStegFraLocation(this.props.location);
		const { match } = this.props;
		return (
			<form id="soknadsskjema" onSubmit={stopEvent}>
				<StegIndikator
					aktivtSteg={aktivtSteg}
					steg={[
						{ tittel: "Arbeid og utdanning" },
						{ tittel: "Familiesituasjon" },
						{ tittel: "Hvorfor og hva du søker om" },
						{ tittel: "Bosituasjon" },
						{ tittel: "Inntekt og utdanning" },
						{ tittel: "Utgifter og gjeld" },
						{ tittel: "Vedlegg" }
					]}
				/>
				<Switch>
					<Route path={`${match.url}/steg1`} component={Steg1} />
					<Route path={`${match.url}/steg2`} component={Steg2} />
					<Route path={`${match.url}/steg3`} component={Steg3} />
					<Route path={`${match.url}/steg4`} component={Steg4} />
					<Route path={`${match.url}/steg5`} component={Steg5} />
					<Route path={`${match.url}/steg6`} component={Steg6} />
					<Route path={`${match.url}/steg7`} component={Steg7} />
				</Switch>
				<Knapperad aktivtSteg={aktivtSteg} />
			</form>
		);
	}
}

export default Skjema;
