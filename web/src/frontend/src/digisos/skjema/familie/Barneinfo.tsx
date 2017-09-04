import * as React from "react";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../nav-skjema/utils";
import FaktumPersonskjema from "../../../nav-skjema/faktum/FaktumPersonskjema";

import FaktumRadio from "../../../nav-skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../nav-skjema/faktum/FaktumSkjemagruppe";
import NivaTreSkjema from "../../../nav-skjema/components/nivaTreSkjema";

interface OwnProps {
	faktumKey: string;
	nummer: number;
}

class Barn extends React.Component<OwnProps & FaktumComponentProps, {}> {
	render() {
		const { fakta, faktumKey } = this.props;
		const borInfo = radioCheckKeys(`${faktumKey}.borsammen`);
		const hvormye = radioCheckKeys(`${faktumKey}.borsammen.true.grad`);
		return (
			<FaktumSkjemagruppe tittelId="familie.barn.true.tittel">
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
