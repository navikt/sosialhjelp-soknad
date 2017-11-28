import * as React from "react";
import { FormattedMessage } from "react-intl";
import SysteminfoFaktum from "../../../../nav-soknad/faktum/SysteminfoFaktum";
import Detaljeliste, {
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";
import {
	finnFaktum,
	getFaktumPropertyVerdi
} from "../../../../nav-soknad/utils";
import { Faktum } from "../../../../nav-soknad/types";

interface Props {
	fakta: Faktum[];
}

const PersonaliaTPS: React.StatelessComponent<Props> = ({ fakta }) => {
	const personaliaFaktum = finnFaktum("personalia", fakta);
	const statsborgerskap = getFaktumPropertyVerdi(
		personaliaFaktum,
		"statsborgerskapType"
	);
	return (
		<SysteminfoFaktum faktumKey="kontakt.system.personalia">
			<Detaljeliste>
				<DetaljelisteElement
					tittel={<FormattedMessage id="kontakt.system.personalia.navn" />}
					verdi={getFaktumPropertyVerdi(personaliaFaktum, "navn")}
				/>
				<DetaljelisteElement
					skjulDersomTomVerdi={true}
					tittel={<FormattedMessage id="kontakt.system.personalia.fnr" />}
					verdi={getFaktumPropertyVerdi(personaliaFaktum, "fnr")}
				/>
				{statsborgerskap && (
					<DetaljelisteElement
						tittel={
							<FormattedMessage id="kontakt.system.personalia.statsborgerskap" />
						}
						verdi={<span className="tekst-capitalize">{statsborgerskap}</span>}
					/>
				)}
			</Detaljeliste>
		</SysteminfoFaktum>
	);
};

export default PersonaliaTPS;
