import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumCheckbox from "../../../skjema/faktum/FaktumCheckbox";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

class Bostotte extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const bostotte = radioCheckKeys("inntekt.bostotte");
		const hvilkenStotte = radioCheckKeys("inntekt.bostotte.true.type");
		return (
			<Sporsmal sporsmalId={bostotte.sporsmal}>
				<FaktumRadio faktumKey={bostotte.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get("inntekt.bostotte"))}>
					<FaktumSkjemagruppe tittelId={hvilkenStotte.sporsmal}>
						{/*TODO legge til checkboxgroup-faktum*/}
						<FaktumCheckbox
							faktumKey={hvilkenStotte.faktum}
							option="husbanken"
						/>
						<FaktumCheckbox
							faktumKey={hvilkenStotte.faktum}
							option="kommunal"
						/>
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={bostotte.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Bostotte;
