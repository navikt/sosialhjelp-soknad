import * as React from "react";
import {
	injectIntl,
	InjectedIntlProps,
	InjectedIntl
} from "react-intl";
import { Faktum } from "../../../../nav-soknad/types";
import {
	finnFaktum
} from "../../../../nav-soknad/utils";
import SysteminfoFaktum from "../../../../nav-soknad/faktum/SysteminfoFaktum";
import InputFaktum from "../../../../nav-soknad/faktum/InputFaktum";
import TallFaktum from "../../../../nav-soknad/faktum/typedInput/TallFaktum";
import Detaljeliste, {
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

class Adresserad {
	tittel: string;
	verdi: string;

	constructor(tittel: string, verdi: string) {
		this.tittel = tittel;
		this.verdi = verdi;
	}
}

export function adressePropertiesTilVisning(properties: object, intl: InjectedIntl): Adresserad[] {
	const result = new Array<Adresserad>();
	const propertyOrder: string[] = [
		"adresse",
		// Vises ikke til bruker etter krav fra interaksjonsdesigner:
		// "kommunenummer"
		// "bolignummer",
		// "gatenavn",
		// "husnummer",
		"postnummer", "poststed",
		"eiendomsnavn", "gaardsnummer", "bruksnummer", "festenummer", "seksjonsnummer", "undernummer"
	];

	for (const key of propertyOrder) {
		const tittel = intl.formatMessage({id: "kontakt.system.adresse." + key + ".label"});
		const value = properties[key];
		if (value != null) {
			result.push(new Adresserad(
				tittel, properties[key]
			));
		}
	}

	return result;
}

const Kontaktinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
	fakta,
	intl
}) => {
	const adresseFaktum = finnFaktum("kontakt.system.adresse", fakta);
	const adresseProperties = adressePropertiesTilVisning(adresseFaktum.properties, intl).map(
		ap => <DetaljelisteElement key={ap.tittel} tittel={ap.tittel} verdi={ap.verdi} />
	);

	return (
		<SysteminfoFaktum
			faktumKey="kontakt.adresse.brukerendrettoggle"
			skjema={<Skjema />}
			endreLabel={intl.formatMessage({
				id: "kontakt.system.adresse.endreknapp.label"
			})}
		>
			<Detaljeliste>
				{adresseProperties}
			</Detaljeliste>
		</SysteminfoFaktum>
	);
};

export default injectIntl(Kontaktinfo);
