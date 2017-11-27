import * as React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import SysteminfoFaktum from "../../../../nav-soknad/faktum/SysteminfoFaktum";
import InputFaktum from "../../../../nav-soknad/faktum/InputFaktum";
import TallFaktum from "../../../../nav-soknad/faktum/typedInput/TallFaktum";
import Detaljeliste, {
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";

interface Props {
	adresse: string;
	postnummer: string;
	poststed: string;
}

export const Skjema: React.StatelessComponent<{}> = () => (
	<div className="blokk-xs">
		<InputFaktum faktumKey="kontakt.adresse.gateadresse" />
		<TallFaktum
			faktumKey="kontakt.adresse.postnummer"
			maxLength={4}
			bredde="S"
		/>
		<InputFaktum faktumKey="kontakt.adresse.poststed" />
	</div>
);

const KontaktinfoTPS: React.StatelessComponent<Props & InjectedIntlProps> = ({
	postnummer,
	poststed,
	adresse,
	intl
}) => {
	return (
		<SysteminfoFaktum
			faktumKey="kontakt.tps.adresse"
			skjema={<Skjema />}
			endreLabel={intl.formatMessage({
				id: "kontakt.tps.adresse.endreknapp.label"
			})}
		>
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
			</Detaljeliste>
		</SysteminfoFaktum>
	);
};

export default injectIntl(KontaktinfoTPS);
