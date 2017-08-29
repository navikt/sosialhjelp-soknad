import * as React from "react";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../skjema/utils";
import FaktumPersonskjema from "../../../skjema/faktum/FaktumPersonskjema";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import NivaTreSkjema from "../../../skjema/components/nivaTreSkjema";

interface OwnProps {
	faktumKey: string;
	nummer: number;
}

class Barn extends React.Component<OwnProps & FaktumComponentProps, {}> {
	render() {
		const { fakta, faktumKey } = this.props;
		const borInfo = radioCheckKeys(`${faktumKey}.bor`);
		const hvormye = radioCheckKeys(`${faktumKey}.bor.hvormye`);
		return (
			<FaktumSkjemagruppe tittelId="familie.barneinfo.tittel">
				<FaktumPersonskjema faktumKey={faktumKey} />
				<FaktumSkjemagruppe tittelId={borInfo.sporsmal}>
					<FaktumRadio faktumKey={borInfo.faktum} option="true" />
					<NivaTreSkjema visible={faktumIsSelected(fakta.get(borInfo.faktum))}>
						<FaktumSkjemagruppe tittelId={hvormye.sporsmal}>
							<FaktumRadio faktumKey={hvormye.faktum} option="heltid" />
							<FaktumRadio faktumKey={hvormye.faktum} option="deltid" />
						</FaktumSkjemagruppe>
					</NivaTreSkjema>
					<FaktumRadio faktumKey={borInfo.faktum} option="false" />
				</FaktumSkjemagruppe>
			</FaktumSkjemagruppe>
		);
	}
}

export default Barn;
