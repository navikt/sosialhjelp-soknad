import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import {finnFaktum, getFaktumVerdi, radioCheckKeys} from "../../../nav-soknad/utils";
import { FormattedMessage } from "react-intl";


import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import Ektefelle from "./Ektefelle";
import Informasjonspanel, {
	NavFarger,
	InformasjonspanelIkon
} from "../../../nav-soknad/components/informasjonspanel";

class Sivilstatus extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const sivilstatus = radioCheckKeys("familie.sivilstatus");

		const sivilstatusGiftEktefelleFaktum = finnFaktum("familie.sivilstatus.gift.ektefelle", fakta);
		const BORSAMMEN = "borsammen";
		const sivilstatusFaktum = finnFaktum("familie.sivilstatus", fakta);

		let status: boolean = false;
		if (sivilstatusFaktum.value === "gift"){
			if (sivilstatusGiftEktefelleFaktum && sivilstatusGiftEktefelleFaktum.properties && sivilstatusGiftEktefelleFaktum.properties[BORSAMMEN]) {
				status = sivilstatusGiftEktefelleFaktum.properties[BORSAMMEN] === "true";
			}
		} else {
			status = false;
		}

		return (
			<div>
				<SporsmalFaktum faktumKey={sivilstatus.faktum}>
					<RadioFaktum id="sivilstatus_gift_radio" faktumKey={sivilstatus.faktum} value="gift" />
					<Underskjema
						visible={getFaktumVerdi(fakta, sivilstatus.faktum) === "gift"}
					>
						<SporsmalFaktum faktumKey="familie.sivilstatus.gift.ektefelle">
							<Ektefelle fakta={fakta} />
						</SporsmalFaktum>

					</Underskjema>

					<RadioFaktum id="sivilstatus_ugift_radio" faktumKey={sivilstatus.faktum} value="ugift" />
					<RadioFaktum id="sivilstatus_samboer_radio" faktumKey={sivilstatus.faktum} value="samboer" />
					<RadioFaktum id="sivilstatus_enke_radio" faktumKey={sivilstatus.faktum} value="enke" />
					<RadioFaktum id="sivilstatus_skilt_radio" faktumKey={sivilstatus.faktum} value="skilt" />
					<RadioFaktum id="sivilstatus_separert_radio" faktumKey={sivilstatus.faktum} value="separert" />
				</SporsmalFaktum>
				<Informasjonspanel
					synlig={ status }
					farge={NavFarger.ADVARSEL}
					ikon={InformasjonspanelIkon.ELLA}
				>
					<h4 className="skjema-sporsmal__infotekst__tittel">
						<FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tittel"/>
					</h4>
					<FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tekst"/>
				</Informasjonspanel>
			</div>
		);
	}
}

export default Sivilstatus;
