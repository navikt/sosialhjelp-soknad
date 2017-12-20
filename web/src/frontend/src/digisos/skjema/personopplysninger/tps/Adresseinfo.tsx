import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Faktum } from "../../../../nav-soknad/types";
import { finnFaktum } from "../../../../nav-soknad/utils";
import SysteminfoFaktum from "../../../../nav-soknad/faktum/SysteminfoFaktum";
import InputFaktum from "../../../../nav-soknad/faktum/InputFaktum";
import TallFaktum from "../../../../nav-soknad/faktum/typedInput/TallFaktum";
import Detaljeliste, {
	ElementProps,
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";

interface Props {
	fakta: Faktum[];
}

export const Skjema: React.StatelessComponent<{}> = () => (
	<div>
		<InputFaktum faktumKey="kontakt.adresse.bruker" property="gateadresse" />
		<TallFaktum
			faktumKey="kontakt.adresse.bruker"
			property="postnummer"
			maxLength={4}
			bredde="S"
		/>
		<InputFaktum faktumKey="kontakt.adresse.bruker" property="poststed" />
	</div>
);

const Kontaktinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
	fakta,
	intl
}) => {
	const adresseFaktum = finnFaktum("kontakt.system.adresse", fakta);

	const getProperty = (key: string): ElementProps => ({
		tittel: intl.formatMessage({
			id: "kontakt.system.adresse." + key + ".label"
		}),
		verdi: adresseFaktum.properties[key]
	});

	return (
		<SysteminfoFaktum
			faktumKey="kontakt.adresse.brukerendrettoggle"
			skjema={<Skjema />}
			endreLabel={intl.formatMessage({
				id: "kontakt.system.adresse.endreknapp.label"
			})}
		>
			<Detaljeliste>
				<DetaljelisteElement {...getProperty("adresse")} />
				<DetaljelisteElement {...getProperty("postnummer")} />
				<DetaljelisteElement {...getProperty("eiendomsnavn")} />
				<DetaljelisteElement {...getProperty("gaardsnummer")} />
				<DetaljelisteElement {...getProperty("bruksnummer")} />
				<DetaljelisteElement {...getProperty("festenummer")} />
				<DetaljelisteElement {...getProperty("seksjonsnummer")} />
				<DetaljelisteElement {...getProperty("undernummer")} />
			</Detaljeliste>
		</SysteminfoFaktum>
	);
};

export default injectIntl(Kontaktinfo);
