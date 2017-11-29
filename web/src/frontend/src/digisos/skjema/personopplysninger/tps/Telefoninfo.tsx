import * as React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import SysteminfoFaktum from "../../../../nav-soknad/faktum/SysteminfoFaktum";
import { harFaktumVerdi, getFaktumVerdi } from "../../../../nav-soknad/utils";
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
	if (!harFaktumVerdi(fakta, "kontakt.system.telefon")) {
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
					tittel={<FormattedMessage id="kontakt.system.telefon.label" />}
					verdi={getFaktumVerdi(fakta, "kontakt.system.telefon")}
				/>
			</Detaljeliste>
		</SysteminfoFaktum>
	);
};

export default injectIntl(Telefoninfo);
