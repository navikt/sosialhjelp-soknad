import * as React from "react";
import { Faktum } from "../../../nav-soknad/redux/faktaTypes";
import { radioCheckKeys } from "../../../nav-soknad/utils";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import FaktumRadio from "../../../nav-soknad/faktum/RadioFaktum";
import FaktumSkjemagruppe from "../../../nav-soknad/faktum/SporsmalFaktum";

interface BarnTypes {
	faktum: Faktum;
}

export default class Barn extends React.Component<FaktumComponentProps & BarnTypes, {}> {
	render() {
		const faktumKey = this.props.faktum.key;
		const borInfo = radioCheckKeys(`${faktumKey}.borsammen`);
		// const hvormye = radioCheckKeys(`${faktumKey}.borsammen.true.grad`);
		return (
			<FaktumSkjemagruppe faktumKey={faktumKey}>
				{/*<FaktumPersonskjema faktumKey={faktumKey}/>*/}
				<FaktumSkjemagruppe faktumKey={borInfo.faktum}>
					<FaktumRadio faktumKey={faktumKey} value="true" property="borsammen"/>
					{/*<NivaTreSkjema*/}
					{/*visible={faktumIsSelected(getFaktumVerdi(fakta, borInfo.faktum))}>*/}
					{/*<FaktumSkjemagruppe faktumKey={hvormye.faktum}>*/}
					{/*<FaktumRadio faktumKey={hvormye.faktum} value="heltid"/>*/}
					{/*<FaktumRadio faktumKey={hvormye.faktum} value="deltid"/>*/}
					{/*</FaktumSkjemagruppe>*/}
					{/*</NivaTreSkjema>*/}
					<FaktumRadio faktumKey={faktumKey} value="false" property="borsammen"/>
				</FaktumSkjemagruppe>
			</FaktumSkjemagruppe>
		);
	}
}
