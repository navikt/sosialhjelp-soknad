import * as React from "react";
import FaktumPersonskjema from "../../../skjema/faktum/FaktumPersonskjema";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import FaktumTextarea from "../../../skjema/faktum/FaktumTextarea";
import NivaTreSkjema from "../../../skjema/components/nivaTreSkjema";

class Ektefelle extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const borsammen = radioCheckKeys("familie.sivilstatus.gift.borsammen");
		return (
			<div>
				<FaktumPersonskjema faktumKey="familie.sivilstatus.gift" />
				<FaktumSkjemagruppe tittelId={borsammen.sporsmal}>
					<FaktumRadio faktumKey={borsammen.faktum} option="true" />
					<FaktumRadio faktumKey={borsammen.faktum} option="false" />
					<NivaTreSkjema visible={fakta.get(borsammen.faktum) === "false"}>
						<FaktumTextarea faktumKey={`${borsammen.faktum}.false.beskrivelse`} />
					</NivaTreSkjema>
				</FaktumSkjemagruppe>
			</div>
		);
	}
}

export default Ektefelle;
