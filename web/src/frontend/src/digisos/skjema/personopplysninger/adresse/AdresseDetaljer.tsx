import * as React from "react";
import { Gateadresse } from "./AdresseTypes";
import Detaljeliste from "../../../../nav-soknad/components/detaljeliste";

class AdresseDetaljer extends React.Component<{ adresse: Gateadresse}, {}> {

	render() {
		const {adresse} = this.props;
		if (!adresse) {
			return null;
		}
		return (
			<Detaljeliste>
				<li className="detaljeliste__element">{adresse.gatenavn} {adresse.husnummer}{adresse.husbokstav}</li>
				<li className="detaljeliste__element">{adresse.postnummer} {adresse.poststed}</li>
			</Detaljeliste>);
	}

}

export default AdresseDetaljer;