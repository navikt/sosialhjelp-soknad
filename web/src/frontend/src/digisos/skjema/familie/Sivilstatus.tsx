import * as React from "react";
import Sporsmal from "../../../nav-skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { radioCheckKeys } from "../../../nav-skjema/utils";

import FaktumRadio from "../../../nav-skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../nav-skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../nav-skjema/components/underskjema";
import Ektefelle from "./Ektefelle";

class Sivilstatus extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const sivilstatus = radioCheckKeys("familie.sivilstatus");
		return (
			<Sporsmal sporsmalId={sivilstatus.sporsmal}>
				<FaktumRadio faktumKey={sivilstatus.faktum} option="gift" />
				<Underskjema visible={fakta.get(sivilstatus.faktum) === "gift"}>
					<FaktumSkjemagruppe tittelId="familie.sivilstatus.gift.tittel">
						<Ektefelle fakta={fakta} />
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={sivilstatus.faktum} option="ugift" />
				<FaktumRadio faktumKey={sivilstatus.faktum} option="samboer" />
				<FaktumRadio faktumKey={sivilstatus.faktum} option="enke" />
				<FaktumRadio faktumKey={sivilstatus.faktum} option="skilt" />
			</Sporsmal>
		);
	}
}

export default Sivilstatus;
