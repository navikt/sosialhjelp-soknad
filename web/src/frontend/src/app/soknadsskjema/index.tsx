import * as React from "react";
import Steg1 from "./Steg1";
import Steg2 from "./Steg2";
import { Route } from "react-router";
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
			<form action="#" onSubmit={stopEvent}>
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
				<Route path={`${match.url}/steg1`} component={Steg1} />
				<Route path={`${match.url}/steg2`} component={Steg2} />
				<Knapperad />
			</form>
		);
	}
}

export default Skjema;
