import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouterProps } from "react-router";
import { Route, Switch } from "react-router";
import Steg1 from "./kontaktinfo";
import Steg2 from "./arbeidUtdanning";
import Steg3 from "./familie";
import Steg4 from "./begrunnelse";
import Steg5 from "./bosituasjon";
import Steg6 from "./inntektFormue";
import Steg7 from "./utgifterGjeld";
import Steg8 from "./ekstrainformasjon";
import StegIndikator from "../../skjema/components/stegIndikator";
import Knapperad from "../../skjema/components/knapperad";
import { finnStegFraLocation } from "./utils";
import { gaTilbake, gaVidere, avbryt } from "./utils";

import { Location } from "history";

const stopEvent = (evt: React.FormEvent<any>) => {
	evt.stopPropagation();
	evt.preventDefault();
};

interface Props {
	match: any;
	location: Location;
}

class Skjema extends React.Component<Props & RouterProps, {}> {
	render() {
		const aktivtSteg = finnStegFraLocation(this.props.location);
		const { match, history } = this.props;
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
						{ tittel: "Opplysninger" }
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
					<Route path={`${match.url}/8`} component={Steg8} />
				</Switch>
				<Knapperad
					gaVidere={() => gaVidere(aktivtSteg, history)}
					gaTilbake={() => gaTilbake(aktivtSteg, history)}
					avbryt={() => avbryt()}
				/>
			</form>
		);
	}
}

export default connect((state: any, props: Props) => {
	return props;
})(withRouter(Skjema));
