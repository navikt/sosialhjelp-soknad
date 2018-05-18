import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Faktum } from "../../../../nav-soknad/types";
import RadioFaktum from "../../../../nav-soknad/faktum/RadioFaktum";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import {
	getFaktumVerdi
} from "../../../../nav-soknad/utils";
import Detaljeliste, {
	ElementProps,
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";
import { finnFaktum } from "../../../../nav-soknad/utils";

interface Props {
	fakta: Faktum[];
}

const Oppholdsadresse: React.StatelessComponent<Props & InjectedIntlProps> = ({
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

	/*
			<RadioFaktum id="oppholdsadresse_folkeregistrert" faktumKey="kontakt.system.oppholdsadresse.valg" value="folkeregistrert" />
			<RadioFaktum id="oppholdsadresse_midlertidig" faktumKey="kontakt.system.oppholdsadresse.valg" value="midlertidig" />
	*/

	return (
		<SporsmalFaktum faktumKey="kontakt.system.oppholdsadresse.valg">
			<RadioFaktum id="oppholdsadresse_system" faktumKey="kontakt.system.oppholdsadresse.valg"
					value="system" label={
						<Detaljeliste>
							<DetaljelisteElement {...getProperty("adresse")} />
							<DetaljelisteElement {...getProperty("postnummer")} />
							<DetaljelisteElement {...getProperty("poststed")} />
							<DetaljelisteElement {...getProperty("eiendomsnavn")} />
							<DetaljelisteElement {...getProperty("gaardsnummer")} />
							<DetaljelisteElement {...getProperty("bruksnummer")} />
							<DetaljelisteElement {...getProperty("festenummer")} />
							<DetaljelisteElement {...getProperty("seksjonsnummer")} />
							<DetaljelisteElement {...getProperty("undernummer")} />
						</Detaljeliste>
					} />
			<RadioFaktum id="oppholdsadresse_soknad" faktumKey="kontakt.system.oppholdsadresse.valg" value="soknad" />
			<Underskjema
				visible={getFaktumVerdi(fakta, "kontakt.system.oppholdsadresse.valg") === "soknad"}
			>
				<SporsmalFaktum faktumKey="kontakt.system.oppholdsadresse.soknad">
					<div>TODO: Legg til søkefelt.</div>
				</SporsmalFaktum>
			</Underskjema>
		</SporsmalFaktum>
	);
};

export default injectIntl(Oppholdsadresse);
