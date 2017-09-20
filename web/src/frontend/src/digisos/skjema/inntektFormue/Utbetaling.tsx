import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import {
	radioCheckKeys,
	faktumIsSelected,
	getFaktumVerdi
} from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import CheckboxFaktum, {
	createCheckboxFaktumKey
} from "../../../nav-soknad/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const utbetaling = radioCheckKeys("inntekt.inntekter");
		const hvilkeUtbetalinger = radioCheckKeys("inntekt.inntekter.true.type");
		const hvilkeUtbetalingerAnnet = "inntekt.inntekter.true.type.annet";
		return (
			<SporsmalFaktum faktumKey={utbetaling.faktum} required={true}>
				<RadioFaktum faktumKey={utbetaling.faktum} value="true" />
				<Underskjema
					visible={faktumIsSelected(getFaktumVerdi(fakta, utbetaling.faktum))}>
					<SporsmalFaktum faktumKey={hvilkeUtbetalinger.faktum}>
						{/*TODO legg til checkboxgruppefaktum*/}
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeUtbetalinger.faktum,
								"utbytte"
							)}
						/>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeUtbetalinger.faktum,
								"salg"
							)}
						/>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeUtbetalinger.faktum,
								"forsikringsutbetalinger"
							)}
						/>
						<CheckboxFaktum
							faktumKey={createCheckboxFaktumKey(
								hvilkeUtbetalinger.faktum,
								"annet"
							)}
						/>
						{faktumIsSelected(
							getFaktumVerdi(fakta, hvilkeUtbetalingerAnnet)
						) ? (
							<TextareaFaktum
								faktumKey={`${hvilkeUtbetalingerAnnet}.true.beskrivelse`}
								maxLength={400}
								validerFunc={[getMaksLengdeFunc(400)]}
							/>
						) : null}
					</SporsmalFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={utbetaling.faktum} value="false" />
			</SporsmalFaktum>
		);
	}
}

export default Bankinnskudd;
