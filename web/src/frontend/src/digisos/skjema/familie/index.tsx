import * as React from "react";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { State } from "../../redux/reducers";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";

import Sivilstatus from "./Sivilstatus";
import HarBarn from "./HarBarn";
import SivilstatusTPS from "./SivilstatusTPS";
import {Faktum} from "../../../nav-soknad/types";
import {finnFaktum} from "../../../nav-soknad/utils";

class Familie extends React.Component<FaktumComponentProps, {}> {


	render() {
		const { fakta } = this.props;
		const systemFamilieSivilstatusFakta: Faktum = finnFaktum("system.familie.sivilstatus", fakta);
		console.warn(systemFamilieSivilstatusFakta);

		return (
			<DigisosSkjemaSteg steg={DigisosSteg.familiebolk}>
				{
					systemFamilieSivilstatusFakta.value &&
					<SivilstatusTPS systemFamilieSivilstatusFakta={systemFamilieSivilstatusFakta}/>
				}
				{
					systemFamilieSivilstatusFakta.value === null &&
					<Sivilstatus fakta={fakta} />
				}

				<HarBarn />
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data,
		feil: state.validering.feil
	};
})(Familie);
