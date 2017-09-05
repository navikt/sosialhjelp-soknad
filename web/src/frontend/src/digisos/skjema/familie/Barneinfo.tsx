import * as React from "react";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { radioCheckKeys, faktumIsSelected, getFaktumVerdi } from "../../../nav-soknad/utils";
import FaktumPersonskjema from "../../../nav-soknad/faktum/PersonFaktum";

import FaktumRadio from "../../../nav-soknad/faktum/RadioFaktum";
import FaktumSkjemagruppe from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
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
			<FaktumSkjemagruppe
				tittelId="familie.barn.true.tittel"
				hjelpetekstId={"familie.barn.true.hjelpetekst"}>
				<FaktumPersonskjema faktumKey={faktumKey} />
				<FaktumSkjemagruppe tittelId={borInfo.sporsmal}>
					<FaktumRadio faktumKey={borInfo.faktum} option="true" />
					<NivaTreSkjema visible={faktumIsSelected(getFaktumVerdi(fakta, borInfo.faktum))}>
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
