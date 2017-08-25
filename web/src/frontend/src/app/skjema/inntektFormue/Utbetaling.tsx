import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumCheckbox from "../../../skjema/faktum/FaktumCheckbox";
import FaktumTextarea from "../../../skjema/faktum/FaktumTextarea";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { faktum } = this.props;
		const utbetaling = radioCheckKeys("inntekt.utbetaling");
		const hvilkeUtbetalinger = radioCheckKeys("inntekt.utbetaling.true");
		const hvilkeUtbetalingerAnnet = "inntekt.utbetaling.true.annet";
		return (
			<Sporsmal sporsmalId={utbetaling.sporsmal}>
				<FaktumRadio faktumKey={utbetaling.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(faktum.get(utbetaling.faktum))}>
					<FaktumSkjemagruppe tittelId={hvilkeUtbetalinger.sporsmal}>
						<FaktumCheckbox
							faktumKey={hvilkeUtbetalinger.faktum}
							option="utbytte"
						/>
						<FaktumCheckbox
							faktumKey={hvilkeUtbetalinger.faktum}
							option="salg"
						/>
						<FaktumCheckbox
							faktumKey={hvilkeUtbetalinger.faktum}
							option="forsikringsutbetalinger"
						/>
						<FaktumCheckbox
							faktumKey={hvilkeUtbetalinger.faktum}
							option="annet"
						/>
						{faktumIsSelected(faktum.get(hvilkeUtbetalingerAnnet))
							? <FaktumTextarea
									faktumKey={`${hvilkeUtbetalingerAnnet}.beskrivelse`}
								/>
							: null}
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={utbetaling.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Bankinnskudd;
