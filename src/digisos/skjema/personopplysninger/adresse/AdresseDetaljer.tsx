import * as React from "react";
import {Gateadresse} from "./AdresseTypes";
import Detaljeliste from "../../../../nav-soknad/components/detaljeliste";

const AdresseDetaljer = (props: {adresse: Gateadresse}) => {
    const {adresse} = props;
    if (!adresse) {
        return null;
    }
    return (
        <Detaljeliste>
            <li className="detaljeliste__element">
                {adresse.gatenavn} {adresse.husnummer}
                {adresse.husbokstav}
            </li>
            <li className="detaljeliste__element">
                {adresse.postnummer} {adresse.poststed}
            </li>
        </Detaljeliste>
    );
};

export default AdresseDetaljer;
