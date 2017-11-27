import * as React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import SysteminfoFaktum from "../../../../nav-soknad/faktum/SysteminfoFaktum";
import { getFaktumVerdi } from "../../../../nav-soknad/utils";
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
	<div className="blokk-s">
		<SporsmalFaktum faktumKey="kontakt.telefon">
			<TelefonFaktum faktumKey="kontakt.telefon" maxLength={8} />
		</SporsmalFaktum>
	</div>
);

const Telefoninfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
	fakta,
	intl
}) => {
	const telefonnummer = getFaktumVerdi(fakta, "kontakt.system.telefon");

	if (!telefonnummer && telefonnummer !== "") {
		return <Skjema />;
	}

	return (
		<SysteminfoFaktum
			faktumKey="kontakt.system.telefon"
			skjema={<Skjema />}
			endreLabel={intl.formatMessage({
				id: "kontakt.system.telefon.endreknapp.label"
			})}
		>
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
