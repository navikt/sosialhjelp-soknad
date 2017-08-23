import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

class AndreBarn extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { faktum } = this.props;
		const andrebarn = radioCheckKeys("familie.andrebarn");
		const andrebarnJa = radioCheckKeys("familie.andrebarn.true");
		return (
			<Sporsmal sporsmalId={andrebarn.sporsmal}>
				<FaktumRadio faktumKey={andrebarn.faktum} value="true" />
				<Underskjema visible={faktum.get(andrebarn.faktum) === "true"}>
					<FaktumSkjemagruppe tittelId={andrebarnJa.sporsmal}>
						<div className="skjemaelement">TODO</div>
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={andrebarn.faktum} value="false" />
			</Sporsmal>
		);
	}
}

export default AndreBarn;
