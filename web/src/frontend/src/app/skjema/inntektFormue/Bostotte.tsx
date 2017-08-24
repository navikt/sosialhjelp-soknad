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
		const { faktum } = this.props;
		const bostotte = radioCheckKeys("inntekt.bostotte");
		const hvilkenStotte = radioCheckKeys("inntekt.bostotte.true.type");
		return (
			<Sporsmal sporsmalId={bostotte.sporsmal}>
				<FaktumRadio faktumKey={bostotte.faktum} value="false" />
				<FaktumRadio faktumKey={bostotte.faktum} value="true" />
				<Underskjema visible={faktumIsSelected(faktum.get("inntekt.bostotte"))}>
					<FaktumSkjemagruppe tittelId={hvilkenStotte.sporsmal}>
						<FaktumCheckbox faktumKey={hvilkenStotte.faktum} part="husbanken" />
						<FaktumCheckbox faktumKey={hvilkenStotte.faktum} part="kommunal" />
					</FaktumSkjemagruppe>
				</Underskjema>
			</Sporsmal>
		);
	}
}

export default Bostotte;
