import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

class Sivilstatus extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { faktum } = this.props;
		const sivilstatus = radioCheckKeys("familie.sivilstatus");
		const gift = radioCheckKeys("familie.sivilstatus.gift");
		return (
			<Sporsmal sporsmalId={sivilstatus.sporsmal}>
				<FaktumRadio faktumKey={sivilstatus.faktum} value="gift" />
				<Underskjema visible={faktum.get(sivilstatus.faktum) === "gift"}>
					<FaktumSkjemagruppe tittelId={gift.sporsmal}>
						<div className="skjemaelement">TODO</div>
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={sivilstatus.faktum} value="ugift" />
				<FaktumRadio faktumKey={sivilstatus.faktum} value="samboer" />
				<FaktumRadio faktumKey={sivilstatus.faktum} value="enke" />
				<FaktumRadio faktumKey={sivilstatus.faktum} value="skilt" />
			</Sporsmal>
		);
	}
}

export default Sivilstatus;
