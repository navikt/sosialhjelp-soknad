import * as React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import SysteminfoFaktum from "../../../../nav-soknad/faktum/SysteminfoFaktum";
import {
	finnFaktum,
	getFaktumPropertyVerdi
	// eksistererFaktum
	// faktumIsSelected,
	// getFaktumVerdi
} from "../../../../nav-soknad/utils";
import { Faktum } from "../../../../nav-soknad/types";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import TelefonFaktum from "../../../../nav-soknad/faktum/typedInput/TelefonFaktum";
import Detaljeliste, {
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";

interface Props {
	fakta: Faktum[];
}

const Skjema: React.StatelessComponent<{}> = () => (
	<SporsmalFaktum faktumKey="kontakt.telefon">
		<TelefonFaktum faktumKey="kontakt.telefon" maxLength={8} />
	</SporsmalFaktum>
);

const Telefoninfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
	fakta,
	intl
}) => {
	const personaliaFaktum = finnFaktum("personalia", fakta);
	const telefonnummer = getFaktumPropertyVerdi(
		personaliaFaktum,
		"telefonnummer"
	);

	if (!telefonnummer && telefonnummer !== "") {
		return <Skjema />;
	}

	return (
		<SysteminfoFaktum faktumKey="kontakt.tps.telefoninfo">
			<Detaljeliste>
				<DetaljelisteElement
					tittel={
						<FormattedMessage id="kontakt.tps.kontaktinfo.telefonnummer" />
					}
					verdi={telefonnummer}
					spaced={true}
				/>
			</Detaljeliste>
		</SysteminfoFaktum>
	);
};

export default injectIntl(Telefoninfo);
