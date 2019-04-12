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
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";
import {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";

class BankinnskuddGammel extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const utbetaling = radioCheckKeys("inntekt.inntekter");
		const hvilkeUtbetalinger = radioCheckKeys("inntekt.inntekter.true.type");
		const hvilkeUtbetalingerAnnet = "inntekt.inntekter.true.type.annet";
		return (
			<JaNeiSporsmalFaktum faktumKey={utbetaling.faktum} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
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
					<NivaTreSkjema
						visible={faktumIsSelected(getFaktumVerdi(fakta, hvilkeUtbetalingerAnnet))}
						size="small"
					>
						<TextareaFaktum
							id="utbetalinger_annet_textarea"
							faktumKey={`${hvilkeUtbetalingerAnnet}.true.beskrivelse`}
							maxLength={400}
							validerFunc={[getMaksLengdeFunc(400)]}
						/>
					</NivaTreSkjema>
				</SporsmalFaktum>
			</JaNeiSporsmalFaktum>
		);
	}
}

export default BankinnskuddGammel;
