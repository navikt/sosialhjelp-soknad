import * as React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import SysteminfoFaktum from "../../../../nav-soknad/faktum/SysteminfoFaktum";
import Detaljeliste, {
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";

interface Props {
	adresse: string;
	postnummer: string;
	poststed: string;
	telefonnummer: string;
}

const KontaktinfoTPS: React.StatelessComponent<Props & InjectedIntlProps> = ({
	postnummer,
	poststed,
	adresse,
	telefonnummer,
	intl
}) => {
	return (
		<SysteminfoFaktum faktumKey="kontakt.tps.kontaktinfo">
			<Detaljeliste>
				<DetaljelisteElement
					tittel={<FormattedMessage id="kontakt.tps.kontaktinfo.adresse" />}
					verdi={adresse}
				/>
				<DetaljelisteElement
					tittel={<FormattedMessage id="kontakt.tps.kontaktinfo.postnummer" />}
					verdi={postnummer}
				/>
				<DetaljelisteElement
					tittel={<FormattedMessage id="kontakt.tps.kontaktinfo.poststed" />}
					verdi={poststed}
				/>
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

export default injectIntl(KontaktinfoTPS);
