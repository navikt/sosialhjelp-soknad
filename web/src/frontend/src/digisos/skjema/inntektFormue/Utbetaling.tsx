import * as React from "react";
import Sporsmal from "../../../nav-soknad/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import CheckboxFaktum from "../../../nav-soknad/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const utbetaling = radioCheckKeys("inntekt.inntekter");
		const hvilkeUtbetalinger = radioCheckKeys("inntekt.inntekter.true.type");
		const hvilkeUtbetalingerAnnet = "inntekt.inntekter.true.type.annet";
		return (
			<Sporsmal
				sporsmalId={utbetaling.sporsmal}
				hjelpetekstId={utbetaling.hjelpetekst}
			>
				<RadioFaktum faktumKey={utbetaling.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(fakta.get(utbetaling.faktum))}>
					<SkjemagruppeFaktum tittelId={hvilkeUtbetalinger.sporsmal}>
						{/*TODO legg til checkboxgruppefaktum*/}
						<CheckboxFaktum
							faktumKey={hvilkeUtbetalinger.faktum}
							option="utbytte"
						/>
						<CheckboxFaktum
							faktumKey={hvilkeUtbetalinger.faktum}
							option="salg"
						/>
						<CheckboxFaktum
							faktumKey={hvilkeUtbetalinger.faktum}
							option="forsikringsutbetalinger"
						/>
						<CheckboxFaktum
							faktumKey={hvilkeUtbetalinger.faktum}
							option="annet"
						/>
						{faktumIsSelected(fakta.get(hvilkeUtbetalingerAnnet)) ? (
							<TextareaFaktum
								faktumKey={`${hvilkeUtbetalingerAnnet}.true.beskrivelse`}
							/>
						) : null}
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={utbetaling.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Bankinnskudd;
