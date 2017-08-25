import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";
import Ektefelle from "./Ektefelle";

class Sivilstatus extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { faktum } = this.props;
		const sivilstatus = radioCheckKeys("familie.sivilstatus");
		const gift = radioCheckKeys("familie.sivilstatus.gift.true");
		return (
			<Sporsmal sporsmalId={sivilstatus.sporsmal}>
				<FaktumRadio faktumKey={sivilstatus.faktum} option="gift" />
				<Underskjema visible={faktum.get(sivilstatus.faktum) === "gift"}>
					<FaktumSkjemagruppe tittelId={gift.sporsmal}>
						<Ektefelle />
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
