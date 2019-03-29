import * as React from "react";
import { connect } from "react-redux";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { State } from "../../redux/reducers";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
// import { Faktum } from "../../../nav-soknad/types";
// import { finnFaktum } from "../../../nav-soknad/utils";
// import Familierelasjoner from "./Familierelasjoner";
import FamilieIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/FamilieIllustrasjon";
import ForsorgerPlikt from "./forsorgerplikt/ForsorgerPlikt";
import DinSivilstatus from "./sivilstatus/DinSivilstatus";

class Familie extends React.Component<FaktumComponentProps, {}> {

	render() {
		// const { fakta } = this.props;
		// const sivilstatusFaktum: Faktum = finnFaktum("system.familie.sivilstatus", fakta);
		// const ektefelleFaktum: Faktum = finnFaktum("system.familie.sivilstatus.gift.ektefelle", fakta);

		return (
			<DigisosSkjemaSteg steg={DigisosSteg.familiebolk} ikon={<FamilieIllustrasjon />}>
				<DinSivilstatus/>
				{/*{*/}
					{/*sivilstatusFaktum.value === "gift" &&*/}
					{/*(*/}
						{/*<span>*/}
							{/*/!*<EktefelleDetaljer/>*!/*/}
							{/*<SivilstatusTPS*/}
								{/*sivilstatusFaktum={sivilstatusFaktum}*/}
								{/*ektefelleFaktum={ektefelleFaktum}*/}
							{/*/>*/}
						{/*</span>*/}
					{/*)*/}
				{/*}*/}
				{/*{*/}
					{/*sivilstatusFaktum.value !== "gift" &&*/}
					{/*(*/}
						{/*<span>*/}
							{/*<Sivilstatus fakta={fakta} />*/}
						{/*</span>*/}
						{/*)*/}
				{/*}*/}
				<ForsorgerPlikt />
				{/*<Familierelasjoner />*/}
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
