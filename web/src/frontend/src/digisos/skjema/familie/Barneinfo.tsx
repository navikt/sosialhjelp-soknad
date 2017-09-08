import * as React from "react";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import {
	radioCheckKeys,
	faktumIsSelected,
	getFaktumVerdi
} from "../../../nav-soknad/utils";
import FaktumPersonskjema from "../../../nav-soknad/faktum/PersonFaktum";

import FaktumRadio from "../../../nav-soknad/faktum/RadioFaktum";
import FaktumSkjemagruppe from "../../../nav-soknad/faktum/SporsmalFaktum";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";

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
			<FaktumSkjemagruppe faktumKey="familie.barn.true">
				<FaktumPersonskjema faktumKey={faktumKey} />
				<FaktumSkjemagruppe faktumKey={borInfo.faktum}>
					<FaktumRadio faktumKey={borInfo.faktum} option="true" />
					<NivaTreSkjema
						visible={faktumIsSelected(getFaktumVerdi(fakta, borInfo.faktum))}>
						<FaktumSkjemagruppe faktumKey={hvormye.faktum}>
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
