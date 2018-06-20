import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Faktum } from "../../../../nav-soknad/types";
import {
	default as Detaljeliste,
	DetaljelisteElement,
	ElementProps
} from "../../../../nav-soknad/components/detaljeliste";

interface AdresseOwnProps {
	faktum: Faktum;
}

// TODO Slette?
interface AdresseProperties {
	kilde?: string;
	gaardsnummer?: string;
	postnummer?: string;
	poststed?: string;
}

type AdresseVisningProps = InjectedIntlProps & AdresseOwnProps;

class AdresseVisning extends React.Component<AdresseVisningProps, {}> {

	getProperty(faktum: Faktum, key: string): ElementProps {
		if (faktum.properties[key] == null) {
			return null;
		}
		return ({
			tittel: this.props.intl.formatMessage({
				id: "kontakt.system.adresse." + key + ".label"
			}),
			verdi: faktum.properties[key]
		});
	}

	getPropertyWithoutName(faktum: Faktum, key: string) {
		if (faktum.properties[key] == null) {
			return null;
		}
		return <li className="detaljeliste__element">{faktum.properties[key]}</li>;
	}

	render() {
		const faktum = this.props.faktum;
		const adresseProperties = faktum.properties as AdresseProperties;
		return <Detaljeliste>
			{this.getPropertyWithoutName(faktum, "adresse")}
			{adresseProperties.postnummer != null && adresseProperties.poststed != null && (
				<li className="detaljeliste__element">{adresseProperties.postnummer} {adresseProperties.poststed}</li>
			)
			}
			<DetaljelisteElement {...this.getProperty(faktum, "eiendomsnavn")} />
			{adresseProperties.gaardsnummer != null &&
			<DetaljelisteElement {...this.getProperty(faktum, "kommunenummer")} />
			}
			<DetaljelisteElement {...this.getProperty(faktum, "gaardsnummer")} />
			<DetaljelisteElement {...this.getProperty(faktum, "bruksnummer")} />
			<DetaljelisteElement {...this.getProperty(faktum, "festenummer")} />
			<DetaljelisteElement {...this.getProperty(faktum, "seksjonsnummer")} />
			<DetaljelisteElement {...this.getProperty(faktum, "undernummer")} />
		</Detaljeliste>;
	}
}

export default injectIntl(AdresseVisning);
