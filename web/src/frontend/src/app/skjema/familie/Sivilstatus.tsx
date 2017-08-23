import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
import { radioCheckKeys } from "../../../skjema/utils";
import { DispatchProps } from "../../../redux/types";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

interface StateProps {
	faktum: FaktumMap;
}

class Sivilstatus extends React.Component<StateProps & DispatchProps, any> {
	render() {
		const { faktum } = this.props;
		const KEYS = {
			...radioCheckKeys("familie.sivilstatus"),
			gift: {
				...radioCheckKeys("familie.sivilstatus.gift")
			}
		};
		return (
			<Sporsmal sporsmalId={KEYS.sporsmal}>
				<FaktumRadio faktumKey={KEYS.faktum} value="gift" />
				<Underskjema visible={faktum.get(KEYS.faktum) === "gift"}>
					<FaktumSkjemagruppe tittelId={KEYS.gift.sporsmal}>
						<div className="skjemaelement">TODO</div>
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={KEYS.faktum} value="ugift" />
				<FaktumRadio faktumKey={KEYS.faktum} value="samboer" />
				<FaktumRadio faktumKey={KEYS.faktum} value="enke" />
				<FaktumRadio faktumKey={KEYS.faktum} value="skilt" />
			</Sporsmal>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(Sivilstatus);
