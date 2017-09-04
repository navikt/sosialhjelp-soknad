import * as React from "react";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../nav-skjema/utils";
import PersonFaktum from "../../../nav-skjema/faktum/PersonFaktum";

import RadioFaktum from "../../../nav-skjema/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-skjema/faktum/SkjemagruppeFaktum";
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
			<SkjemagruppeFaktum tittelId="familie.barn.true.tittel">
				<PersonFaktum faktumKey={faktumKey} />
				<SkjemagruppeFaktum tittelId={borInfo.sporsmal}>
					<RadioFaktum faktumKey={borInfo.faktum} option="true" />
					<NivaTreSkjema visible={faktumIsSelected(fakta.get(borInfo.faktum))}>
						<SkjemagruppeFaktum tittelId={hvormye.sporsmal}>
							<RadioFaktum faktumKey={hvormye.faktum} option="heltid" />
							<RadioFaktum faktumKey={hvormye.faktum} option="deltid" />
						</SkjemagruppeFaktum>
					</NivaTreSkjema>
					<RadioFaktum faktumKey={borInfo.faktum} option="false" />
				</SkjemagruppeFaktum>
			</SkjemagruppeFaktum>
		);
	}
}

export default Barn;
