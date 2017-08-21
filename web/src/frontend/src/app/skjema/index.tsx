import * as React from "react";
import Steg1 from "./steg/bostedKontakinfo";
import Steg2 from "./steg/arbeidUtdanning";
import Steg3 from "./steg/familie";
import Steg4 from "./steg/hvorforSoke";
import Steg5 from "./steg/bosituasjon";
import Steg6 from "./steg/inntektFormue";
import Steg7 from "./steg/utgifterGjeld";
import { Route, Switch } from "react-router";
import StegIndikator from "../../skjema/components/stegIndikator";
import Knapperad from "./components/knapperad";
import { finnStegFraLocation } from "./utils";

import { Location } from "history";

const stopEvent = (evt: React.FormEvent<any>) => {
	evt.stopPropagation();
	evt.preventDefault();
};

interface SkjemaProps {
	match: any;
	location: Location;
}

class Skjema extends React.Component<SkjemaProps, {}> {
	render() {
		const aktivtSteg = finnStegFraLocation(this.props.location);
		const { match } = this.props;
		return (
			<form id="soknadsskjema" onSubmit={stopEvent}>
				<StegIndikator
					aktivtSteg={aktivtSteg}
					steg={[
						{ tittel: "Bosted, kontaktinfo og statsborgerskap" },
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
					<Route path={`${match.url}/1`} component={Steg1} />
					<Route path={`${match.url}/2`} component={Steg2} />
					<Route path={`${match.url}/3`} component={Steg3} />
					<Route path={`${match.url}/4`} component={Steg4} />
					<Route path={`${match.url}/5`} component={Steg5} />
					<Route path={`${match.url}/6`} component={Steg6} />
					<Route path={`${match.url}/7`} component={Steg7} />
				</Switch>
				<Knapperad aktivtSteg={aktivtSteg} />
			</form>
		);
	}
}

export default Skjema;
