import * as React from "react";
import FaktumPersonskjema from "../../../skjema/faktum/FaktumPersonskjema";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import FaktumTextarea from "../../../skjema/faktum/FaktumTextarea";

class Ektefelle extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { faktum } = this.props;
		const borsammen = radioCheckKeys("sivilstatus.ektefelle.borsammen");
		return (
			<div>
				<FaktumPersonskjema faktumKey="sivilstatus.ektefelle" />
				<FaktumSkjemagruppe tittelId={borsammen.sporsmal}>
					<FaktumRadio faktumKey={borsammen.faktum} option="true" />
					<FaktumRadio faktumKey={borsammen.faktum} option="false" />
					{faktum.get(borsammen.faktum) === "false"
						? <FaktumTextarea faktumKey={`${borsammen.faktum}.beskrivelse`} />
						: null}
				</FaktumSkjemagruppe>
			</div>
		);
	}
}

export default Ektefelle;
