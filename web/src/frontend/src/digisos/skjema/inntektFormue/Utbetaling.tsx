import * as React from "react";

import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import CheckboxFaktum, {
	createCheckboxFaktumKey
} from "../../../nav-soknad/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import {
	radioCheckKeys,
	faktumIsSelected,
	getFaktumVerdi
} from "../../../nav-soknad/utils";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const utbetaling = radioCheckKeys("inntekt.inntekter");
		const hvilkeUtbetalinger = radioCheckKeys("inntekt.inntekter.true.type");
		const hvilkeUtbetalingerAnnet = "inntekt.inntekter.true.type.annet";
		return (
			<JaNeiSporsmalFaktum faktumKey={utbetaling.faktum}>
				<SporsmalFaktum faktumKey={hvilkeUtbetalinger.faktum}>
					<CheckboxFaktum
						id="utbetalinger_utbytte_checkbox"
						faktumKey={createCheckboxFaktumKey(
							hvilkeUtbetalinger.faktum,
							"utbytte"
						)}
					/>
					<CheckboxFaktum
						id="utbetalinger_salg_checkbox"
						faktumKey={createCheckboxFaktumKey(
							hvilkeUtbetalinger.faktum,
							"salg"
						)}
					/>
					<CheckboxFaktum
						id="utbetalinger_forsikringsutbetalinger_checkbox"
						faktumKey={createCheckboxFaktumKey(
							hvilkeUtbetalinger.faktum,
							"forsikringsutbetalinger"
						)}
					/>
					<CheckboxFaktum
						id="utbetalinger_annet_checkbox"
						faktumKey={createCheckboxFaktumKey(
							hvilkeUtbetalinger.faktum,
							"annet"
						)}
					/>
					{faktumIsSelected(getFaktumVerdi(fakta, hvilkeUtbetalingerAnnet)) ? (
						<TextareaFaktum
							id="utbetalinger_annet_textarea"
							faktumKey={`${hvilkeUtbetalingerAnnet}.true.beskrivelse`}
							maxLength={400}
							validerFunc={[getMaksLengdeFunc(400)]}
						/>
					) : null}
				</SporsmalFaktum>
			</JaNeiSporsmalFaktum>
		);
	}
}

export default Bankinnskudd;
