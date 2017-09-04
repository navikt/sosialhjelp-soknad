import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { radioCheckKeys } from "../../../nav-skjema/utils";

import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-skjema/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-skjema/components/underskjema";
import Ektefelle from "./Ektefelle";

class Sivilstatus extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const sivilstatus = radioCheckKeys("familie.sivilstatus");
		return (
			<Sporsmal sporsmalId={sivilstatus.sporsmal}>
				<RadioFaktum faktumKey={sivilstatus.faktum} option="gift" />
				<Underskjema visible={fakta.get(sivilstatus.faktum) === "gift"}>
					<SkjemagruppeFaktum tittelId="familie.sivilstatus.gift.tittel">
						<Ektefelle fakta={fakta} />
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={sivilstatus.faktum} option="ugift" />
				<RadioFaktum faktumKey={sivilstatus.faktum} option="samboer" />
				<RadioFaktum faktumKey={sivilstatus.faktum} option="enke" />
				<RadioFaktum faktumKey={sivilstatus.faktum} option="skilt" />
			</Sporsmal>
		);
	}
}

export default Sivilstatus;
