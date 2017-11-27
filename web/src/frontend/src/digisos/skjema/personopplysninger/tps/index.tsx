import * as React from "react";
import { connect } from "react-redux";

import { State } from "../../../redux/reducers";
import { FaktumComponentProps } from "../../../../nav-soknad/redux/fakta/faktaTypes";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import { finnFaktum, faktumEgenskapVerdi } from "../../../../nav-soknad/utils";
import PersonaliaTPS from "./PersonaliaTPS";
import KontaktinfoTPS from "./KontaktinfoTPS";
import BankinformasjonTPS from "./BankinformasjonTPS";
import DigisosSkjemaSteg, { DigisosSteg } from "../../DigisosSkjemaSteg";

type Props = FaktumComponentProps;

class Personalia extends React.Component<Props, {}> {
	render() {
		const personaliaFaktum = finnFaktum("personalia", this.props.fakta);
		return (
			<DigisosSkjemaSteg steg={DigisosSteg.kontakt}>
				<SporsmalFaktum faktumKey="kontakt.tps.personalia" style="system">
					<PersonaliaTPS
						navn={faktumEgenskapVerdi(personaliaFaktum, "navn")}
						fnr={faktumEgenskapVerdi(personaliaFaktum, "fnr")}
						statsborgerskap={faktumEgenskapVerdi(
							personaliaFaktum,
							"statsborgerskapType"
						)}
					/>
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey="kontakt.tps.kontaktinfo" style="system">
					<KontaktinfoTPS
						telefonnummer={faktumEgenskapVerdi(
							personaliaFaktum,
							"telefonnummer"
						)}
						adresse={faktumEgenskapVerdi(personaliaFaktum, "gjeldendeAdresse")}
						postnummer={faktumEgenskapVerdi(personaliaFaktum, "postnummer")}
						poststed={faktumEgenskapVerdi(personaliaFaktum, "poststed")}
					/>
				</SporsmalFaktum>
				<SporsmalFaktum faktumKey="kontakt.tps.bankinfo" style="system">
					<BankinformasjonTPS fakta={this.props.fakta} />
				</SporsmalFaktum>
			</DigisosSkjemaSteg>
		);
	}
}

export default connect((state: State): Props => {
	return {
		fakta: state.fakta.data
	};
})(Personalia);
