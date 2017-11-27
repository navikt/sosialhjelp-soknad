import * as React from "react";
import { connect } from "react-redux";

import { State } from "../../../redux/reducers";
import { FaktumComponentProps } from "../../../../nav-soknad/redux/fakta/faktaTypes";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import {
	finnFaktum,
	getFaktumPropertyVerdi
} from "../../../../nav-soknad/utils";
import PersonaliaTPS from "./PersonaliaTPS";
import Adresseinfo from "./Adresseinfo";
import Telefoninfo from "./Telefoninfo";
import Bankinformasjon from "./Bankinformasjon";
import DigisosSkjemaSteg, { DigisosSteg } from "../../DigisosSkjemaSteg";

type Props = FaktumComponentProps;

class Personalia extends React.Component<Props, {}> {
	render() {
		const personaliaFaktum = finnFaktum("personalia", this.props.fakta);
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.kontakt}>
				<SporsmalFaktum faktumKey="kontakt.tps.personalia" style="system">
					<PersonaliaTPS
						navn={getFaktumPropertyVerdi(personaliaFaktum, "navn")}
						fnr={getFaktumPropertyVerdi(personaliaFaktum, "fnr")}
						statsborgerskap={getFaktumPropertyVerdi(
							personaliaFaktum,
							"statsborgerskapType"
						)}
					/>
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey="kontakt.tps.kontaktinfo" style="system">
					<div className="blokk-s">
						<Adresseinfo
							adresse={getFaktumPropertyVerdi(
								personaliaFaktum,
								"gjeldendeAdresse"
							)}
							postnummer={getFaktumPropertyVerdi(
								personaliaFaktum,
								"postnummer"
							)}
							poststed={getFaktumPropertyVerdi(personaliaFaktum, "poststed")}
						/>
					</div>
					<Telefoninfo fakta={this.props.fakta} />
				</SporsmalFaktum>
				<Bankinformasjon fakta={this.props.fakta} />
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State): Props => {
	return {
		fakta: state.fakta.data
	};
})(Personalia);
